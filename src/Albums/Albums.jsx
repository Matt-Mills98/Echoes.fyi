import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Grid } from '@mui/material';
import UserAlbumSongs from '../Profile/UserAlbumSongs';
import { extractColors } from 'extract-colors'
import moment from 'moment/moment';
import { useLocation } from "react-router-dom";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
export default function MultiActionAreaCard(props) {
    const { setRows, rows, initPlayingArr, playingArr, setIsPlayingArr, setIndex, setType, setMedia, setTrackID, trackID, setSelectedPlaylist, setSelectedPlaylistAlbumMedia, setSelectedPlaylistDateAdded, setSelectedPlaylistName } = props

    const accessToken = localStorage.getItem('accessToken');
    const [profile, setProfile] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [displayed, setDisplayed] = React.useState('Liked');
    const [color1, setColor1] = React.useState('');
    const [artistID, setArtistID] = React.useState('');
    const search = useLocation().search;
    const params = new URLSearchParams(search); const id = params.get("id");
    const type = params.get("type");
    const name = decodeURIComponent(params.get("name"));
    const date = decodeURIComponent(params.get("date"));
    const media = decodeURIComponent(params.get('media'));

    React.useEffect(() => { getDomColor(); updatePlaylist() }, [id])

    const updatePlaylist = () => {
        updateSelectedPlaylist(id);
        updateAlbumMedia(media);
        updateDateAdded(date);
        updateSelectedPlaylistName(name);
    }


    const getDomColor = () => {
        try {
            const options = {
                crossOrigin: 'anonymous'
            }
            extractColors(media, options)
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
    const redirect = () => {
        window.location.href = 'https://open.spotify.com/album/' + id
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
                                            <Stack direction="row" justifyContent={"left"} spacing={2}>

                                                <CardMedia
                                                    component="img"
                                                    height="140px"
                                                    width='140px'
                                                    sx={{ m: '0px', p: '0px', objectFit: "contain" }}
                                                    image={media}
                                                    alt="Album Cover"
                                                >
                                                </CardMedia>
                                                <Stack direction="column" justifyContent={"center"} spacing={0}>

                                                    <Typography sx={{ color: '#c4c4c4' }} variant="h4" component="div">
                                                        {name}
                                                    </Typography>


                                                    <Typography sx={{ color: '#999999' }} variant="body2" color="text.secondary">
                                                        Released {moment(date).fromNow()}
                                                    </Typography>
                                                </Stack>
                                            </Stack>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>

                            </Grid>
                            <Grid item xs={12}>
                                <UserAlbumSongs aT={accessToken} playlistID={id} playlistName={name} albumDateAdded={date} albumMedia={media} setDisplayed={updateDisplayed} setArtistID={updateArtistID} setSelectedPlaylist={updateSelectedPlaylist} setSelectedPlaylistName={updateSelectedPlaylistName} setDateAdded={updateDateAdded} setAlbumMedia={updateAlbumMedia}
                                    setRows={setRows} rows={rows} initPlayingArr={initPlayingArr} playingArr={playingArr} setIsPlayingArr={setIsPlayingArr} setIndex={setIndex} setType={setType} updateGlobalMedia={updateGlobalMedia} setTrackID={setTrackID} trackID={trackID}></UserAlbumSongs>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={2}>


                    </Grid>
                </Grid>)}
        </Box >

    );
}