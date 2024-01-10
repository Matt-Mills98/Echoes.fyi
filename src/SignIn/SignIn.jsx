import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Box, Link } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from "@mui/material/Grid";
import LoginIcon from '@mui/icons-material/Login';
import React from "react";
import Fab from '@mui/material/Fab';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Grow from '@mui/material/Grow';
import Fade from '@mui/material/Fade';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
const clientId = "cb2281b91efd4dd2a548e71374e311ff";
const params = new URLSearchParams(window.location.search);
const code = params.get("code");

async function handleOAuth() {
    if (!code) {
        await redirectToAuthCodeFlow(clientId);
    } else {
        /*const accessToken = await getAccessToken(clientId, code);
        const profile = await fetchProfile(accessToken);
        const playlists = await fetchPlaylists(accessToken, profile.id);
        populateUI(profile, playlists);*/
    }
}

async function redirectToAuthCodeFlow(clientId) {
    const verifier = await generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);
    if (verifier != null) {
        localStorage.setItem("verifier", verifier);

        const params = new URLSearchParams();
        params.append("client_id", clientId);
        params.append("response_type", "code");
        params.append("redirect_uri", "https://echoes.fyi/callback");
        params.append("scope", "user-read-private playlist-read-collaborative playlist-read-private user-read-recently-played user-library-read user-library-modify user-follow-read streaming user-modify-playback-state user-top-read");
        params.append("code_challenge_method", "S256");
        params.append("code_challenge", challenge);

        document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    }
}

async function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}


