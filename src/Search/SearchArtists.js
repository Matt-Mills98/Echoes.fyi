import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {  Box } from '@mui/material';

import {  Link } from "react-router-dom";
import Grid from '@mui/material/Grid';

export default function MultiActionAreaCard(props) {
    const { aT, artists } = props;
    const [page, setPage] = React.useState(1);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');



    const redirectToProfile = async () => {
        //document.location.href = profile.external_urls.spotify;
    }

    const updateArtistID = (id) => {
        // setArtistID(id);
    }
    const updateDisplayed = (display) => {
        // setDisplayed(display);
    }
    const changePage = (event, value) => {
        setPage(value)
    }
    return (
        <div>
            {artists?.items != [] &&
                <CardContent sx={{ margin: '0px', padding: '0px' }}>
                    <Typography sx={{
                        color: '#71c1e3', userSelect: 'none'
                    }} variant="h6" >
                        Artists
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
                                {artists?.items?.map((item) =>

                                    <Grid item xs={12}>

                                        <Box>

                                            <Card component={Link} to={'/Artist?&id=' + item?.id}
                                                onClick={() => { updateArtistID(item?.id); updateDisplayed('Artists') }} elevation={0} sx={{
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
                                                            color: '#FFFFFF'
                                                        }} variant="body2">
                                                            {item?.name}
                                                        </Typography>
                                                        <Typography noWrap sx={{ color: '#999999' }} variant="body2">
                                                            {item?.followers?.total?.toLocaleString()} Followers
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
        </div>
    );
}