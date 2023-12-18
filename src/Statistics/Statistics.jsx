import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import SearchArtists from './TopArtists';
import SearchTracks from './TopTracks';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { RadialLinearScale, ArcElement, PointElement, LineElement, Filler, scales } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import CountUp from "react-countup";
import refreshTokenFunc from '../SignIn/RefreshToken';
import checkAccessToken from '../SignIn/CheckAccessToken'
import AlertTitle from '@mui/material/AlertTitle';
ChartJS.register(CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, ArcElement, Filler, Title, Tooltip, Legend, scales);
export default function CustomizedInputBase(props) {

    const { setRows, rows, initPlayingArr, playingArr, setIsPlayingArr, setIndex, setType, setMedia, setTrackID, trackID } = props
    let accessToken = localStorage.getItem('accessToken');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');

    const [artists, setArtists] = React.useState([]);
    const [artistsAvg, setArtistsAvg] = React.useState(0);

    const [tracks, setTracks] = React.useState([]);
    const [tracksAvg, setTracksAvg] = React.useState(0);

    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [term, setTerm] = React.useState('medium_term');
    const [genres, setGenres] = React.useState([]);
    const [counts, setCounts] = React.useState({ 'test': 1 });

    React.useEffect(() => { window.document.title = 'User Statistics'; getTop(); }, [term]);
    React.useEffect(() => { if (artists !== undefined && artists.length != 0) { getGenreArr(); getArtAvg(); } }, [artists])
    React.useEffect(() => { if (tracks !== undefined && tracks.length != 0) { getTrackAvg(); } }, [tracks])

    const getTop = async () => {
        if (!checkAccessToken()) {

            setLoading(true);
            await fetch("https://api.spotify.com/v1/me/top/artists?limit=50&time_range=" + term, {
                method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
            })
                .then(async (result) => {
                    if (result.ok) {
                        const json = await result.json();
                        setArtists(json);
                        //initSelectedGenres(json.genres.length);
                    }
                    else {
                        setError(true);
                        setErrorMessage('Failed to retrieve Artist Information');
                        setArtists([]);
                    }
                });
            await fetch("https://api.spotify.com/v1/me/top/tracks?limit=50&time_range=" + term, {
                method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
            })
                .then(async (result) => {
                    if (result.ok) {
                        const json = await result.json();
                        setTracks(json);
                        //initSelectedGenres(json.genres.length);
                    }
                    else {
                        setError(true);
                        setErrorMessage('Failed to retrieve Track Information');
                        setTracks([]);
                    }
                });
            setLoading(false);
        }
        else {
            accessToken = refreshTokenFunc();
        }
    }
    const getArtAvg = () => {
        let count = 0
        artists?.items?.map((artist) => {
            count += parseInt(artist.popularity);
        })
        setArtistsAvg(Math.floor(count / artists?.items.length));
    }
    const getTrackAvg = () => {
        let count = 0
        tracks?.items?.map((track) => {
            count += parseInt(track.popularity);
        })
        setTracksAvg(Math.floor(count / tracks?.items.length));
    }
    const updateTerm = (term) => {
        setTerm(term);
    }
    const activeButton = (type) => {
        if (type == term) {
            return '#518da6'
        }
        else {
            return '#272c2e'
        }
    }
    const activeText = (type) => {
        if (type == term) {
            return 'white'
        }
        else {
            return '#999999'
        }
    }
    const getGenreArr = () => {
        let genreArr = [];
        artists?.items?.map((artist, index) => {
            for (var i = 0; i < artist?.genres?.length; i++) {
                genreArr.push(artist.genres[i])
            }
        })
        const occurrences = genreArr?.reduce(function (acc, curr) {
            return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
        }, {});

        setGenres(genreArr);
        setCounts(occurrences);

    }
    const filterItems = (arr) => {
        var object = arr,
            result = Object.assign(                      // collect all objects into a single obj
                ...Object                                // spread the final array as parameters
                    .entries(object)                     // key a list of key/ value pairs
                    .sort(({ 1: a }, { 1: b }) => b - a) // sort DESC by index 1
                    .slice(0, 10)                         // get first three items of array
                    .map(([k, v]) => ({ [k]: v }))       // map an object with a destructured
            );
        return result;
    }

    const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
    const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${255}, 0.6)`;
    const getColor = (color) => {
        if (color < 37) {
            return '#f542c5'
        }
        else if (color < 50) {
            return '#b342f5'

        }
        else if (color < 63) {
            return '#8d42f5'

        }
        else if (color < 75) {
            return '#4b42f5'

        }
        else {
            return '#42f5b9'
        }
    }


    const dataLoudness = {
        labels: Object.keys(filterItems(counts) || {}),
        datasets: [

            {
                axis: 'y',

                label: "Artists with genre specified",
                data: Object.values(filterItems(counts) || {}),
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, '#8d42f5');
                    gradient.addColorStop(1, '#71c1e3');
                    return gradient;
                },
                borderRadius: 10,
            },


        ],

    };


    const optionLoudness = {
        responsive: true,
        indexAxis: 'y',

        plugins: {

            title: {
                display: true,
                text: "Top Genres",
            },

            legend: {
                display: false,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 16
                }
            },
        },
    };
    return (
        <Box marginBottom={'100px'}>
            {error ? (<Alert severity="error" variant="outlined">
                <AlertTitle>Error</AlertTitle>
                {errorMessage}
            </Alert>
            ) : (<Box>
                <Grid container
                    spacing={2}
                    marginTop={'5px'}
                    sx={{maxWidth:'98vw'}}
                >
                    <Grid item xs={12} md={12}>
                        <Grid container
                        
                            spacing={2}
                            direction="row"
                            alignItems="center"
                            justifyContent="center">
                            <Grid item   >
                                <IconButton onClick={() => { updateTerm('short_term') }} sx={{ borderRadius: 28, backgroundColor: activeButton('short_term'), textTransform: 'none', margin: '2px', color: activeText('short_term'), padding: 'none' }}>
                                    <Typography>1 Month</Typography>
                                </IconButton>
                            </Grid>
                            <Grid item    >
                                <IconButton onClick={() => { updateTerm('medium_term') }} sx={{ borderRadius: 28, backgroundColor: activeButton('medium_term'), textTransform: 'none', margin: '2px', color: activeText('medium_term'), padding: 'none' }}>
                                    <Typography>6 Months</Typography>
                                </IconButton>
                            </Grid>
                            <Grid item   >
                                <IconButton onClick={() => { updateTerm('long_term') }} sx={{ borderRadius: 28, backgroundColor: activeButton('long_term'), textTransform: 'none', margin: '2px', color: activeText('long_term'), padding: 'none' }}>
                                    <Typography>All Time</Typography>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} xl={12} sx={{ maxWidth:'98vw', height: '100%', margin: '0px', padding: '0px' }}>
                        <Box >
                            {artists?.items != null &&
                                <Grid container
                                    spacing={0}
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{ margin: '0px', padding: '0px' }}>
                                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
                                        <Box display="flex" justifyContent="center" sx={{ height: '250px', maxWidth: '98vw' }}>
                                            <Bar options={optionLoudness} data={dataLoudness} />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={4} lg={4} xl={4} justifyContent="center" alignItems="center" sx={{ margin: '0px', padding: '0px' }}>
                                        <Box display="flex" justifyContent="center" marginTop='20px' alignItems="center">
                                            <Typography  sx={{
                                                margin: '0px', padding: '0px', background: '-webkit-linear-gradient(45deg, ' + getColor(tracksAvg) + ' 30%, #71c1e3 90%)', WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent", fontFamily: 'Arial', fontSize: {xs:'100px', md:'175px'}
                                            }}>
                                                <CountUp duration={4} end={tracksAvg} />
                                            </Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="center" alignItems="center">
                                            <Typography  sx={{ color: '#999999', typography: { xs: 'body2', md: 'h6' } }}>
                                                Average Track Popularity
                                            </Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={6} sm={6} md={4} lg={4}  xl={4} justifyContent="center" alignItems="center">
                                        <Box display="flex" justifyContent="center" marginTop='20px'>
                                            <Typography  sx={{
                                                color: '#518da6', fontFamily: 'Arial', background: '-webkit-linear-gradient(45deg, ' + getColor(artistsAvg) + ' 30%, #71c1e3 90%)', WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent", fontSize: {xs:'100px', md:'175px'}
                                            }}>
                                                <CountUp duration={4} end={artistsAvg} />
                                            </Typography>
                                        </Box>
                                        <Box display="flex" justifyContent="center" >
                                            <Typography  sx={{ color: '#999999', typography: { xs: 'body2', md: 'h6' } }}>
                                                Average Artist Popularity
                                            </Typography>
                                        </Box>
                                    </Grid>
                                </Grid>
                            }
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={12}  >
                        {artists?.items != null &&
                            <SearchArtists aT={accessToken} artists={artists}></SearchArtists>
                        }
                    </Grid>
                    <Grid item xs={12} md={12} >
                        {tracks?.items != null &&
                            <SearchTracks aT={accessToken} rows={tracks} setRows={setRows} initPlayingArr={initPlayingArr} playingArr={playingArr} setIsPlayingArr={setIsPlayingArr} setIndex={setIndex} setType={setType} setTrackID={setTrackID} trackID={trackID}></SearchTracks>
                        }
                    </Grid>
                </Grid>
                <Snackbar
                    open={openSnackbar}
                    onClose={() => setOpenSnackbar(false)}
                    autoHideDuration={4000}
                >
                    {snackbarMessage.includes('Error') ?
                        (<Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
                            {snackbarMessage}
                        </Alert>) :
                        (<Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                            {snackbarMessage}
                        </Alert>)
                    }
                </Snackbar>
                {
                    loading && <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                    >
                        <CircularProgress sx={{ color: '#71c1e3' }} />
                    </Backdrop>
                }
            </Box>
            )}
        </Box>
    );
}