export default function SignIn(props) {
    const { setProfile } = props;
    const [page, setPage] = React.useState('');
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    //const [accessToken, setAccessToken] = React.useState('');

    const verifier = localStorage.getItem("verifier");
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    React.useEffect(() => { autoPage() }, []);
    //React.useEffect(() => { if (accessToken != '') { getProfile() } }, [accessToken]);

    const autoPage = () => {
        if (code != '' && code != null) { getAccessToken() }
    }

    const getAccessToken = async () => {
        const clientId = "cb2281b91efd4dd2a548e71374e311ff";

        if (code != '' && code != null) {

            setPage('callback');

            const params2 = new URLSearchParams();
            params2.append("client_id", clientId);
            params2.append("grant_type", "authorization_code");
            params2.append("code", code);
            params2.append("redirect_uri", "https://echoes.fyi/callback");
            params2.append("code_verifier", verifier);

            await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: params2
            })
                .then(async (result) => {
                    if (result.ok) {
                        const { access_token, refresh_token, expires_in } = await result.json();
                        const expirationSeconds = expires_in;
                        const expMS = expirationSeconds * 1000;
                        const date = new Date().getTime() + expMS;
                        localStorage.setItem('expires', date.toString());
                        localStorage.setItem("accessToken", access_token);
                        localStorage.setItem("refreshToken", refresh_token);
                        await getProfile(access_token);
                        await getGenres(access_token);
                        document.location = 'https://echoes.fyi/';
                        window.document.title = 'Home'
                    }
                    else {
                        setError(true);
                        setErrorMessage('Failed to retrieve Spotify API Token');

                    }
                });

        }

    }
    const getProfile = async (accessToken) => {
        if (accessToken != '') {
            await fetch("https://api.spotify.com/v1/me", {
                method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
            })
                .then(async (result) => {
                    if (result.ok) {
                        const json = await result.json();
                        localStorage.setItem("profilePic", json?.images[0]?.url);
                        //localStorage.setItem('userID', json.id);
                        //return json.id;
                    }
                    else {
                        setError(true);
                        setErrorMessage('Failed to retrieve Spotify API Token');
                    }
                });

        }

    }
    const getGenres = async (accessToken) => {
        await fetch("https://api.spotify.com/v1/recommendations/available-genre-seeds", {
            method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
        })
            .then(async (result) => {
                if (result.ok) {
                    const json = await result.json();
                    localStorage.setItem("genres", JSON.stringify(json?.genres));
                    //initSelectedGenres(json.genres.length);
                }
                else {

                }
            });


    }
    const updateView = (page) => {
        setPage(page);
    }
    return (
        <Box>
            {error ? (<Alert severity="error" variant="outlined">
                <AlertTitle>Error</AlertTitle>
                {errorMessage}
            </Alert>
            ) : (
                <div>

                    {page != 'callback' &&


                        <Grid container
                            spacing={2}
                        >
                            <Box component='img' src='./EchoesTextLogo.png' height={{ xs: '75px', xl: '100px' }} m={'12px'} sx={{ position: 'absolute', left: '0px', opacity: '.5' }}></Box>

                            <Grid item xs={0} md={0} lg={6} xl={6}>
                                <Box component='img' src='./SignInArt.png' width={{ xs: '0%', md: '0%', lg: '100%', xl: '100%' }}></Box>
                            </Grid>
                            {page == '' &&
                                <Grid item xs={12} md={12} lg={6} xl={6} sx={{
                                    alignItems: 'center', display: "flex", flexDirection: "column",
                                    justifyContent: "center"
                                }}>
                                    <Fade in={page == ''} >
                                        <Card sx={{
                                            bgcolor: '#16191a', m: '20px', pt: { xs: '100px', md: '100px', lg: '200px', xl: '200px' }, pb: { xs: '100px', md: '100px', lg: '200px', xl: '200px' }, alignItems: 'center', display: "flex", flexDirection: "column",
                                            justifyContent: "center"
                                        }}>

                                            <CardContent sx={{ alignItems: 'center', display: "flex", flexDirection: "column", justifyContent: "center" }}>
                                                <Box sx={{ alignItems: 'center', display: "flex", flexDirection: "row", justifyContent: "center" }}>
                                                    <Typography align="center" sx={{ color: '#FFFFFF' }} gutterBottom variant="h5" component="div">
                                                        Login with
                                                    </Typography>
                                                    <Box component='img' src='./Spotify_Logo_CMYK_White.png' height={'50px'} ml={'10px'} mb={'12.5px'}></Box>
                                                </Box>
                                                <Typography align="center" sx={{ color: '#999999' }} variant="body1" >Echoes.fyi uses the Spotify Web API to retrieve data from a user's Spotify Account. Please link your Spotify account via the Sign In button.</Typography>
                                            </CardContent>
                                            <CardContent sx={{ alignItems: 'center', display: "flex", flexDirection: "column", justifyContent: "center" }}>

                                                <Alert align="center" severity="info" variant="standard">
                                                    <AlertTitle align="center">Notice: Echoes.fyi is currently awaiting Spotify approval. Due to this, unauthorized users cannot access all features. For manual authorization, please contact <Link href={'mailto:contact@echoes.fyi'} color="inherit">contact@echoes.fyi</Link></AlertTitle>
                                                    {errorMessage}
                                                </Alert>
                                            </CardContent>
                                            <CardContent sx={{ alignItems: 'center', display: "flex", flexDirection: "column", justifyContent: "center", width: '100%' }}>
                                                <Button
                                                    sx={{ bgcolor: '#518da6', width: '75%', height: '50px', }}
                                                    onClick={handleOAuth}>
                                                    <Typography sx={{ color: 'white' }} mr={'10px'}>Sign in</Typography>
                                                    <LoginIcon sx={{ color: 'white' }} />
                                                </Button>
                                            </CardContent>
                                            <CardContent>
                                                <Grid container
                                                    spacing={0}
                                                    direction="column"
                                                    alignItems="center"
                                                    justifyContent="center">
                                                    <Link href="https://www.spotify.com/us/signup" sx={{ color: '#999999' }} variant="body1" underline="hover">Create Spotify account</Link>

                                                    <Link marginTop={'10px'} onClick={() => { updateView('About') }} sx={{ color: '#999999' }} variant="body1" underline="hover">About Echoes.fyi</Link>

                                                    <Link marginTop={'10px'} onClick={() => { updateView('Perms') }} sx={{ color: '#999999' }} variant="body1" underline="hover">Summary of requested permissions</Link>

                                                </Grid>
                                            </CardContent>

                                        </Card>
                                    </Fade>
                                </Grid>
                            }
                            {page == 'About' &&
                                <Grid item xs={12} md={10} lg={6} xl={6} sx={{
                                    alignItems: 'center', display: "flex", flexDirection: "column",
                                    justifyContent: "center"
                                }}> <Grow in={page == 'About'} >
                                        <Card sx={{ bgcolor: '#16191a' }}>
                                            <Fab sx={{ bgcolor: '#518da6', marginTop: '10px', ml: '10px' }} onClick={() => { updateView('') }}>
                                                <ArrowBackIcon />
                                            </Fab>
                                            <CardContent>
                                                <Typography align="left" sx={{ color: '#71c1e3' }} gutterBottom variant="h5" component="div">
                                                    About
                                                </Typography>
                                                <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                                    Echoes.fyi is a individual project built to assist users in retrieving and filtering song recommendations, viewing personal account statistics, and viewing track analyses. Full navigation can be done via the "more" button that appears on every track table. Feel free to reach out via the contact section for any feature requests or bug reports.
                                                </Typography>
                                            </CardContent>
                                            <CardContent>
                                                <Typography align="left" sx={{ color: '#71c1e3' }} gutterBottom variant="h5" component="div">
                                                    Primary Use Cases
                                                </Typography>
                                                <Box marginLeft={'20px'} marginTop={'20px'}>
                                                    <Typography align="left" sx={{ color: '#c4c4c4' }} gutterBottom variant="h6" component="div">
                                                        Use Case 1
                                                    </Typography>
                                                    <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                                        {'The ability to select genres and receive recommendations based on selected genres. These recommendations are to be sortable based on several variables (title, duration, album, popularity, etc.) and filterable based on track features. This can be done via the "Recommendation" tab on the top bar menu, where a user can select genres and then search.'}
                                                    </Typography>
                                                </Box>
                                                <Box marginLeft={'20px'} marginTop={'20px'}>
                                                    <Typography align="left" sx={{ color: '#c4c4c4' }} gutterBottom variant="h6" component="div">
                                                        Use Case 2
                                                    </Typography>
                                                    <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                                        {'The ability to select a track and retrieve recommendations based on that track. Like above, these recommendations are to be filterable and sortable. This can be done via selecting the horizontal ellipses "more" icon button and selecting the "Get Recommendation" menu item. This will redirect the user to the recommendations page where recommendations will be automatically populated based on the selected track.'}
                                                    </Typography>
                                                </Box>
                                                <Box marginLeft={'20px'} marginTop={'20px'}>
                                                    <Typography align="left" sx={{ color: '#c4c4c4' }} gutterBottom variant="h6" component="div">
                                                        Use Case 3
                                                    </Typography>
                                                    <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                                        {' The ability to view signed in account statistics. This can be done via the "Statistics" tab on the top bar menu. Once selected, info regarding the signed in user\'s most listened to tracks and artists will populate. '}
                                                    </Typography>
                                                </Box>
                                                <Box marginLeft={'20px'} marginTop={'20px'}>
                                                    <Typography align="left" sx={{ color: '#c4c4c4' }} gutterBottom variant="h6" component="div">
                                                        Use Case 4
                                                    </Typography>
                                                    <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                                        {'The ability to easily see audio analyses and track features based on a selected track. Like use case 2, this can be done by selecting the "more" button on any track table. Once selected, a dialog window will pop-up displaying information regarding the track. '}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                            <CardContent>
                                                <Typography align="left" sx={{ color: '#71c1e3' }} gutterBottom variant="h5" component="div">
                                                    Other Use Cases
                                                </Typography>
                                                <Box marginLeft={'20px'} marginTop={'20px'}>

                                                    <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                                        {'1) Every listed track can redirect to Spotify via the "more" button or bottom drawer when a track is playing.  '}
                                                    </Typography>
                                                </Box>
                                                <Box marginLeft={'20px'} marginTop={'20px'}>
                                                    <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                                        {'2) Partial or full playback based on user privileges. '}
                                                    </Typography>
                                                </Box>
                                                <Box marginLeft={'20px'} marginTop={'20px'}>

                                                    <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                                        {'3) Ability to view albums, top artist tracks, Spotify Featured Playlists, Spotify Genre Playlists, user followed tracks, user followed albums, user followed playlists, etc.'}
                                                    </Typography>
                                                </Box>
                                                <Box marginLeft={'20px'} marginTop={'20px'}>
                                                    <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                                        {'4) Searchability'}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                            <CardContent>
                                                <Typography align="left" sx={{ color: '#71c1e3' }} gutterBottom variant="h5" component="div">
                                                    Contact
                                                </Typography>
                                                <Button
                                                    href={'mailto:contact@echoes.fyi'}
                                                >
                                                    <Typography sx={{ textTransform: 'none', color: "#c4c4c4" }}>
                                                        contact@echoes.fyi
                                                    </Typography>
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </Grow>
                                </Grid>
                            }
                            {page == 'Perms' &&
                                <Grid item xs={12} md={10} lg={6} xl={6} sx={{
                                    alignItems: 'center', display: "flex", flexDirection: "column",
                                    justifyContent: "center"
                                }}>
                                    <Grow in={page == 'Perms'} >
                                        <Card sx={{ bgcolor: '#16191a' }}>
                                            <Fab sx={{ bgcolor: '#518da6', marginTop: '10px', ml: '10px' }} onClick={() => { updateView('') }}>
                                                <ArrowBackIcon />
                                            </Fab>
                                            <Box m={'10px'}>
                                                <CardContent>

                                                    <Typography align="left" sx={{ color: '#71c1e3' }} gutterBottom variant="h5" component="div">
                                                        Requested Permissions
                                                    </Typography>
                                                    <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                                        When accessing the Spotify API, certain permissions need to be requested. These permissions are visible when allowing Echoes.fyi to access your Spotify Information.
                                                        A summary of the requested permissions can be found below:
                                                    </Typography>
                                                    <Box marginLeft={'20px'} marginTop={'20px'}>
                                                        <Typography align="left" sx={{ color: '#c4c4c4' }} gutterBottom variant="h5" component="div">
                                                            "Read" Permissions
                                                        </Typography>
                                                        <Typography align="left" sx={{ color: '#999999' }} variant="body1"  >
                                                            The scopes in this section allow Echoes.fyi to view relevant data which is necessary for the functionality of Echoes.fyi.
                                                        </Typography>
                                                        <Box marginLeft={'20px'} marginTop={'20px'}>
                                                            <Typography align="left" sx={{ color: '#71c1e3' }} gutterBottom variant="h6" component="div">
                                                                User-Read-Private
                                                            </Typography>
                                                            <Typography align="left" sx={{ color: '#999999' }} variant="body2">
                                                                User-Read-Private allows Echoes.fyi to read a user's subscription details. This means Echoes.fyi can view whether a user is a free or a premium account.
                                                            </Typography>
                                                            <Typography align="left" sx={{ color: '#71c1e3' }} gutterBottom variant="h6" component="div" marginTop={'10px'}>
                                                                Playlist-Read-Collaborative
                                                            </Typography>
                                                            <Typography align="left" sx={{ color: '#999999' }} variant="body2" >
                                                                Playlist-Read-Collaborative allows Echoes.fyi to view collaborative playlists which are created/followed by a user. This is used when requesting playlists on a user's profile screen in Echoes.fyi.
                                                            </Typography>
                                                            <Typography align="left" sx={{ color: '#71c1e3' }} gutterBottom variant="h6" component="div" marginTop={'10px'}>
                                                                Playlist-Read-Private
                                                            </Typography>
                                                            <Typography align="left" sx={{ color: '#999999' }} variant="body2" >
                                                                Playlist-Read-Private allows Echoes.fyi to view private playlists which are created by a user. This is used when requesting playlists on a user's profile screen.
                                                            </Typography>
                                                            <Typography align="left" sx={{ color: '#71c1e3' }} gutterBottom variant="h6" component="div" marginTop={'10px'}>
                                                                User-Read-Recently-Played
                                                            </Typography>
                                                            <Typography align="left" sx={{ color: '#999999' }} variant="body2" >
                                                                User-Read-Recently-Played allows Echoes.fyi to view a user's recently played tracks.
                                                            </Typography>
                                                            <Typography align="left" sx={{ color: '#71c1e3' }} gutterBottom variant="h6" component="div" marginTop={'10px'}>
                                                                User-Library-Read
                                                            </Typography>
                                                            <Typography align="left" sx={{ color: '#999999' }} variant="body2" >
                                                                User-Library-Read allows Echoes.fyi to view a user's liked tracks and albums. This is used when retrieving liked tracks and albums in the users profile screen. This is also used when checking whether a song is "liked."
                                                            </Typography>
                                                            <Typography align="left" sx={{ color: '#71c1e3' }} gutterBottom variant="h6" component="div" marginTop={'10px'}>
                                                                User-Follow-Read
                                                            </Typography>
                                                            <Typography align="left" sx={{ color: '#999999' }} variant="body2" >
                                                                User-Follow-Read allows Echoes.fyi to view a user's followed artists. This is used when retrieving artists in the users profile screen.
                                                            </Typography>
                                                            <Typography align="left" sx={{ color: '#71c1e3' }} gutterBottom variant="h6" component="div" marginTop={'10px'}>
                                                                User-Top-Read
                                                            </Typography>
                                                            <Typography align="left" sx={{ color: '#999999' }} variant="body2" >
                                                                User-Top-Read allows Echoes.fyi to view a user's top tracks and artists, which is displayed in the "Statistics" section.
                                                            </Typography>
                                                        </Box>
                                                    </Box >
                                                    <Box marginLeft={'20px'} marginTop={'20px'}>

                                                        <Typography align="left" sx={{ color: '#c4c4c4' }} gutterBottom variant="h5" component="div">
                                                            "Write" Permissions
                                                        </Typography>
                                                        <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                                            The scopes in this section allow Echoes.fyi to write relevant data to/from Spotify.
                                                        </Typography>
                                                        <Box marginLeft={'20px'} marginTop={'20px'}>
                                                            <Typography align="left" sx={{ color: '#71c1e3' }} gutterBottom variant="h6" component="div" marginTop={'10px'}>
                                                                User-Library-Modify
                                                            </Typography>
                                                            <Typography align="left" sx={{ color: '#999999' }} variant="body2" >
                                                                User-Library-Modify allows Echoes to add or delete songs from a user's liked tracks. This is only needed to give users the ability to like a song directly inside of Echoes.fyi. This is only used where a "heart" icon appears.
                                                            </Typography>
                                                            <Typography align="left" sx={{ color: '#71c1e3' }} gutterBottom variant="h6" component="div" marginTop={'10px'}>
                                                                User-Modify-Playback-State
                                                            </Typography>
                                                            <Typography align="left" sx={{ color: '#999999' }} variant="body2" >
                                                                User-Modify-Playback-State allowa Echoes.fyi to change the playback state of the Spotify Player. This includes skipping tracks, changing volume, transferring playback, etc. This is necessary for full playback for a premium user.
                                                            </Typography>
                                                            <Typography align="left" sx={{ color: '#71c1e3' }} gutterBottom variant="h6" component="div" marginTop={'10px'}>
                                                                Streaming
                                                            </Typography>
                                                            <Typography align="left" sx={{ color: '#999999' }} variant="body2" >
                                                                Streaming allows echoes to stream full playback for premium users
                                                            </Typography>
                                                        </Box >
                                                    </Box>
                                                </CardContent>
                                            </Box>
                                        </Card>
                                    </Grow>
                                </Grid>
                            }



                        </Grid >
                    }
                    {page == 'callback' &&
                        <Grid item xs={12} md={10} lg={6} xl={6} sx={{
                            alignItems: 'center', display: "flex", flexDirection: "column",
                            justifyContent: "center"
                        }}>

                        </Grid>
                    }
                </div>
            )}
        </Box>
    );

}