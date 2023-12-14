import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, CardActions, Grid } from '@mui/material';
import PopularPlaylists from './PopularPlaylists';
import ByGenre from './ByGenre';
import UserFollowedSongs from '../Profile/UserFollowedSongs';
import UserPlaylistSongs from '../Profile/UserPlaylistSongs';
import UserAlbumSongs from '../Profile/UserAlbumSongs';
import UserFollowedArtistsTopSongs from '../Profile/UserFollowedArtistsTopSongs';
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
export default function MultiActionAreaCard(props) {
    const { setRows, rows, initPlayingArr, playingArr, setIsPlayingArr, setIndex, setType, setMedia, setTrackID, trackID, selectedPlaylist, selectedPlaylistAlbumMedia, selectedPlaylistDateAdded, selectedPlaylistName, setSelectedPlaylist, setSelectedPlaylistAlbumMedia, setSelectedPlaylistDateAdded, setSelectedPlaylistName } = props

    const accessToken = localStorage.getItem('accessToken');
    const [profile, setProfile] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [displayed, setDisplayed] = React.useState('Liked');

    const [artistID, setArtistID] = React.useState('');

    React.useEffect(() => { getPage() }, [])

    const getPage = async () => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        const type = params.get("type");
        const name = params.get("name");
        const date = decodeURIComponent(params.get("date"));
        const media = decodeURIComponent(params.get('media'));

        if (id != '' && type != '' && type != null && type != 'undefined') {
            setDisplayed(type);
            setSelectedPlaylist(id);
            setSelectedPlaylistName(name);
            setSelectedPlaylistDateAdded(date);
            setSelectedPlaylistAlbumMedia(media);
            setArtistID(id);
        }
        else {
            setDisplayed('Liked')
        }
        window.document.title='Home | '+ displayed;


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
    return (
        <Box sx={{userSelect:'none', '-webkit-touch-callout': 'none'}}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <PopularPlaylists userID={profile.id} aT={accessToken} setDisplayed={updateDisplayed} setSelectedPlaylist={updateSelectedPlaylist} setSelectedPlaylistName={updateSelectedPlaylistName}></PopularPlaylists>
                        </Grid>
                        <Grid item xs={12}>
                            <ByGenre userID={profile.id} aT={accessToken} setDisplayed={updateDisplayed} setSelectedPlaylist={updateSelectedPlaylist} setSelectedPlaylistName={updateSelectedPlaylistName} setDateAdded={updateDateAdded} setAlbumMedia={updateAlbumMedia}></ByGenre>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>

                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                            <Box sx={{ display: { xs: 'none', md: 'none', lg: 'inherit', xl: 'inherit' } }}>

                                <Card sx={{ bgcolor: '#16191a' }} >
                                    <CardActionArea component={Link} to={'/About'}>
                                        <Box overflow='hidden'>
                                            <CardMedia
                                                sx={{ filter: '' }}
                                                component="img"
                                                height="140px"
                                                image="./HomeBackground2.png"
                                                alt="green iguana"
                                            />
                                        </Box>

                                    </CardActionArea>

                                </Card>
                            </Box>

                        </Grid>
                        <Grid item xs={12}>
                            {displayed == 'Liked' && <UserFollowedSongs aT={accessToken} setDisplayed={updateDisplayed} setArtistID={updateArtistID} setSelectedPlaylist={updateSelectedPlaylist} setSelectedPlaylistName={updateSelectedPlaylistName} setDateAdded={updateDateAdded} setAlbumMedia={updateAlbumMedia}
                                setRows={setRows} rows={rows} initPlayingArr={initPlayingArr} playingArr={playingArr} setIsPlayingArr={setIsPlayingArr} setIndex={setIndex} setType={setType} setTrackID={setTrackID} trackID={trackID}></UserFollowedSongs>}
                            {displayed == 'Playlists' && <UserPlaylistSongs aT={accessToken} playlistID={selectedPlaylist} playlistName={selectedPlaylistName} setDisplayed={updateDisplayed} setArtistID={updateArtistID} setSelectedPlaylist={updateSelectedPlaylist} setSelectedPlaylistName={updateSelectedPlaylistName} setDateAdded={updateDateAdded} setAlbumMedia={updateAlbumMedia}
                                setRows={setRows} rows={rows} initPlayingArr={initPlayingArr} playingArr={playingArr} setIsPlayingArr={setIsPlayingArr} setIndex={setIndex} setType={setType} setTrackID={setTrackID} trackID={trackID} from={'Home'}></UserPlaylistSongs>}
                             {displayed == 'Artists' && <UserFollowedArtistsTopSongs aT={accessToken} artistID={artistID} setDisplayed={updateDisplayed} setArtistID={updateArtistID} setSelectedPlaylist={updateSelectedPlaylist} setSelectedPlaylistName={updateSelectedPlaylistName} setDateAdded={updateDateAdded} setAlbumMedia={updateAlbumMedia}
                                setRows={setRows} rows={rows} initPlayingArr={initPlayingArr} playingArr={playingArr} setIsPlayingArr={setIsPlayingArr} setIndex={setIndex} setType={setType} setTrackID={setTrackID} trackID={trackID}></UserFollowedArtistsTopSongs>}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={2}>


                </Grid>
            </Grid>
        </Box >

    );
}