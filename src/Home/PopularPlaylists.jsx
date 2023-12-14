import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import refreshTokenFunc from '../SignIn/RefreshToken';
import checkAccessToken from '../SignIn/CheckAccessToken'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function MultiActionAreaCard(props) {
    let { userID, aT, setDisplayed, setSelectedPlaylist, setSelectedPlaylistName } = props;
    const accessToken = localStorage.getItem('accessToken');

    const [page, setPage] = React.useState(1);
    const [playlists, setPlaylists] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    React.useEffect(() => { getPlaylists(0) }, [page])

    const getPlaylists = async () => {
        if (!checkAccessToken()) {

            if (userID == 'undefined') {
                userID = props.userID
            }
            await fetch("https://api.spotify.com/v1/browse/featured-playlists?limit=50&country=US&local=en_US", {
                method: "GET", headers: { Authorization: `Bearer ${aT}` }
            })
                .then(async (result) => {
                    if (result.ok) {
                        const json = await result.json();
                        setPlaylists(json);
                    }
                    else {
                        setError(true);
                        setErrorMessage('Failed to retrieve Playlists');
                        setPlaylists([]);
                    }
                });
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
    }
    const updateSelectedPlaylist = (id, name) => {
        setSelectedPlaylist(id);
        setSelectedPlaylistName(name);
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
            ) : (
                <Box>
                    <Box sx={{ display: { xs: 'none', md: 'none', lg: 'flex', xl: 'flex' } }}>

                        <Card sx={{ minWidth: '100%', bgcolor: '#16191a' }}>
                            {playlists.playlists != [] &&
                                <CardContent sx={{ margin: '15px', padding: '0px' }}>
                                    <Typography gutterBottom sx={{ color: '#71c1e3' }} variant="h6" >
                                        Featured Playlists
                                    </Typography>
                                    <Box sx={{
                                        maxHeight: '33vh', overflow: 'auto',
                                        scrollbarWidth: "none" /* Firefox */,
                                        ':hover': {
                                            "&::-webkit-scrollbar-thumb": {
                                                backgroundColor: '#272c2e'
                                            },
                                        },

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
                                        {playlists.playlists?.items?.map((item) =>
                                            <Box>
                                                {item?.name != null &&

                                                    <Stack direction="row" alignItems="center" component={Link} to={'?&type=Playlists&id=' + item?.id + '&name=' + item?.name}
                                                        onClick={() => { updateDisplayed('Playlists'); updateSelectedPlaylist(item?.id, item?.name); }} elevation={0} sx={{
                                                            display: 'flex', borderRadius: '4px', bgcolor: '#16191a', width: '100%', textDecoration: 'none', whiteSpace: "nowrap",
                                                            textOverflow: "ellipsis",
                                                            ':hover': {
                                                                bgcolor: '#272c2e',
                                                                transition: '.3s',
                                                                cursor: 'pointer',
                                                            },
                                                        }}>
                                                        <CardMedia component="img" sx={{ p: '10px', m: '5px', ml: '0px', display: 'block', width: '45px', height: '45px' }}
                                                            image={item?.images[0].url}
                                                        />
                                                        <Stack sx={{
                                                            m: '0px', p: '0px',
                                                            overflow: "hidden",
                                                            "& .MuiCardContent-content": {
                                                                overflow: "hidden"
                                                            }
                                                        }} direction="column" alignItems="left" >

                                                            <Typography noWrap sx={{ color: '#FFFFFF', fontSize: { xs: '14px', sm: '14px', md: '14px', lg: '14px', xl: '14px' } }} variant="body2">
                                                                {item?.name}
                                                            </Typography>
                                                            <Stack sx={{ m: '0px', p: '0px' }} direction="row" alignItems="center">


                                                                <Typography noWrap sx={{ color: '#999999', fontSize: { xs: '11px', sm: '12px', md: '13px', lg: '14px', xl: '14px' } }} variant="body2">

                                                                    {item?.owner?.display_name}
                                                                </Typography>

                                                            </Stack>

                                                        </Stack>
                                                    </Stack>
                                                }
                                            </Box>
                                        )}
                                    </Box>

                                </CardContent>

                            }
                        </Card>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'flex', lg: 'none', xl: 'none' } }}>
                        <div>
                            {playlists?.playlists != [] &&
                                <CardContent sx={{ margin: '0px', padding: '0px' }}>
                                    <Typography sx={{
                                        color: '#71c1e3', userSelect: 'none'
                                    }} variant="h6" >
                                        Featured Playlists
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
                                                {playlists.playlists?.items?.map((item) =>

                                                    <Grid item xs={12}>

                                                        <Box>
                                                            {item?.name != null &&

                                                                <Card component={Link} to={'?&type=Playlists&id=' + item?.id + '&name=' + item?.name}
                                                                    onClick={() => { updateDisplayed('Playlists'); updateSelectedPlaylist(item?.id, item?.name); }} elevation={0} sx={{
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
                                                                                width: '100px', height: '100px',
                                                                            }}
                                                                            image={item?.images[0]?.url ? (item?.images[0]?.url) : ('./Spotify_Icon_RGB_Green.png')}
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
                                                                                {item.name}
                                                                            </Typography>
                                                                            <Typography noWrap sx={{ color: '#999999' }} variant="body2">
                                                                                {item.owner?.display_name}
                                                                            </Typography>


                                                                        </CardContent>
                                                                    </Grid>
                                                                </Card>
                                                            }
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