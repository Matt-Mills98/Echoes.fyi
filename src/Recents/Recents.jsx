import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Box,  CardActionArea, Grid } from '@mui/material';
import RecentTracks from './RecentTracks';

import { Link } from "react-router-dom";
export default function MultiActionAreaCard(props) {
    const { setRows, rows, initPlayingArr, playingArr, setIsPlayingArr, setIndex, setType, setMedia, setTrackID, trackID, selectedPlaylist, selectedPlaylistAlbumMedia, selectedPlaylistDateAdded, selectedPlaylistName, setSelectedPlaylist, setSelectedPlaylistAlbumMedia, setSelectedPlaylistDateAdded, setSelectedPlaylistName } = props

    const accessToken = localStorage.getItem('accessToken');
   
    

    React.useEffect(() => { window.document.title='Recently Played' }, [])

  

    const updateSelectedPlaylist = (playlist) => {
        setSelectedPlaylist(playlist);

    }
    const updateSelectedPlaylistName = (playlistName) => {
        setSelectedPlaylistName(playlistName);

    }
    const updateDateAdded = (date) => {
        setSelectedPlaylistDateAdded(date);

    }
  
    const updateAlbumMedia = (media) => {
        setSelectedPlaylistAlbumMedia(media);

    }
   
    return (
        <Box>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card sx={{ bgcolor: '#16191a' }} >
                                <CardActionArea component={Link} to={'/About'}>
                                    <Box overflow='hidden'>
                                        <CardMedia
                                            sx={{ filter: '' }}
                                            component="img"
                                            height="140"
                                            image="./RecommendedBackground2.png"
                                            alt="green iguana"
                                        />
                                    </Box>

                                </CardActionArea>

                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                             <RecentTracks aT={accessToken}  setSelectedPlaylist={updateSelectedPlaylist} setSelectedPlaylistName={updateSelectedPlaylistName} setDateAdded={updateDateAdded} setAlbumMedia={updateAlbumMedia}
                                setRows={setRows} rows={rows} initPlayingArr={initPlayingArr} playingArr={playingArr} setIsPlayingArr={setIsPlayingArr} setIndex={setIndex} setType={setType} setTrackID={setTrackID} trackID={trackID}></RecentTracks>
                            
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Box >
    );
}