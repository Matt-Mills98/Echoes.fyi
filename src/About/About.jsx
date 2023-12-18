import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
export default function SignIn() {

    return (
        <Grid container
            spacing={2}
        >
            <Grid item xs={12} md={8} lg={8} xl={8}>
                <Card sx={{ bgcolor: '#16191a' }}>
                    <Box overflow='hidden'>
                        <CardMedia
                            sx={{ filter: '' }}
                            component="img"
                            height="140"
                            image="./SignInBackground.png"
                            alt="green iguana"
                        />
                    </Box>
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
                                {'The ability to easily see audio analyses and track features based on a selected track. Like use case 2, this can be done by selecting the "more" button on any track table, . Once selected, a dialog window will pop-up displaying information regarding the track. '}
                            </Typography>
                        </Box>
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
                                contact@echoesfyi.com
                            </Typography>
                        </Button>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4} lg={4} xl={4}>
                <Grid container spacing={2}
                >
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <Card sx={{ bgcolor: '#16191a' }}>

                            <CardContent>
                                <Typography align="left" sx={{ color: '#71c1e3' }} gutterBottom variant="h5" component="div">
                                    News
                                </Typography>
                                <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                    Current Version: 1.0.0
                                </Typography>
                                <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                    No news at this time.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} xl={12}>

                        <Card sx={{ bgcolor: '#16191a' }}>
                            <CardContent>
                                <Typography align="left" sx={{ color: '#71c1e3' }} gutterBottom variant="h5" component="div">
                                    Past Releases
                                </Typography>
                                <Box marginLeft={'20px'} marginTop={'20px'}>
                                    <Typography align="left" sx={{ color: '#c4c4c4' }} gutterBottom variant="h6" component="div">
                                        v1.0.0 Notes:
                                    </Typography>
                                    <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                        Echoes.fyi has officially released!
                                    </Typography>
                                    <Typography align="left" sx={{ color: '#999999' }} variant="body3" >
                                        --TBD--
                                    </Typography>
                                </Box>

                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} xl={12}>
                        <Card sx={{ bgcolor: '#16191a' }}>
                            <CardContent>
                                <Typography align="left" sx={{ color: '#71c1e3' }} gutterBottom variant="h5" component="div">
                                    Planned Updates
                                </Typography>

                                <Box marginLeft={'20px'} marginTop={'20px'}>
                                    <Typography align="left" sx={{ color: '#c4c4c4' }} gutterBottom variant="h6" component="div">
                                        Bug reports/User requested functionality
                                    </Typography>
                                    <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                        Currently, the only way to report bugs or request features is via a contact email. This process is likely to need improvement in the future.
                                    </Typography>
                                </Box>
                                <Box marginLeft={'20px'} marginTop={'20px'}>
                                    <Typography align="left" sx={{ color: '#c4c4c4' }} gutterBottom variant="h6" component="div">
                                        General bug fixes
                                    </Typography>

                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>

        </Grid >
    );

}