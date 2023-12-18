import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from "@mui/material/Grid";

export default function SignIn() {

    return (
        <Grid container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="center">
            <Grid item xs={12} md={10} lg={8} xl={5}>
                <Card sx={{ bgcolor: '#16191a' }}>
                    <Box overflow='hidden'>
                        <CardMedia
                            sx={{ filter: 'blur(4px)' }}
                            component="img"
                            height="140"
                            image="./SignInBackground.png"
                            alt="green iguana"
                        />
                    </Box>
                    
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
                   
                </Card>
            </Grid>
        </Grid >
    );

}