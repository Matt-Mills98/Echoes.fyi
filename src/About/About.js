import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from "@mui/material/Grid";

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
                            Description of Functions
                        </Typography>
                        <Box marginLeft={'20px'} marginTop={'20px'}>
                            <Typography align="left" sx={{ color: '#c4c4c4' }} gutterBottom variant="h6" component="div">
                                Home
                            </Typography>
                            <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                Echoes.fyi is a web application built with the purpose of making Spotify information/data more available to the public.
                                Echoes.fyi links to your Spotify account to display relevant track, artist, and album information that may not be easily accessible in a way that is easily comprehendable.
                                This information is then used for various purposes, including song recommendations and search filtering. Feel free to reach out reach out via the contact section for any feature requests or bug reports.
                            </Typography>
                        </Box>
                        <Box marginLeft={'20px'} marginTop={'20px'}>
                            <Typography align="left" sx={{ color: '#c4c4c4' }} gutterBottom variant="h6" component="div">
                                Recommendations
                            </Typography>
                            <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                Echoes.fyi is a web application built with the purpose of making Spotify information/data more available to the public.
                                Echoes.fyi links to your Spotify account to display relevant track, artist, and album information that may not be easily accessible in a way that is easily comprehendable.
                                This information is then used for various purposes, including song recommendations and search filtering. Feel free to reach out reach out via the contact section for any feature requests or bug reports.
                            </Typography>
                        </Box>
                        <Box marginLeft={'20px'} marginTop={'20px'}>
                            <Typography align="left" sx={{ color: '#c4c4c4' }} gutterBottom variant="h6" component="div">
                                Search
                            </Typography>
                            <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                Echoes.fyi is a web application built with the purpose of making Spotify information/data more available to the public.
                                Echoes.fyi links to your Spotify account to display relevant track, artist, and album information that may not be easily accessible in a way that is easily comprehendable.
                                This information is then used for various purposes, including song recommendations and search filtering. Feel free to reach out reach out via the contact section for any feature requests or bug reports.
                            </Typography>
                        </Box>
                        <Box marginLeft={'20px'} marginTop={'20px'}>
                            <Typography align="left" sx={{ color: '#c4c4c4' }} gutterBottom variant="h6" component="div">
                                Profile
                            </Typography>
                            <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                Echoes.fyi is a web application built with the purpose of making Spotify information/data more available to the public.
                                Echoes.fyi links to your Spotify account to display relevant track, artist, and album information that may not be easily accessible in a way that is easily comprehendable.
                                This information is then used for various purposes, including song recommendations and search filtering. Feel free to reach out reach out via the contact section for any feature requests or bug reports.
                            </Typography>
                        </Box>
                    </CardContent>
                    <CardContent>
                        <Typography align="left" sx={{ color: '#71c1e3' }} gutterBottom variant="h5" component="div">
                            Contact
                        </Typography>
                        <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                            Email:
                        </Typography>
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
                                        --11/15/23--
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
                                        Forums
                                    </Typography>
                                    <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                        This functionality is entirely dependant on user amount. In the case that Echoes.fyi gains active users, development towards forums for song recommendations will likely commence.
                                        The ability for AI to recommend songs can only go so far. Implementing forums would likely improve overall recommendations, but would be difficult to implement/filter.
                                    </Typography>
                                </Box>
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
                                    <Typography align="left" sx={{ color: '#999999' }} variant="body1" >
                                        
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