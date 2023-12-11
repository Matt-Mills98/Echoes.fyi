import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box,  CardActionArea, Grid } from '@mui/material';
import UserPlaylists from './UserPlaylists';
import UserSavedAlbums from './UserSavedAlbums';
import UserFollowedSongs from './UserFollowedSongs';
import UserPlaylistSongs from './UserPlaylistSongs';
import UserFollowedArtistsTopSongs from './UserFollowedArtistsTopSongs';
import refreshTokenFunc from '../SignIn/RefreshToken';
import checkAccessToken from '../SignIn/CheckAccessToken'
function capitalizeFirstLetter(string) {
    try {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    catch {

    }
}
export default function MultiActionAreaCard(props) {
    const { setRows, rows, initPlayingArr, playingArr, setIsPlayingArr, setIndex, setType, setMedia, setTrackID, trackID, selectedPlaylist, selectedPlaylistAlbumMedia, selectedPlaylistDateAdded, selectedPlaylistName, setSelectedPlaylist, setSelectedPlaylistAlbumMedia, setSelectedPlaylistDateAdded, setSelectedPlaylistName } = props
    let accessToken = localStorage.getItem('accessToken');
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const type = params.get("type");
    const name = params.get("name");
    const date = decodeURIComponent(params.get("date"));
    const media = decodeURIComponent(params.get('media'));

    const [profile, setProfile] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [displayed, setDisplayed] = React.useState('Liked');

    const [artistID, setArtistID] = React.useState('');

    React.useEffect(() => { getProfile() }, [])

    const getProfile = async () => {
        if (!checkAccessToken()) {

        await fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
        })
            .then(async (result) => {
                if (result.ok) {
                    const json = await result.json();
                    localStorage.setItem('userID', json.id);
                    setProfile(json);
                }
                else {
                    setError(true);
                    setErrorMessage('Failed to retrieve Profile Information');
                    setProfile([]);
                }
            });
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
        window.document.title='Profile | '+ displayed;

    }
    else{
        accessToken = refreshTokenFunc();
    }

    }
    const redirectToProfile = async () => {
        document.location.href = profile.external_urls.spotify;
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
        //console.log(media);
        setSelectedPlaylistAlbumMedia(media);

    }
    const updateArtistID = (id) => {
        setArtistID(id);
    }

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <UserPlaylists userID={profile.id} aT={accessToken} setDisplayed={updateDisplayed} setSelectedPlaylist={updateSelectedPlaylist} setSelectedPlaylistName={updateSelectedPlaylistName}></UserPlaylists>
                        </Grid>
                        <Grid item xs={12}>
                            <UserSavedAlbums userID={profile.id} aT={accessToken} setDisplayed={updateDisplayed} setSelectedPlaylist={updateSelectedPlaylist} setSelectedPlaylistName={updateSelectedPlaylistName} setDateAdded={updateDateAdded} setAlbumMedia={updateAlbumMedia}></UserSavedAlbums>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={10} xl={10}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Box sx={{ display: { xs: 'none', md: 'none', lg: 'inherit', xl: 'inherit' } }}>
                                <Card sx={{ maxWidth: '100%', bgcolor: '#16191a' }}>
                                    {profile != [] &&
                                        <CardActionArea onClick={redirectToProfile}>
                                            <CardContent sx={{
                                                position: 'absolute',

                                            }}>
                                                <Typography sx={{ color: '#c4c4c4' }} variant="h4" component="div">
                                                    Welcome {profile.display_name}
                                                </Typography>
                                                <Typography sx={{ color: '#71c1e3' }} variant="h6" >
                                                    {capitalizeFirstLetter(profile?.product)} Subscription
                                                </Typography>
                                                <Typography sx={{ color: '#999999' }} variant="body2" >
                                                    Country: {profile.country}
                                                </Typography>
                                                {profile.followers != null &&
                                                    <Typography sx={{ color: '#999999' }} variant="body2" >
                                                        Followers: {profile.followers.total}
                                                    </Typography>
                                                }
                                            </CardContent>
                                        </CardActionArea>
                                    }
                                    <Box overflow='hidden'>
                                        <CardMedia
                                            sx={{ filter: '' }}
                                            component="img"
                                            height="140px"
                                            image='./ProfileBG.png'
                                            alt="Album Cover"
                                        ></CardMedia>
                                    </Box>

                                </Card>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            {displayed == 'Liked' && <UserFollowedSongs aT={accessToken} setDisplayed={updateDisplayed} setArtistID={updateArtistID} setSelectedPlaylist={updateSelectedPlaylist} setSelectedPlaylistName={updateSelectedPlaylistName} setDateAdded={updateDateAdded} setAlbumMedia={updateAlbumMedia}
                                setRows={setRows} rows={rows} initPlayingArr={initPlayingArr} playingArr={playingArr} setIsPlayingArr={setIsPlayingArr} setIndex={setIndex} setType={setType} setTrackID={setTrackID} trackID={trackID}></UserFollowedSongs>}
                            {displayed == 'Playlists' && <UserPlaylistSongs aT={accessToken} playlistID={selectedPlaylist} playlistName={selectedPlaylistName} setDisplayed={updateDisplayed} setArtistID={updateArtistID} setSelectedPlaylist={updateSelectedPlaylist} setSelectedPlaylistName={updateSelectedPlaylistName} setDateAdded={updateDateAdded} setAlbumMedia={updateAlbumMedia}
                                setRows={setRows} rows={rows} initPlayingArr={initPlayingArr} playingArr={playingArr} setIsPlayingArr={setIsPlayingArr} setIndex={setIndex} setType={setType} setTrackID={setTrackID} trackID={trackID} from={'Profile'}></UserPlaylistSongs>}
                             {displayed == 'Artists' && <UserFollowedArtistsTopSongs aT={accessToken} artistID={artistID} setDisplayed={updateDisplayed} setArtistID={updateArtistID} setSelectedPlaylist={updateSelectedPlaylist} setSelectedPlaylistName={updateSelectedPlaylistName} setDateAdded={updateDateAdded} setAlbumMedia={updateAlbumMedia}
                                setRows={setRows} rows={rows} initPlayingArr={initPlayingArr} playingArr={playingArr} setIsPlayingArr={setIsPlayingArr} setIndex={setIndex} setType={setType} setTrackID={setTrackID} trackID={trackID}></UserFollowedArtistsTopSongs>}
                        </Grid>
                    </Grid>
                </Grid>



            </Grid>
        </Box>
    );
}