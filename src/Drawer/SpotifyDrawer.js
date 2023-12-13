import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import Grid from '@mui/material/Grid';
import { IconButton, Slider } from '@mui/material';
import { Card, CardMedia, CardContent, Typography, } from '@mui/material';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import LaunchIcon from '@mui/icons-material/Launch';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Link } from "react-router-dom";
import Link2 from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import GetWindowDimensions from '../WindowDimensions/WindowDimensions';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Collapse from '@mui/material/Collapse';
export default function TemporaryDrawer(props) {
    const { color, albumName, albumID, albumReleaseDate, albumURL, current_track, artists, isPlayingArr, setIsPlayingArr, toPrev, track, toNext, open, closeDrawer, updateState, index, trackProgress, onScrub, submitChange, muteVolume, volume, setVolume, commitVolume, reloadLocation, trackLength } = props;

    const [expandDrawer, setExpandDrawer] = React.useState(false);
    const { width } = GetWindowDimensions();
    const navigate = useNavigate();
    React.useEffect(() => { if (width >= 900) { retractDrawerTrue() }; }, [width]);

    const expandDrawerTrue = () => {
        if (width < 900) {
            setExpandDrawer(true);
        }
    }
    const retractDrawerTrue = () => {
        setExpandDrawer(false);

    }
    const getTime = (time) => {
        time = Math.floor(time / 1000);
        //console.log(time);
        const minutes = Math.floor(time / 60);
        var seconds = time - minutes * 60;
        function str_pad_left(string, pad, length) {
            return (new Array(length + 1).join(pad) + string).slice(-length);
        }

        const finalTime = str_pad_left(minutes, '0', 2) + ':' + str_pad_left(seconds, '0', 2);
        return finalTime
    }

    return (
        <>
            <Drawer
                PaperProps={{
                    sx: {
                        backgroundColor: '#0f0f0f',
                        background: '#0f0f0f linear-gradient(to bottom right, ' + color + '22 0%, ' + '#0f0f0fFF' + ' 100%)',

                        color: "#999999",
                        maxHeight: '100vh',
                        maxWidth: '97vw',
                    }
                }}
                anchor={'bottom'}
                open={open}
                onClose={closeDrawer}
                variant="persistent"
                alignItems={'center'}
                justifyContent={'center'}

            >
                <Collapse in={expandDrawer}>

                    <Grid container
                        direction={'column'}
                        sx={{
                            m: '8vw', width: '80vw',
                        }}
                    >
                        <Grid item xs={12}  >
                            <Button sx={{ width: '100%', bgcolor: 'transparent', mb: '10px' }} onClick={retractDrawerTrue}>
                                <KeyboardArrowDownIcon sx={{ color: 'white' }} />
                            </Button>
                        </Grid>
                        <Grid item xs={12} sx={{ width: '100%', height: '100%', maxHeight: '600px', }}>
                            <CardMedia
                                component="img"
                                sx={{
                                    width: '100%', height: '100%', maxHeight: '600px', p: '0px', objectFit: "contain"
                                }}
                                image={albumURL}
                                onClick={() => {
                                    window.document.title = 'Home | ' + albumName;
                                    navigate('/Album?id=' + albumID + '&name=' + encodeURIComponent(albumName) + '&date=' + encodeURIComponent(albumReleaseDate) + '&media=' + encodeURIComponent(albumURL));
                                    updateState(true);
                                    setExpandDrawer(false);
                                }}
                            />
                        </Grid>                        <Grid item xs={12} >

                            <CardContent sx={{ ml: '0px', pl: '0px', mr: '0px', pr: '0px' }} >
                                <Typography sx={{ color: '#FFFFFF' }} variant="body2">
                                    {track?.name}
                                </Typography>
                                <Typography sx={{ color: '#999999' }} variant="body2">

                                    {track?.artists?.map((artist, i) => {
                                        return (<Link2 component={Link} to={'/Artist?id=' + artists[i]?.id} onClick={() => {
                                            window.document.title = 'Home | ' + artists[i]?.name;
                                            updateState(true);
                                            setExpandDrawer(false);

                                        }} sx={{ color: '#999999', margin: '0px', padding: '0px', ':hover': { color: 'white' } }} variant="body3" underline="hover">{(i ? ', ' : '') + artist.name}</Link2>)
                                    })}
                                </Typography>
                            </CardContent>



                        </Grid>

                        <Grid item xs={12} >
                            <Grid
                                container
                                spacing={2}

                                sx={{ ml: '5vw', mr: '5vw' }}

                            >

                                <Grid item xs={4}
                                >
                                    <IconButton sx={{ paddingBottom: '0px', marginBottom: '0px' }} onClick={toPrev}>
                                        <SkipPreviousIcon fontSize='large' sx={{ color: '#999999', '&:hover': { color: 'white' } }} />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={4}
                                >

                                    {isPlayingArr[index] ? (<IconButton sx={{ paddingBottom: '0px', marginBottom: '0px', '&:hover': { transform: 'scale(1.1)' } }} onClick={() => { setIsPlayingArr(false, isPlayingArr.length, index); }}>

                                        <PauseCircleIcon fontSize='large' sx={{ color: 'white' }} />
                                    </IconButton>) : (<IconButton sx={{ paddingBottom: '0px', marginBottom: '0px', '&:hover': { transform: 'scale(1.1)' } }} onClick={() => { setIsPlayingArr(true, isPlayingArr.length, index); }}>

                                        <PlayCircleIcon fontSize='large' sx={{ color: 'white' }} />
                                    </IconButton>)}
                                </Grid>

                                <Grid item xs={4}
                                >

                                    <IconButton sx={{ paddingBottom: '0px', marginBottom: '0px' }} onClick={toNext}>

                                        <SkipNextIcon fontSize='large' sx={{ color: '#999999', '&:hover': { color: 'white' } }} />
                                    </IconButton>
                                </Grid>

                            </Grid>
                            <Grid item xs={12} >

                                <Slider
                                    sx={{
                                        height: '4px', minWidth: '100%', color: '#71c1e3', '& .MuiSlider-thumb': { width: '0px', height: '0px' }, '&:hover': {
                                            '& .MuiSlider-track': {
                                                color: 'white',
                                            },
                                            '& .MuiSlider-thumb': {
                                                width: '12px', height: '12px', color: '#71c1e3'
                                            }
                                        }
                                    }}
                                    size="small"
                                    defaultValue={0}
                                    value={trackProgress}
                                    onChange={onScrub}
                                    onChangeCommitted={submitChange}

                                    aria-label="Small"
                                    valueLabelDisplay="auto"
                                    min={0} max={trackLength}
                                    valueLabelFormat={value => <div>{getTime(value)}</div>}
                                />
                            </Grid>

                        </Grid>
                        <Grid item xs={12}>

                            <Grid
                                container
                                spacing={2}
                                direction="row"
                                alignItems="center"
                            >
                                <Grid item xs={1} >

                                    <IconButton onClick={muteVolume}>
                                        {volume == 0 && <VolumeOffIcon sx={{ marginBottom: '0px', marginTop: '2vh', color: '#999999' }} />}
                                        {volume > 0 && volume < 25 && <VolumeMuteIcon sx={{ marginBottom: '0px', marginTop: '2vh', color: '#999999' }} />}
                                        {volume >= 25 && volume < 66 && <VolumeDownIcon sx={{ marginBottom: '0px', marginTop: '2vh', color: '#999999' }} />}
                                        {volume >= 66 && <VolumeUpIcon sx={{ marginBottom: '0px', marginTop: '2vh', color: '#999999' }} />}
                                    </IconButton>
                                </Grid>
                                <Grid item xs={9}>
                                    <Slider
                                        sx={{
                                            marginBottom: '0px', minWidth: '100%', height: '4px', marginTop: '2vh', color: '#71c1e3', '& .MuiSlider-thumb': { width: '0px', height: '0px' }, '&:hover': {
                                                '& .MuiSlider-track': {
                                                    color: 'white',
                                                },
                                                '& .MuiSlider-thumb': {
                                                    width: '12px', height: '12px', color: '#71c1e3'
                                                }
                                            }
                                        }}
                                        size="small"
                                        defaultValue={80}
                                        value={volume}
                                        onChange={setVolume}
                                        onChangeCommitted={commitVolume}
                                        aria-label="Small"
                                        valueLabelDisplay="auto"
                                        min={0} max={100}
                                    />
                                </Grid>
                                <Grid item xs={1} >

                                    <IconButton component={Link} to={'./Recommendations?id=' + track?.id} onClick={() => { window.document.title = 'Recommendations | ' + track?.name; }}>
                                        <ThumbUpIcon fontSize='small' sx={{ marginBottom: '0px', marginTop: '2vh', color: '#999999', '&:hover': { color: 'white' } }} />
                                    </IconButton>
                                </Grid>

                                <Grid item xs={1} >

                                    <LaunchIcon fontSize='small' sx={{ marginBottom: '0px', marginTop: '2vh', color: '#999999', '&:hover': { color: 'white' } }} />
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </Collapse>
                <Collapse in={!expandDrawer}>
                    <Slider
                        sx={{
                            display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none', xl: 'none' }, margin: '0px', padding: '0px', height: '4px', color: '#71c1e3', '& .MuiSlider-thumb': { width: '0px', height: '0px', m: '0px', p: '0px' }, position: 'absolute', left: '0px', top: '-20px'
                        }}
                        size="small"
                        defaultValue={0}
                        value={trackProgress}
                        onChangeCommitted={submitChange}
                        aria-label="Small"
                        valueLabelDisplay="auto"
                        min={0} max={trackLength}
                    />
                    <Grid container
                        spacing={0} sx={{ mb: { xs: '0px', sm: '0px', md: '0px' }, }}>
                        <Grid item xs={8} sm={8} md={2} lg={2} xl={2} onClick={expandDrawerTrue} >
                            <Card
                                elevation={0} sx={{
                                    display: 'flex', bgcolor: 'transparent', width: '100%', margin: '0px', marginLeft: '15px',

                                }}>
                                <CardMedia
                                    component="img"
                                    onClick={() => {
                                        window.document.title = 'Home | ' + albumName;
                                        navigate('/Album?id=' + albumID + '&name=' + encodeURIComponent(albumName) + '&date=' + encodeURIComponent(albumReleaseDate) + '&media=' + encodeURIComponent(albumURL));
                                        updateState(true);
                                        setExpandDrawer(false);
                                    }}
                                    sx={{
                                        mt: '12px', ml: '12px', display: 'block', width: '50px', height: '50px', borderRadius: '4px', padding: '0px', '&:hover': {
                                            cursor: 'pointer',
                                            width: '51px', height: '51px'
                                        },
                                    }}
                                    image={current_track?.album?.images[0]?.url}

                                />

                                <CardContent sx={{ flex: '1 0 auto', mt: '15px', ml: '15px', padding: '0px' }}>
                                    <Typography sx={{ color: '#FFFFFF' }} variant="body2">
                                        {current_track?.name}
                                    </Typography>
                                    <Typography sx={{ color: '#999999' }} variant="body2">

                                        {current_track?.artists?.map((artist, i) => {
                                            return (<Link2 component={Link} to={'/Artist?id=' + artists[i]?.id} onClick={() => {
                                                window.document.title = 'Home | ' + artists[i]?.name;
                                                updateState(true);
                                                setExpandDrawer(false);

                                            }} sx={{ color: '#999999', margin: '0px', padding: '0px' }} variant="body3" underline="hover">{(i ? ', ' : '') + artist.name}</Link2>)
                                        })}
                                    </Typography>
                                </CardContent>

                            </Card>

                        </Grid>
                        <Grid item xs={4} sm={4} md={0} lg={0} xl={0} sx={{ margin: '0px', padding: '0px', display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none', xl: 'none' } }}>

                            <Box sx={{ margin: '0px', padding: '0px', display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none', xl: 'none' } }} >

                                <IconButton sx={{ paddingBottom: '0px', marginBottom: '0px' }} onClick={toPrev}>
                                    <SkipPreviousIcon fontSize='large' sx={{ color: '#999999', '&:hover': { color: 'white' } }} />
                                </IconButton>
                                {isPlayingArr[index] ? (<IconButton sx={{ paddingBottom: '0px', marginBottom: '0px', '&:hover': { transform: 'scale(1.1)' } }} onClick={() => { setIsPlayingArr(false, isPlayingArr.length, index); }}>

                                    <PauseCircleIcon fontSize='large' sx={{ color: 'white' }} />
                                </IconButton>) : (<IconButton sx={{ paddingBottom: '0px', marginBottom: '0px', '&:hover': { transform: 'scale(1.1)' } }} onClick={() => { setIsPlayingArr(true, isPlayingArr.length, index); }}>

                                    <PlayCircleIcon fontSize='large' sx={{ color: 'white' }} />
                                </IconButton>)}

                                <IconButton sx={{ paddingBottom: '0px', marginBottom: '0px' }} onClick={toNext}>

                                    <SkipNextIcon fontSize='large' sx={{ color: '#999999', '&:hover': { color: 'white' } }} />
                                </IconButton>

                            </Box>
                        </Grid>

                        <Grid item xs={0} sm={0} md={8} lg={8} xl={8}>
                            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' } }}>

                                <Grid
                                    container
                                    spacing={0}
                                    direction="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{}}
                                >
                                    <Grid item xs={12}>

                                        <Grid
                                            spacing={0}
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="center"
                                            sx={{ height: '7vh', width: '30vw' }}
                                        >
                                            <Grid item xs={12} sx={{ margin: '0px', padding: '0px' }}>
                                                <Grid
                                                    container
                                                    spacing={0}
                                                    direction="column"
                                                    alignItems="center"
                                                    justifyContent="center"
                                                    sx={{ paddingBottom: '0px', marginBottom: '0px' }}
                                                >
                                                    <Grid item xs={12} sx={{ margin: '0px', padding: '0px' }}>

                                                        <IconButton sx={{ paddingBottom: '0px', marginBottom: '0px' }} onClick={toPrev}>
                                                            <SkipPreviousIcon fontSize='large' sx={{ color: '#999999', '&:hover': { color: 'white' } }} />
                                                        </IconButton>
                                                        {isPlayingArr[index] ? (<IconButton sx={{ paddingBottom: '0px', marginBottom: '0px', '&:hover': { transform: 'scale(1.1)' } }} onClick={() => { setIsPlayingArr(false, isPlayingArr.length, index); }}>

                                                            <PauseCircleIcon fontSize='large' sx={{ color: 'white' }} />
                                                        </IconButton>) : (<IconButton sx={{ paddingBottom: '0px', marginBottom: '0px', '&:hover': { transform: 'scale(1.1)' } }} onClick={() => { setIsPlayingArr(true, isPlayingArr.length, index); }}>

                                                            <PlayCircleIcon fontSize='large' sx={{ color: 'white' }} />
                                                        </IconButton>)}

                                                        <IconButton sx={{ paddingBottom: '0px', marginBottom: '0px' }} onClick={toNext}>

                                                            <SkipNextIcon fontSize='large' sx={{ color: '#999999', '&:hover': { color: 'white' } }} />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sx={{ margin: '0px', padding: '0px' }}>
                                                <Grid container spacing={2} alignItems="center">

                                                    <Typography>{getTime(trackProgress)} / {getTime(trackLength ? (trackLength) : (0))}</Typography>
                                                    <Slider
                                                        sx={{
                                                            marginBottom: '5px', marginTop: '0px', height: '4px', minWidth: '100%', color: '#71c1e3', '& .MuiSlider-thumb': { width: '0px', height: '0px' }, '&:hover': {
                                                                '& .MuiSlider-track': {
                                                                    color: 'white',
                                                                },
                                                                '& .MuiSlider-thumb': {
                                                                    width: '12px', height: '12px', color: '#71c1e3'
                                                                }
                                                            }
                                                        }}
                                                        size="small"
                                                        defaultValue={0}
                                                        value={trackProgress}
                                                        onChange={onScrub}
                                                        onChangeCommitted={submitChange}
                                                        aria-label="Small"
                                                        valueLabelDisplay="auto"
                                                        min={0} max={trackLength}
                                                        valueLabelFormat={value => <div>{getTime(value)}</div>}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid item xs={2}>
                            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex', xl: 'flex' } }}>

                                <Grid
                                    container
                                    spacing={2}
                                    direction="row"
                                    alignItems="center"
                                >
                                    <Grid item xs={0} sm={0} md={2} lg={2} xl={2}>

                                        <IconButton onClick={muteVolume}>
                                            {volume == 0 && <VolumeOffIcon sx={{ marginBottom: '0px', marginTop: '2vh', color: '#999999' }} />}
                                            {volume > 0 && volume < 25 && <VolumeMuteIcon sx={{ marginBottom: '0px', marginTop: '2vh', color: '#999999' }} />}
                                            {volume >= 25 && volume < 66 && <VolumeDownIcon sx={{ marginBottom: '0px', marginTop: '2vh', color: '#999999' }} />}
                                            {volume >= 66 && <VolumeUpIcon sx={{ marginBottom: '0px', marginTop: '2vh', color: '#999999' }} />}
                                        </IconButton>
                                    </Grid>
                                    <Grid item xs={9} sm={9} md={9} lg={5} xl={5}>
                                        <Slider
                                            sx={{
                                                marginBottom: '0px', minWidth: '100%', height: '4px', marginTop: '2vh', color: '#71c1e3', '& .MuiSlider-thumb': { width: '0px', height: '0px' }, '&:hover': {
                                                    '& .MuiSlider-track': {
                                                        color: 'white',
                                                    },
                                                    '& .MuiSlider-thumb': {
                                                        width: '12px', height: '12px', color: '#71c1e3'
                                                    }
                                                }
                                            }}
                                            size="small"
                                            defaultValue={80}
                                            value={volume}
                                            onChange={setVolume}
                                            onChangeCommitted={commitVolume}
                                            aria-label="Small"
                                            valueLabelDisplay="auto"
                                            min={0} max={100}
                                        />
                                    </Grid>
                                    <Grid item xs={0} sm={0} md={0} lg={1} xl={1}>
                                        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex' } }}>

                                            <IconButton component={Link} to={'./Recommendations?id=' + track?.id} onClick={() => { window.document.title = 'Recommendations | ' + track?.name; }}>
                                                <ThumbUpIcon fontSize='small' sx={{ marginBottom: '0px', marginTop: '2vh', color: '#999999', '&:hover': { color: 'white' } }} />
                                            </IconButton>
                                        </Box>
                                    </Grid>

                                    <Grid item xs={0} sm={0} md={0} lg={1} xl={1}>
                                        <Box sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'flex', xl: 'flex' } }}>

                                            <IconButton component={Link} to={track?.external_urls?.spotify} onClick={reloadLocation}>
                                                <LaunchIcon fontSize='small' sx={{ marginBottom: '0px', marginTop: '2vh', color: '#999999', '&:hover': { color: 'white' } }} />
                                            </IconButton>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>

                        </Grid>
                    </Grid>
                </Collapse>
            </Drawer>
        </>
    );
}