import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {  Box } from '@mui/material';

import {  Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import refreshTokenFunc from '../SignIn/RefreshToken';
import checkAccessToken from '../SignIn/CheckAccessToken'
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';


export default function MultiActionAreaCard(props) {
    let { userID, aT, setDisplayed, setSelectedPlaylist, setSelectedPlaylistName, setDateAdded, setAlbumMedia } = props;
    const accessToken = localStorage.getItem('accessToken');
    const [playlists, setPlaylists] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [total, setTotal] = React.useState(0);
    const [page, setPage] = React.useState(1);

    React.useEffect(() => { getPlaylists(0) }, [page, userID])

    const getPlaylists = async (off) => {
        if (!checkAccessToken()) {

            if (userID == 'undefined' || userID == '' || userID == null) {
                userID = localStorage.getItem('userID');
            }
            if (userID == 'undefined' || userID == '' || userID == null) {

            }
            else {
                off = (page - 1) * 5

                await fetch("https://api.spotify.com/v1/me/albums?limit=50&offset=" + off, {
                    method: "GET", headers: { Authorization: `Bearer ${aT}` }
                })
                    .then(async (result) => {
                        if (result.ok) {
                            const json = await result.json();
                            setPlaylists(json);
                            setTotal(json.total);
                        }
                        else {
                            setError(true);
                            setErrorMessage('Failed to retrieve Albums');
                            setPlaylists([]);
                        }
                    });

            }
        }
        else {
            aT = refreshTokenFunc();
        }
    }
    const redirectToProfile = async () => {
        //document.location.href = profile.external_urls.spotify;
    }

    const updateDisplayed = (type) => {
        setDisplayed(type);
        console.log('Hit');
    }
    const updateSelectedPlaylist = (id, name, dateAdded, media) => {
        setSelectedPlaylist(id);
        setSelectedPlaylistName(name);
        setDateAdded(dateAdded);
        setAlbumMedia(media);
        console.log('ID ' + id);
    }
    const changePage = (event, value) => {
        setPage(value)
    }
    return (
        <Box>
            {error ? (<Alert severity="error" variant="outlined">
                <AlertTitle>Error</AlertTitle>
                {errorMessage}
            </Alert>
            ) : (<Box>
                    <Box sx={{ display: { xs: 'none', md: 'none', lg: 'flex', xl: 'flex' } }}>
                        <Card sx={{ minWidth: '100%', bgcolor: '#16191a' }}>
                            {playlists.items != [] &&
                                <CardContent sx={{ margin: '15px', padding: '0px' }}>
                                    <Typography sx={{ color: '#71c1e3' }} variant="h6" >
                                        Your Saved Albums
                                    </Typography>
                                    <Box sx={{
                                        maxHeight: '32.6vh', overflow: 'auto', scrollbarWidth: "none" /* Firefox */,
                                        ':hover': {
                                            "&::-webkit-scrollbar-thumb": {
                                                backgroundColor: '#272c2e'
                                            },},
    
                                        "&::-webkit-scrollbar": {
                                            width: '10px',
                                            height: '10px',
                                            backgroundColor: '#16191a',
                                            display: 'inline-block',
                                            textAlign: 'center',
                                            ':hover': {
                                                cursor: 'pointer'
                                            }
                                        },
                                        "&::-webkit-scrollbar-thumb": {
                                            width: '10px',
    
                                            backgroundColor: '#16191a',
                                            borderRadius: '4px',
                                            height: '10px',
                                            
                                        },
                                    }}>
                                        {playlists.items?.map((item) =>
                                            <Card component={Link} to={'/Album?id=' + item?.album?.id + '&name=' + encodeURIComponent(item?.album?.name) + '&date=' + encodeURIComponent(item?.album?.release_date) + '&media=' + encodeURIComponent(item?.album.images[1].url)}
                                                onClick={() => { updateDisplayed('Albums'); updateSelectedPlaylist(item?.album?.id, item?.album?.name, item?.added_at, item.album.images[0].url); }} elevation={0} sx={{
                                                    display: 'flex', bgcolor: '#16191a', width: '100%', margin: '0px', textDecoration: 'none',
                                                    ':hover': {
                                                        bgcolor: '#272c2e',
                                                        transition: '.3s',
                                                        cursor: 'pointer'
                                                    },
                                                }}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{
                                                        mt: '12px', ml: '12px', display: 'block', width: '50px', height: '50px', borderRadius: '4px', padding: '0px'
                                                    }}
                                                    image={item.album.images[0].url}
                                                />
                                                <CardContent sx={{ flex: '1 0 auto', mt: '15px', ml: '15px', padding: '0px' }}>
                                                    <Typography sx={{ color: '#FFFFFF' }} variant="body2">
                                                        {item.album.name}
                                                    </Typography>
                                                    <Typography sx={{ color: '#999999' }} variant="body2">
                                                        {item.album.artists[0].name}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        )}</Box>
                                    <Grid container justifyContent="center">
                                        <Pagination sx={{
                                            "& .MuiPaginationItem-root": {
                                                color: "#999999",
                                                '&.Mui-selected': {
                                                    backgroundColor: '#71c1e3',
                                                    color: 'black',
                                                    // borderRadius: '50%',
                                                },
                                            },
                                            float: 'center'
                                        }} size={'small'} count={Math.ceil(playlists?.total / 50)} page={page} onChange={changePage} />
                                    </Grid>
                                </CardContent>
                            }
                        </Card>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'flex', lg: 'none', xl: 'none' } }}>
                        <div>
                            {playlists?.items != [] &&
                                <CardContent sx={{ margin: '0px', padding: '0px' }}>
                                    <Typography sx={{
                                        color: '#71c1e3', userSelect: 'none'
                                    }} variant="h6" >
                                        Your Saved Albums
                                    </Typography>
                                    <Box sx={{
                                        maxHeight: '40vh', maxWidth: '92vw'
                                    }}>
                                        <Box sx={{
                                            maxHeight: '40vh', maxWidth: '100%', overflow: 'auto' /* Firefox */,
                                            "&::-webkit-scrollbar": {
                                                height: '10px',
                                                backgroundColor: '#0f0f0f',
                                                display: 'inline-block',
                                                textAlign: 'center',
                                                ':hover': {
                                                    cursor: 'pointer'
                                                }
                                            },
                                            "&::-webkit-scrollbar-thumb": {
                                                backgroundColor: '#272c2e',
                                                borderRadius: '4px',
                                                height: '10px',
                                                ':hover': {
                                                    cursor: 'pointer'
                                                }


                                            },
                                            userSelect: 'none'


                                        }}>
                                            <Grid container
                                                spacing={2}
                                                direction="row"
                                                alignItems="left"
                                                justifyContent="left"
                                                wrap='nowrap'
                                                sx={{}}>
                                                {playlists.items?.map((item) =>

                                                    <Grid item xs={12}>

                                                        <Box>

                                                            <Card component={Link} to={'/Album?type=Albums&id=' + item?.album?.id + '&name=' + item?.album?.name + '&date=' + encodeURIComponent(item?.album?.release_date) + '&media=' + encodeURIComponent(item?.album.images[1].url)}
                                                                onClick={() => { updateDisplayed('Albums'); updateSelectedPlaylist(item?.album?.id, item?.album?.name, item?.added_at, item.album.images[0].url); }} elevation={0} sx={{
                                                                    display: 'flex', bgcolor: '#16191a', paddingTop: '15px', paddingRight: '15px', paddingLeft: '15px', textDecoration: 'none', marginBottom: '20px', maxWidth: '100px',
                                                                    ':hover': {
                                                                        bgcolor: '#272c2e',
                                                                        transition: '.3s',
                                                                        cursor: 'pointer'
                                                                    },
                                                                }}>
                                                                <Grid>
                                                                    <CardMedia
                                                                        component="img"

                                                                        sx={{
                                                                            width: '100px', height: '100px', borderRadius: '2px'
                                                                        }}
                                                                        image={item.album.images[0].url ? (item.album.images[0].url) : ('./Spotify_Icon_RGB_Green.png')}
                                                                    />
                                                                    <CardContent sx={{
                                                                        marginLeft: '0px',
                                                                        paddingLeft: '0px',
                                                                        maxWidth: '100px',
                                                                        overflow: "hidden",
                                                                        "& .MuiCardContent-content": {
                                                                            overflow: "hidden"
                                                                        }
                                                                    }}>
                                                                        <Typography noWrap sx={{
                                                                            color: '#FFFFFF',
                                                                        }} variant="body2">
                                                                            {item.album.name}
                                                                        </Typography>
                                                                        <Typography noWrap sx={{ color: '#999999' }} variant="body2">
                                                                            {item.album.artists[0].name}
                                                                        </Typography>


                                                                    </CardContent>
                                                                </Grid>
                                                            </Card>
                                                        </Box>

                                                    </Grid>

                                                )}
                                            </Grid>

                                        </Box>
                                    </Box>
                                </CardContent>

                            }
                        </div >
                    </Box>
                </Box>
        )}
            </Box>
            );
}