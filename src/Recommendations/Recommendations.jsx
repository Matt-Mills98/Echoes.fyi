import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, Container, Grid } from '@mui/material';
import RecommendedSongs from './RecommendedSongs';
import FilterOptions from './FilterOptions';
import Collapse from '@mui/material/Collapse';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';
import GenreDropDown from './GenreDropdown';
import SearchIcon from '@mui/icons-material/Search';
import Stack from '@mui/material/Stack';
import { extractColors } from 'extract-colors'
import moment from 'moment/moment';
import refreshTokenFunc from '../SignIn/RefreshToken';
import checkAccessToken from '../SignIn/CheckAccessToken'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useLocation } from "react-router-dom";
import AlertTitle from '@mui/material/AlertTitle';

function capitalizeFirstLetter(string) {
    return string.slice(1);
}
export default function MultiActionAreaCard(props) {

    const { setRows, rows, initPlayingArr, playingArr, setIsPlayingArr, setIndex, setType, setMedia, setTrackID, trackID } = props
    let accessToken = localStorage.getItem('accessToken');
    const search = useLocation().search;
    const params = new URLSearchParams(search);
    const id = params.get("id");

    const [track, setTrack] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [showAdvanced, setShowAdvanced] = React.useState(false);
    const [filterParams, setFilterParams] = React.useState('');
    const [genreParams, setGenreParams] = React.useState('');
    const [autoSearch, setAutoSearch] = React.useState(false);
    const [totalParams, setTotalParams] = React.useState('');
    const [color1, setColor1] = React.useState('');
    const [color2, setColor2] = React.useState('');
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');

    const imgRef = React.createRef();

    React.useEffect(() => { getTrack(); window.document.title = 'Recommendations'; }, [id])
    React.useEffect(() => { getDomColor(); if (track?.name) { window.document.title += ' | ' + track?.name } }, [track])

    const getTrack = async () => {
        if (!checkAccessToken()) {

            if (id == null) {
                setAutoSearch(false);

            }
            else {
                setAutoSearch(true);
                await fetch("https://api.spotify.com/v1/tracks/" + id, {
                    method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
                })
                    .then(async (result) => {
                        if (result.ok) {
                            const json = await result.json();
                            setTrack(json);
                        }
                        else {
                            setError(true);
                            setErrorMessage('Failed to retrieve Track Information');
                            setTrack([]);
                        }
                    });
            }
        }
        else {
            accessToken = refreshTokenFunc();
        }
    }
    const getDomColor = () => {
        try {
            const options = {

                crossOrigin: 'anonymous'
            }
            extractColors(track?.album?.images[1]?.url, options)
                .then((result) => { setColor1(result[0].hex); setColor2(result[1].hex); })
                .catch(console.error);
        }
        catch {

        }
    }
    const getParams = () => {
        if (!autoSearch && genreParams == '') {
            setOpenSnackbar(true);
            setSnackbarMessage('Error: Please select at least 1 Genre');
        }
        else {
            setTotalParams(filterParams + genreParams);
        }
    }
    const setSearchParams = (params) => {
        setFilterParams(params);
    }
    const setGenresParams = (params) => {
        setGenreParams(params);
    }
    const toggleAdvancedFilters = () => {
        setShowAdvanced(!showAdvanced);
    }
    const redirectToProfile = (trackURL) => {
        document.location.href = trackURL;
    }

    return (
        <Box>

            {error ? (<Alert severity="error" variant="outlined">
                <AlertTitle>Error</AlertTitle>
                {errorMessage}
            </Alert>
            ) : (
                <Box>

                    {autoSearch ? (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Card sx={{ maxWidth: '100%', background: 'linear-gradient(to bottom right, ' + color1 + '33 0%, ' + '#16191aFF' + ' 100%)', backgroundColor: '#16191a' }}>
                                    <CardContent>
                                        <Stack direction="row" justifyContent={"flex-end"} spacing={1}>
                                            <Button size="large" onClick={getParams} sx={{ color: '#999999' }}>
                                                Search   <SearchIcon sx={{ ml: '10px', color: '#c4c4c4' }} />
                                            </Button>
                                        </Stack>

                                        <CardActionArea onClick={() => { redirectToProfile(track?.external_urls?.spotify) }}>

                                            <Stack direction="row" justifyContent={"left"} spacing={2}>

                                                <CardMedia
                                                    component="img"

                                                    sx={{ m: '0px', padding: '0em', objectFit: "contain", width: '150px' }}
                                                    image={track?.album?.images[1].url}
                                                    alt="Album Cover"
                                                >
                                                </CardMedia>

                                                <Stack direction="column" justifyContent={"center"} spacing={0}>

                                                    <Typography sx={{ color: '#c4c4c4', typography: { xs: 'h5', lg: 'h4' } }} component="div">
                                                        {track.name}
                                                    </Typography>

                                                    <Typography sx={{ color: '#71c1e3' }} variant="h6" color="text.secondary">
                                                        {track?.artists?.map((artist, index) => (index ? ', ' : '') + artist.name)}
                                                    </Typography>
                                                    <Typography sx={{ color: '#999999' }} variant="body2" color="text.secondary">
                                                        {track?.album?.name}
                                                    </Typography>
                                                    <Typography sx={{ color: '#999999' }} variant="body2" color="text.secondary">
                                                        Released {moment(track?.album?.release_date).fromNow()}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </CardActionArea>


                                    </CardContent>
                                    <CardActions onClick={toggleAdvancedFilters} sx={{
                                        alignSelf: "stretch",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "flex-start",
                                        // 👇 Edit padding to further adjust position
                                        pb: 2,
                                        pr: 2,
                                        ':hover': {
                                            cursor: 'pointer'
                                        }
                                    }}>
                                        {showAdvanced ? (<UnfoldLessIcon size="large" sx={{ color: '#71c1e3' }} />) : (<UnfoldMoreIcon size="large" sx={{ color: '#71c1e3' }} />)}

                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Collapse in={showAdvanced}>
                                    <FilterOptions aT={accessToken} id={id} setSearchParams={setSearchParams} />
                                </Collapse>
                            </Grid>
                            <Grid item xs={12}>
                                <RecommendedSongs aT={accessToken} id={id} totalParams={totalParams} auto={autoSearch} setRows={setRows} rows={rows} initPlayingArr={initPlayingArr} playingArr={playingArr} setIsPlayingArr={setIsPlayingArr} setIndex={setIndex} setType={setType} setTrackID={setTrackID} trackID={trackID} />
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Card sx={{ maxWidth: '100%', bgcolor: '#16191a' }}>

                                    <CardContent>
                                        <Stack direction="row" spacing={1} justifyContent='space-between'>
                                            <Grid container direction="row" alignItems="center">
                                                <Typography sx={{ color: '#c4c4c4', typography: { xs: 'h5', lg: 'h4' } }} gutterBottom component="div">
                                                    Recommended Tracks
                                                </Typography>
                                            </Grid>
                                            <Stack direction="row" justifyContent={"flex-end"} spacing={0}>
                                                <Button size="large" onClick={getParams} sx={{ color: '#999999' }}>
                                                    Search   <SearchIcon sx={{ ml: '10px', color: '#c4c4c4' }} />
                                                </Button>
                                            </Stack>
                                        </Stack>
                                        <GenreDropDown aT={accessToken} genres={props.genres} setGenresParams={setGenresParams} />
                                    </CardContent>
                                    <CardActions onClick={toggleAdvancedFilters} sx={{
                                        alignSelf: "stretch",
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        alignItems: "flex-start",
                                        // 👇 Edit padding to further adjust position
                                        pb: 2,
                                        pr: 2,
                                    }}>
                                        {showAdvanced ? (<UnfoldLessIcon sx={{ color: '#71c1e3' }} />) : (<UnfoldMoreIcon sx={{ color: '#71c1e3' }} />)}
                                    </CardActions>
                                </Card>
                            </Grid>
                            <Grid item xs={12}>
                                <Collapse in={showAdvanced}>
                                    <FilterOptions aT={accessToken} id={id} setSearchParams={setSearchParams} />
                                </Collapse>
                            </Grid>
                            <Grid item xs={12}>
                                <RecommendedSongs aT={accessToken} id={id} totalParams={totalParams} auto={autoSearch} setRows={setRows} rows={rows} initPlayingArr={initPlayingArr} playingArr={playingArr} setIsPlayingArr={setIsPlayingArr} setIndex={setIndex} setType={setType} setTrackID={setTrackID} trackID={trackID} />
                            </Grid>
                        </Grid>
                    )
                    }
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
                </Box >
            )}
        </Box>
    );
}