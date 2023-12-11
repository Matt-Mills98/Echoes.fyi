import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Outlet, Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import refreshTokenFunc from '../SignIn/RefreshToken';
import checkAccessToken from '../SignIn/CheckAccessToken'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
export default function MultiActionAreaCard(props) {
    let { userID, aT, setArtistID, setDisplayed } = props;
    const accessToken = localStorage.getItem('accessToken');
    const [artists, setArtists] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    React.useEffect(() => { getArtists(0) }, [page]);


    const getArtists = async (off) => {
        if (!checkAccessToken()) {

        off = (page - 1) * 5
        var after = '';
        if (userID == 'undefined' || userID == '' || userID == null) {
            userID = localStorage.getItem('userID');
        }
        if (off != 0) {
            await fetch(artists.artists.next, {
                method: "GET", headers: { Authorization: `Bearer ${aT}` }
            })
                .then(async (result) => {
                    if (result.ok) {
                        const json = await result.json();
                        setArtists(json);
                    }
                    else {
                        setError(true);
                        setErrorMessage('Failed to retrieve Profile Information');
                        setArtists([]);
                    }
                });

        }
        else {
            if (userID == 'undefined' || userID == '' || userID == null) {

            }

            else {

                await fetch("https://api.spotify.com/v1/me/following?type=artist&limit=5" + after, {
                    method: "GET", headers: { Authorization: `Bearer ${aT}` }
                })
                    .then(async (result) => {
                        if (result.ok) {
                            const json = await result.json();
                            setArtists(json);
                        }
                        else {
                            setError(true);
                            setErrorMessage('Failed to retrieve Artists');
                            setArtists([]);
                        }
                    });

            }
        }
    }
    else{
        aT =refreshTokenFunc();
    }
    }

    const redirectToProfile = async () => {
        //document.location.href = profile.external_urls.spotify;
    }

    const updateArtistID = (id) => {
        setArtistID(id);
    }
    const updateDisplayed = (display) => {
        setDisplayed(display);
    }
    const changePage = (event, value) => {
        setPage(value)
    }
    return (
        <Card sx={{ maxWidth: '100%', bgcolor: '#16191a' }}>
            {artists.items != [] &&
                <CardContent>
                    <Typography sx={{ color: '#71c1e3' }} variant="h6" >
                        Followed Artists
                    </Typography>
                    {artists.artists?.items?.map((item) =>
                        <Box>
                            <Card component={Link} to={'/Artist?id=' + item?.id} onClick={() => { updateArtistID(item?.id); updateDisplayed('Artists') }} elevation={0} sx={{
                                display: 'flex', bgcolor: '#16191a', width: '100%', height: '10',
                                ':hover': {
                                    bgcolor: '#272c2e',
                                    transition: '0.25s',
                                    cursor: 'pointer'
                                },
                            }}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        margin: 'auto', display: 'block', width: '50px', height: '20%', borderRadius: '4px', marginLeft: '3%'
                                    }}
                                    image={item.images[0].url}
                                />
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography sx={{ color: '#FFFFFF' }} variant="body2">
                                        {item.name}
                                    </Typography>
                                    <Typography sx={{ color: '#999999' }} variant="body2">
                                        {item.followers.total.toLocaleString()} Followers
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    )}
                    <Grid container justifyContent="center">
                        <Pagination sx={{
                            "& .MuiPaginationItem-root": {
                                color: "#999999",
                                '&.Mui-selected': {
                                    background: '#71c1e3',
                                    color: 'black',
                                    // borderRadius: '50%',
                                },
                            },
                            float: 'center'
                        }} count={Math.ceil(artists?.artists?.total / 5)} page={page} onChange={changePage} />
                    </Grid>
                </CardContent>

            }
        </Card>
    );
}