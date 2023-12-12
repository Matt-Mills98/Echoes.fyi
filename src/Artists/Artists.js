import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Grid } from '@mui/material';
import UserFollowedArtistsTopSongs from '../Profile/UserFollowedArtistsTopSongs';
import { extractColors } from 'extract-colors'
import { useLocation } from "react-router-dom";
import refreshTokenFunc from '../SignIn/RefreshToken';
import checkAccessToken from '../SignIn/CheckAccessToken';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
export default function MultiActionAreaCard(props) {
    const { setRows, rows, initPlayingArr, playingArr, setIsPlayingArr, setIndex, setType, setMedia, setTrackID, trackID, setSelectedPlaylist, setSelectedPlaylistAlbumMedia, setSelectedPlaylistDateAdded, setSelectedPlaylistName } = props

    let accessToken = localStorage.getItem('accessToken');
    const [artist, setArtist] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [displayed, setDisplayed] = React.useState('Liked');
    const [color1, setColor1] = React.useState('');
    const [artistID, setArtistID] = React.useState('');
    const [image, setImage] = React.useState('');
    const search = useLocation().search;
    const params = new URLSearchParams(search);
    const id = params.get("id");
    const type = params.get("type");
    const name = decodeURIComponent(params.get("name"));
    const date = decodeURIComponent(params.get("date"));
    const media = decodeURIComponent(params.get('media'));

    React.useEffect(() => { getArtist() }, [id])
    React.useEffect(() => { getDomColor() }, [artist])


    const getArtist = async () => {
        if (!checkAccessToken()) {

            await fetch("https://api.spotify.com/v1/artists/" + id, {
                method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
            })
                .then(async (result) => {
                    if (result.ok) {
                        const json = await result.json();
                        setArtist(json);
                        setImage(json?.images[0]?.url);
                       
                        //initSelectedGenres(json.genres.length);
                    }
                    else {
                        setError(true);
                        setErrorMessage('Failed to retrieve Artist Information');
                        setArtist([]);
                    }
                });
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
            extractColors(image, options)
                .then((result) => { console.log(result); setColor1(result[0].hex); })
                .catch(console.error);
        }
        catch {
        }
    }
    const updateDisplayed = (type) => {
        setDisplayed(type);

    }
    const updateSelectedPlaylist = (playlist) => {
        setSelectedPlaylist(playlist);

    }
    const updateSelectedPlaylistName = (playlistName) => {
        setSelectedPlaylistName(playlistName);

    }

    const updateDateAdded = (date) => {
        setSelectedPlaylistDateAdded(date);

    }
    const updateGlobalMedia = (media) => {
        setMedia(media)
    }
    const updateAlbumMedia = (media) => {
        setSelectedPlaylistAlbumMedia(media);

    }
    const updateArtistID = (id) => {
        setArtistID(id);
    }
    const redirect = () => {
        window.location.href = 'https://open.spotify.com/artist/' + id
    }
    return (
        <Box>
            {error ? (<Alert severity="error" variant="outlined">
                <AlertTitle>Error</AlertTitle>
                {errorMessage}
            </Alert>
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                        <Grid container spacing={2}>

                            <Grid item xs={12}>

                                <Card sx={{ maxWidth: '100%', background: 'linear-gradient(to bottom right, ' + color1 + '33 0%, ' + '#16191aFF' + ' 100%)', backgroundColor: '#16191a' }}>
                                    <CardActionArea onClick={redirect}>
                                        <CardContent>
                                            <Grid container spacing={2}>
                                                <Grid item sx={4}>
                                                    <CardMedia
                                                        component="img"
                                                        height="140px"
                                                        width='140px'
                                                        sx={{  objectFit: "contain" }}
                                                        image={image}
                                                        alt="Album Cover"
                                                    >
                                                    </CardMedia>
                                                </Grid>
                                                <Grid item sx={8}>
                                                    <Typography sx={{ color: '#c4c4c4' }} variant="h4" component="div">
                                                        {artist?.name}
                                                    </Typography>
                                                    <Typography sx={{ color: '#71c1e3' }} variant="h6" color="text.secondary">
                                                        Popularity: {artist?.popularity}
                                                    </Typography>
                                                    <Typography sx={{ color: '#999999' }} variant="body1" color="text.secondary">
                                                        Genres: {artist?.genres?.map((genre, index) => (index ? ', ' : '') + genre)}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>

                            </Grid >
                            <Grid item xs={12}>
                                <UserFollowedArtistsTopSongs aT={accessToken} artistID={id} playlistName={name} albumDateAdded={date} albumMedia={media} setDisplayed={updateDisplayed} setArtistID={updateArtistID} setSelectedPlaylist={updateSelectedPlaylist} setSelectedPlaylistName={updateSelectedPlaylistName} setDateAdded={updateDateAdded} setAlbumMedia={updateAlbumMedia}
                                    setRows={setRows} rows={rows} initPlayingArr={initPlayingArr} playingArr={playingArr} setIsPlayingArr={setIsPlayingArr} setIndex={setIndex} setType={setType} updateGlobalMedia={updateGlobalMedia} setTrackID={setTrackID} trackID={trackID}></UserFollowedArtistsTopSongs>
                            </Grid>
                        </Grid >
                    </Grid >
                    <Grid item xs={2}>


                    </Grid>
                </Grid >)
            }

        </Box >

    );
}