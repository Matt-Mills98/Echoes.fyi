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
                            Echoes.fyi is a web application built with the purpose of making Spotify information/data more available to the public.
                            Echoes.fyi links to your Spotify account to display relevant track, artist, and album information in a way that is easily comprehendable.
                            This information is then used for various purposes, including song recommendations and search filtering. Feel free to reach out via the contact section for any feature requests or bug reports.
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography align="left" sx={{ color: '#71c1e3' }} gutterBottom variant="h5" component="div">
                            Description of Pages
                        </Typography>
                        <Box marginLeft={'20px'} marginTop={'20px'}>
                            <Typography align="left" sx={{ color: '#c4c4c4' }} gutterBottom variant="h6" component="div">
                                Home
                            </Typography>
                            <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                Displays general playlists, including Spotify Featured, Top Global, Top Local, and more.
                            </Typography>
                        </Box>
                        <Box marginLeft={'20px'} marginTop={'20px'}>
                            <Typography align="left" sx={{ color: '#c4c4c4' }} gutterBottom variant="h6" component="div">
                                Recommendations
                            </Typography>
                            <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                Uses Spotify's algorithms to recommend songs based on a number of factors. These recommendations can be filtered via popularity, genres, tempo, key, etc. to allow the user more control over their recommendations.
                            </Typography>
                        </Box>
                        <Box marginLeft={'20px'} marginTop={'20px'}>
                            <Typography align="left" sx={{ color: '#c4c4c4' }} gutterBottom variant="h6" component="div">
                                Search
                            </Typography>
                            <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                Utilizes Spotify's search functionality to allow users to view and preview results based on several filters. Users can select the results they would like to see as well as include tags to narrow results.
                            </Typography>
                        </Box>
                        <Box marginLeft={'20px'} marginTop={'20px'}>
                            <Typography align="left" sx={{ color: '#c4c4c4' }} gutterBottom variant="h6" component="div">
                                Profile
                            </Typography>
                            <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                Profile returns data depending on the logged in user. A user can see their liked songs, created and followed playlists, and followed artists. All information pertaining to these items can be displayed by clicking on a selected row.
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
                            <Typography sx={{textTransform:'none', color: "#c4c4c4"}}>
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