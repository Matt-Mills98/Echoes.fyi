import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Box } from '@mui/material';
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';

export default function MultiActionAreaCard(props) {
    const { aT, playlists } = props;
    const accessToken = localStorage.getItem('accessToken');
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [total, setTotal] = React.useState(0);
    const [page, setPage] = React.useState(1);


    const redirectToProfile = async () => {
        //document.location.href = profile.external_urls.spotify;
    }

    const updateDisplayed = (type) => {
        //setDisplayed(type);
        console.log('Hit');
    }
    const updateSelectedPlaylist = (id, name, dateAdded, media) => {
        //setSelectedPlaylist(id);
        //setSelectedPlaylistName(name);
        //setDateAdded(dateAdded);
        //setAlbumMedia(media);
        //console.log('ID ' + id);
    }
    const changePage = (event, value) => {
        setPage(value)
    }
    return (
        <div>
            {playlists?.items != [] &&
                <CardContent sx={{ margin: '0px', padding: '0px' }}>
                    <Typography sx={{
                        color: '#71c1e3', userSelect: 'none'
                    }} variant="h6" >
                        Albums
                    </Typography>
                    <Box sx={{
                        maxHeight: '40vh', maxWidth: '92vw'
                    }}>
                        <Box sx={{
                            maxHeight: '40vh', maxWidth: '100%', overflow: 'auto' /* Firefox */,
                            "&::-webkit-scrollbar": {
                                height: '10px',
                                backgroundColor: '#0f0f0f',
                                overflow: 'auto',
                                whiteSpace: 'nowrap',
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
                                {playlists?.items?.map((item) =>

                                    <Grid item xs={12}>

                                        <Box>

                                            <Card component={Link} to={'/Album?&id=' + item?.id + '&name=' + item?.name + '&date=' + encodeURIComponent(item?.release_date) + '&media=' + encodeURIComponent(item?.images[1].url)}
                                                onClick={() => { updateDisplayed('Albums'); updateSelectedPlaylist(item?.id, item?.name, item?.added_at, item.images[0].url); }} elevation={0} sx={{
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
                                                            {item.artists[0].name}
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
    );
}