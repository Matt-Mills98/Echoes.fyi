import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import * as React from 'react';
export default function Settings(props) {
    let {aT}= props
    const playBack = localStorage.getItem('playback');

    React.useEffect(() => { updatePlayback(playBack) }, [])

    const [statePlayback, setStatePlayback] = React.useState(false);

    const updatePlayback = (playback) => {
        var isTrueSet = playback;
        if (playback === 'true' || playback === 'false') {
            isTrueSet = (playback === 'true');
        }
        setStatePlayback(isTrueSet);
    }

    const updatePlayback2 = (event) => {
        fetch("https://api.spotify.com/v1/me", {
            method: "GET", headers: { Authorization: `Bearer ${aT}` }
        })
            .then(async (result) => {
                if (result.ok) {
                    const json = await result.json();
                    if(json?.product == 'premium'){
                        setStatePlayback(!event.target.checked);
                        console.log(event.target.checked)
                        if (!event.target.checked) {
                            localStorage.setItem('playback', 'true');
                        }
                        else {
                            localStorage.setItem('playback', 'false')
                        }
                    }
                    else{
                        setStatePlayback(false);
                        localStorage.setItem('playback', 'false')
                    }
                }
                else {
                    
                }
            });
        
    };
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
                            sx={{}}
                            component="img"
                            height="140"
                            image="./RecommendedBackgroundBlank2.png"
                            alt="green iguana"
                        />
                    </Box>
                    <CardContent>
                        <Typography align="left" sx={{ color: '#71c1e3' }} gutterBottom variant="h5" component="div">
                            Settings
                        </Typography>
                        <Box marginLeft={'20px'} marginTop={'20px'}>
                            <Typography align="left" sx={{ color: '#c4c4c4' }} gutterBottom variant="h6" component="div">
                                Playback Settings
                            </Typography>
                            <FormGroup>
                                <FormControlLabel sx={{ color: '#999999' }} control={<Switch defaultChecked checked={statePlayback} onChange={updatePlayback2} style={{ color: "#71c1e3" }} />} label="Full Playback (Requires Spotify Premium Subscription)" />
                            </FormGroup>
                        </Box>
                    </CardContent>

                </Card>
            </Grid>
        </Grid >
    );

}