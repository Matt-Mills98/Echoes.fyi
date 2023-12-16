import React, { useState} from 'react';

import { extractColors } from 'extract-colors'

import { useNavigate } from 'react-router-dom';
import SpotifyDrawer from '../Drawer/SpotifyDrawer'
import refreshTokenFunc from '../SignIn/RefreshToken';
import checkAccessToken from '../SignIn/CheckAccessToken'

function WebPlayback(props) {

 //TODO: Allow drawer to set album media 
    const [open, setOpen] = useState(false);
    const { transferPlayback,  deviceID,  is_active, current_track, player, updateState, selectedPlaylist, selectedPlaylistAlbumMedia, selectedPlaylistDateAdded, selectedPlaylistName } = props
    const { aT, rows, isPlayingArr, setIsPlayingArr, index,  type, mediaFromAlbum, setTrackID, trackID, toNext, toPrev, setIndex, volume, setVolume, setVolumeVal } = props;
    const [color, setColor] = React.useState('');
    const intervalRef = React.useRef();

    const [trackProgress, setTrackProgress] = React.useState(0);
    const [prevVolume, setPrevVolume] = React.useState(50);
    let album = [];
    let songName = '';
    let artists = '';
    let track = [];
    let albumDate = '';
    let albumMedia = '';
    let albumID = '';
    let albumName = '';
    if (type == 'playlists') {
        album = rows?.items[index]?.track?.album;
        albumDate = album?.release_date;
        albumMedia = album?.images[0]?.url;
        albumID = album?.id;
        albumName = album?.name;
        songName = rows?.items[index]?.track?.name;
        artists = rows?.items[index]?.track?.artists;
        track = rows?.items[index]?.track;
    }
    if (type == 'album') {
        albumDate = selectedPlaylistDateAdded;
        albumMedia = selectedPlaylistAlbumMedia;
        albumID = selectedPlaylist;
        albumName = selectedPlaylistName;
        songName = rows?.items[index]?.name;
        artists = rows?.items[index]?.artists;
        track = rows?.items[index];

    }
    if (type == 'artist') {
        album = rows?.tracks[index]?.album;

        albumDate = album?.release_date;
        albumMedia = album?.images[0]?.url;
        albumID = album?.id;
        albumName = album?.name;
        songName = rows?.tracks[index]?.name;
        artists = rows?.tracks[index]?.artists;
        track = rows?.tracks[index];

    }
    if (type == 'recommend') {
        album = rows?.tracks[index]?.album;
        albumDate = album?.release_date;
        albumMedia = album?.images[0]?.url;
        albumID = album?.id;
        albumName = album?.name;
        songName = rows?.tracks[index]?.name;
        artists = rows?.tracks[index]?.artists;
        track = rows?.tracks[index];

    }
    if (type == 'search') {
        album = rows?.items[index]?.album;
        albumDate = album?.release_date;
        albumMedia = album?.images[0]?.url;
        albumID = album?.id;
        albumName = album?.name;
        songName = rows?.items[index]?.name;
        artists = rows?.items[index]?.artists;
        track = rows?.items[index];

    }

    React.useEffect(() => {
        console.log(ready);
        if (!checkAccessToken()) {
            console.log('trackID ' +ready);

            console.log(is_active);
            if (type != '') {
                if (!is_active) {
                  
                }
                else {
                    if (track.id != current_track.id) {
                        openDrawer();
                        startPlay();
                    }
                }
            }
        }
        else {
            refreshTokenFunc();
        }

    }, [trackID]);
    React.useEffect(() => {
        getDomColor()


    }, [trackID]);

    React.useEffect(() => {
        if (!checkAccessToken()) {

        let newIndex = -1;
        if (type == 'playlists') {

            rows?.items.map((item, index) => {
                if (current_track?.id == item?.track?.id) {
                    newIndex = index;
                }
            })
            if (newIndex != -1) {
                setTrackID(current_track?.id);
                setIndex(newIndex);
                setIsPlayingArr(true, isPlayingArr.length, newIndex);
            }
        }
        if (type == 'artist' || type == 'recommend') {

            rows?.tracks.map((item, index) => {
                if (current_track?.id == item?.id) {
                    newIndex = index;
                }
            })
            if (newIndex != -1) {
                setTrackID(current_track?.id);
                setIndex(newIndex);
                setIsPlayingArr(true, isPlayingArr.length, newIndex);
            }
        }
        if (type == 'album') {

            rows?.items.map((item, index) => {
                if (current_track?.id == item?.id) {
                    newIndex = index;
                }
            })
            if (newIndex != -1) {
                setTrackID(current_track?.id);
                setIndex(newIndex);
                setIsPlayingArr(true, isPlayingArr.length, newIndex);
            }
        }

        if (type == 'search') {
            rows?.items.map((item, index) => {
                if (current_track?.id == item?.id) {
                    newIndex = index;
                }
            })
            if (newIndex != -1) {
                setTrackID(current_track?.id);
                setIndex(newIndex);
                setIsPlayingArr(true, isPlayingArr.length, newIndex);
            }
        }
    }
    else{
        refreshTokenFunc();
    }
    }, [current_track?.id]);
    React.useEffect(() => {
        if (!checkAccessToken()) {

        if (type == 'playlists') {
            if (!is_active && current_track.id == rows?.items[index]?.track.id) {
                if (index != -1 && isPlayingArr[index]) {
                    transferPlayback();
                    //getDomColor();
                    openDrawer();
                    startPlay();
                }
                else {
                    pausePlay();
                }
            }
            else {
                if (index != -1 && isPlayingArr[index]) {
                    if (trackProgress == 0) {
                        openDrawer();
                        startPlay();
                    }
                    else {
                        resumePlay();
                    }
                }
                else {
                    pausePlay();
                }
            }
        }
        if (type == 'artist' || type == 'recommend') {
            if (!is_active && current_track.id == rows?.tracks[index]?.id) {
                if (index != -1 && isPlayingArr[index]) {
                    transferPlayback();
                    //getDomColor();
                    openDrawer();
                    startPlay();
                }
                else {
                    pausePlay();
                }
            }
            else {
                if (index != -1 && isPlayingArr[index]) {
                    if (trackProgress == 0) {
                        openDrawer();
                        startPlay();
                    }
                    else {
                        resumePlay();
                    }
                }
                else {
                    pausePlay();
                }
            }
        }
        if (type == 'album') {
            if (!is_active && current_track.id == rows?.items[index]?.id) {
                if (index != -1 && isPlayingArr[index]) {
                    transferPlayback();
                    //getDomColor();
                    openDrawer();
                    startPlay();
                }
                else {
                    pausePlay();
                }
            }
            else {
                if (index != -1 && isPlayingArr[index]) {
                    if (trackProgress == 0) {
                        openDrawer();
                        startPlay();
                    }
                    else {
                        resumePlay();
                    }
                }
                else {
                    pausePlay();
                }
            }
        }

        if (type == 'search') {
            if (!is_active && current_track.id == rows?.items[index]?.id) {
                if (index != -1 && isPlayingArr[index]) {
                    transferPlayback();
                    //getDomColor();
                    openDrawer();
                    startPlay();
                }
                else {
                    pausePlay();
                }
            }
            else {
                if (index != -1 && isPlayingArr[index]) {
                    if (trackProgress == 0) {
                        openDrawer();
                        startPlay();
                    }
                    else {
                        resumePlay();
                    }
                }
                else {
                    pausePlay();
                }
            }
        }
    }
    else{
        refreshTokenFunc();
    }


    }, [isPlayingArr[index]]);
    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            player.getCurrentState().then(state => {
                if (!state) {
                    console.error('User is not playing music through the Web Playback SDK');
                    return;
                }

                var position = state.position;
                setTrackProgress(position);


            });

        }, [1000]);
    };
    const startPlay = () => {
        if (!checkAccessToken()) {

        if (deviceID != '') {
            if (type == 'playlists') {

                fetch("https://api.spotify.com/v1/me/player/play?device_id=" + deviceID, {
                    method: "PUT", headers: { Authorization: `Bearer ${aT}`, 'Content-Type': 'application/json' }, body: JSON.stringify({
                        "uris": rows?.items?.map((item) => {
                            if (item?.track?.id != '') {
                                return item?.track?.uri;
                            }
                        }), "offset": { "position": index }
                    })
                })
                    .then(async (result) => {
                        if (result.ok) {
                            player.resume().then(() => {
                              });
                            startTimer();
                        }
                        else {

                        }
                    })
            }
            if (type == 'artist' || type == 'recommend') {

                fetch("https://api.spotify.com/v1/me/player/play?device_id=" + deviceID, {
                    method: "PUT", headers: { Authorization: `Bearer ${aT}`, 'Content-Type': 'application/json' }, body: JSON.stringify({
                        "uris": rows?.tracks?.map((item) => {
                            if (item?.id != '') {
                                return item?.uri;
                            }
                        }), "offset": { "position": index }
                    })
                })
                    .then(async (result) => {
                        if (result.ok) {
                            startTimer();
                        }
                        else {

                        }
                    })
            }
            if (type == 'album') {

                fetch("https://api.spotify.com/v1/me/player/play?device_id=" + deviceID, {
                    method: "PUT", headers: { Authorization: `Bearer ${aT}`, 'Content-Type': 'application/json' }, body: JSON.stringify({
                        "uris": rows?.items?.map((item) => {
                            if (item?.id != '') {
                                return item?.uri;
                            }
                        }), "offset": { "position": index }
                    })
                })
                    .then(async (result) => {
                        if (result.ok) {
                            startTimer();
                        }
                        else {

                        }
                    })
            }
            if (type == 'search') {

                fetch("https://api.spotify.com/v1/me/player/play?device_id=" + deviceID, {
                    method: "PUT", headers: { Authorization: `Bearer ${aT}`, 'Content-Type': 'application/json' }, body: JSON.stringify({
                        "uris": rows?.items?.map((item) => {
                            if (item?.id != '') {
                                return item?.uri;
                            }
                        }), "offset": { "position": index }
                    })
                })
                    .then(async (result) => {
                        if (result.ok) {
                            startTimer();
                        }
                        else {

                        }
                    })
            }

        }
    }
    else{
        refreshTokenFunc();
    }

    }
    const pausePlay = () => {
        if (!checkAccessToken()) {

        player.pause();
        }
        else{
            refreshTokenFunc()
        }
    }
    const resumePlay = () => {
        if (!checkAccessToken()) {

        player.resume();
        }
        else{
            refreshTokenFunc();
        }
    }

    const openDrawer = () => {
        setOpen(true);
    }
    const closeDrawer = () => {
        setOpen(false);
    }
    const getDomColor = () => {
        if (type == 'playlists') {
            try {
                //let color = '';
                const options = {

                    crossOrigin: 'anonymous'
                }
                return extractColors(rows?.items[index]?.track?.album?.images[1]?.url, options)
                    .then((result) => { setColor(result[0].hex); })
                    .catch(console.error);
                // return color;
            }
            catch {

            }
        }
        if (type == 'artist' || type == 'recommend') {
            try {
                //let color = '';
                const options = {

                    crossOrigin: 'anonymous'
                }
                return extractColors(rows?.tracks[index]?.album?.images[1]?.url, options)
                    .then((result) => { setColor(result[0].hex); })
                    .catch(console.error);
                // return color;
            }
            catch {

            }
        }
        else if (type == 'album') {
            try {
                //let color = '';
                const options = {

                    crossOrigin: 'anonymous'
                }
                return extractColors(mediaFromAlbum, options)
                    .then((result) => { setColor(result[0].hex); })
                    .catch(console.error);
                // return color;
            }
            catch {

            }
        }

        else if (type == 'search') {
            try {
                //let color = '';
                const options = {

                    crossOrigin: 'anonymous'
                }
                return extractColors(rows?.items[index]?.album.images[1].url, options)
                    .then((result) => { setColor(result[0].hex); })
                    .catch(console.error);
                // return color;
            }
            catch {

            }
        }
    }
    const submitChange = (event) => {
        const value = trackProgress;
        // Clear any timers already running
        player.seek(value);
        setTrackProgress(value);
        startTimer();

    }
    const muteVolume = () => {
        if (volume != 0) {
            setPrevVolume(volume);
            setVolumeVal(0);
            player.setVolume(0);
        }
        else {
            setVolumeVal(prevVolume);
            player.setVolume(prevVolume / 100);

        }
    }
    const onScrub = (event) => {
        clearInterval(intervalRef.current);

        const value = parseFloat(event.target.value);
        // Clear any timers already running
        //clearInterval(intervalRef.current);
        setTrackProgress(value);
    };
    const commitVolume = () => {
        player.setVolume(volume / 100);
    }
    const reloadLocation = () => {
        window.location.reload()
    }
    return (

        <>
            <SpotifyDrawer color={color} albumName={albumName} albumID={albumID} albumReleaseDate={albumDate} albumURL={albumMedia} current_track={current_track} artists={artists} isPlayingArr={isPlayingArr} setIsPlayingArr={setIsPlayingArr} toPrev={toPrev} toNext={toNext} open={open} closeDrawer={closeDrawer} updateState={updateState} index={index} trackProgress={trackProgress} track={track} onScrub={onScrub} submitChange={submitChange} muteVolume={muteVolume} volume={volume} setVolume={setVolume} commitVolume={commitVolume} reloadLocation={reloadLocation} trackLength={track?.duration_ms} />

        </>
    );


}

export default WebPlayback;
