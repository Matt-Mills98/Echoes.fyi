import React from "react";
import Drawer from "../Drawer/Drawer";
import { extractColors } from 'extract-colors'


const AudioPlayer = ({ rows, isPlayingArr,updateState, setIsPlayingArr, index, error, type, trackID, toNext, toPrev, selectedPlaylist, selectedPlaylistAlbumMedia, selectedPlaylistDateAdded, selectedPlaylistName, setSelectedPlaylist, setSelectedPlaylistAlbumMedia, setSelectedPlaylistDateAdded, setSelectedPlaylistName }) => {
    const audioRef = React.useRef(null);
    const intervalRef = React.useRef();
    let album = [];
    let albumMedia = '';
    let songName = '';
    let artists = [];
    let track = [];
    let albumDate = '';
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
    const [open, setOpen] = React.useState(false);
    const [color, setColor] = React.useState('');
    const [volume, setVolume] = React.useState(50);
    const [prevVolume, setPrevVolume] = React.useState(50);

    const [drawerPlay, setDrawerPlay] = React.useState(false);
    const [trackProgress, setTrackProgress] = React.useState(0);
    
    const getDrawerPlay = (toggle) => {
        setDrawerPlay(toggle);
    }
    const closeDrawer = () => {
        //setOpen(false)
    };
    const openDrawer = () => {
        setOpen(true)
    };
    const updateVolume = (event) => {

        setVolume(parseFloat(event.target.value));


    }
    const muteVolume = () => {
        if (volume != 0) {
            setPrevVolume(volume);
            setVolume(0);
        }
        else{
            setVolume(prevVolume)
        }
    }
    React.useEffect(() => {
        if (type == 'playlists') {
            if (index != -1 && isPlayingArr[index]) {
                //getDomColor();
                openDrawer();
                try {
                    audioRef?.current?.pause();
                }
                catch { }
                if (rows.items[index]?.track.preview_url != null) {
                    audioRef.current = new Audio(rows.items[index]?.track.preview_url);
                    audioRef.current.volume = volume / 100
                    audioRef.current.play();
                    startTimer();
                    audioRef.current.addEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));
                    return () => {
                        audioRef.current.removeEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));
                    };
                }
                else {
                    audioRef.current = new Audio('');

                    error();
                    setIsPlayingArr(false, isPlayingArr.length, index);
                    setDrawerPlay(false);
                }

            } else {
                closeDrawer();
                audioRef?.current?.pause();
                audioRef?.current?.removeEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));
            }
        }
        else if (type == 'album') {
            if (isPlayingArr[index]) {
                openDrawer();

                try {
                    audioRef.current.pause();
                }
                catch { }
                if (rows.items[index]?.preview_url != null) {
                    audioRef.current = new Audio(rows.items[index]?.preview_url);
                    audioRef.current.volume = volume / 100
                    audioRef.current.play();
                    startTimer();

                    audioRef.current.addEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));
                    return () => {
                        audioRef.current.removeEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));
                    };
                }
                else {
                    audioRef.current = new Audio('');

                    error();
                    setIsPlayingArr(false, isPlayingArr.length, index);
                    setDrawerPlay(false);

                }

            } else {
                closeDrawer();

                audioRef.current.pause();
                audioRef.current.removeEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));

            }
        }
        else if (type == 'artist') {
            if (isPlayingArr[index]) {
                openDrawer();
                try {
                    audioRef.current.pause();
                }
                catch { }
                if (rows.tracks[index]?.preview_url != null) {
                    audioRef.current = new Audio(rows?.tracks[index]?.preview_url);
                    audioRef.current.volume = volume / 100
                    audioRef.current.play();
                    startTimer();

                    audioRef.current.addEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));
                    return () => {
                        audioRef.current.removeEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));
                    };
                }
                else {
                    audioRef.current = new Audio('');

                    error();
                    setIsPlayingArr(false, isPlayingArr.length, index);
                    setDrawerPlay(false);

                }

            } else {
                closeDrawer();

                audioRef.current.pause();
                audioRef.current.removeEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));

            }
        }
        else if (type == 'recommend') {
            if (isPlayingArr[index]) {
                openDrawer();

                try {
                    audioRef.current.pause();
                }
                catch { }
                if (rows.tracks[index]?.preview_url != null) {
                    audioRef.current = new Audio(rows.tracks[index]?.preview_url);
                    audioRef.current.volume = volume / 100
                    audioRef.current.play();
                    startTimer();

                    audioRef.current.addEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));
                    return () => {
                        audioRef.current.removeEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));
                    };
                }
                else {
                    audioRef.current = new Audio('');

                    error();
                    setIsPlayingArr(false, isPlayingArr.length, index);
                    setDrawerPlay(false);

                }

            } else {
                closeDrawer();

                audioRef.current.pause();
                audioRef.current.removeEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));

            }
        }
        else if (type == 'search') {
            if (isPlayingArr[index]) {
                openDrawer();

                try {
                    audioRef.current.pause();
                }
                catch { }
                if (rows.items[index]?.preview_url != null) {
                    audioRef.current = new Audio(rows.items[index]?.preview_url);
                    audioRef.current.volume = volume / 100
                    audioRef.current.play();
                    startTimer();

                    audioRef.current.addEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));
                    return () => {
                        audioRef.current.removeEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));
                    };
                }
                else {
                    audioRef.current = new Audio('');
                    error();
                    setIsPlayingArr(false, isPlayingArr.length, index);
                    setDrawerPlay(false);

                }

            } else {
                closeDrawer();
                audioRef.current.pause();
                audioRef.current.removeEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));

            }
        }

    }, [trackID]);
    React.useEffect(() => {
        if (type == 'playlists') {

            if (index != -1 && isPlayingArr[index]) {
                openDrawer();
                if (rows.items[index]?.track.preview_url != null) {
                    try {
                        audioRef.current.volume = volume / 100
                        audioRef.current.play();
                        startTimer();
                        audioRef.current.addEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));
                        return () => {
                            audioRef.current.removeEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));
                        };
                    } catch { }
                }
                else {
                    audioRef.current = new Audio('');

                    error();
                    setIsPlayingArr(false, isPlayingArr.length, index);

                }
            }
            else {
                closeDrawer();
                audioRef?.current?.pause();
                setDrawerPlay(false);
                audioRef?.current?.removeEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));

            }

        }
        else if (type == 'album') {
            if (isPlayingArr[index]) {
                openDrawer();

                if (rows.items[index]?.preview_url != null) {
                    try {
                        audioRef.current.volume = volume / 100
                        audioRef.current.play();
                        startTimer();

                        audioRef.current.addEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));
                        return () => {

                            audioRef.current.removeEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));
                        };
                    } catch { }
                }
                else {
                    audioRef.current = new Audio('');

                    error();
                    setIsPlayingArr(false, isPlayingArr.length, index)
                }

            } else {
                closeDrawer();

                audioRef.current.pause();
                audioRef.current.removeEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));

            }
        }
        else if (type == 'artist') {
            if (isPlayingArr[index]) {
                openDrawer();
                if (rows?.tracks[index]?.preview_url != null) {
                    try {
                        audioRef.current.volume = volume / 100
                        audioRef.current.play();
                        startTimer();

                        audioRef.current.addEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));
                        return () => {

                            audioRef.current.removeEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));
                        };
                    } catch { }
                }
                else {
                    audioRef.current = new Audio('');

                    error();
                    setIsPlayingArr(false, isPlayingArr.length, index);
                }

            } else {
                closeDrawer();

                audioRef.current.pause();
                audioRef.current.removeEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));

            }
        }
        else if (type == 'recommend') {
            if (isPlayingArr[index]) {
                openDrawer();

                if (rows.tracks[index]?.preview_url != null) {
                    try {
                        audioRef.current.volume = volume / 100
                        audioRef.current.play();
                        startTimer();

                        audioRef.current.addEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));
                        return () => {

                            audioRef.current.removeEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));
                        };
                    } catch { }
                }
                else {
                    audioRef.current = new Audio('');

                    error();
                    setIsPlayingArr(false, isPlayingArr.length, index)
                }

            } else {
                closeDrawer();

                audioRef.current.pause();
                audioRef.current.removeEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));

            }
        }
        else if (type == 'search') {
            if (isPlayingArr[index]) {
                openDrawer();

                if (rows.items[index]?.preview_url != null) {
                    try {
                        audioRef.current.volume = volume / 100
                        audioRef.current.play();
                        startTimer();

                        audioRef.current.addEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));
                        return () => {

                            audioRef.current.removeEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));
                        };
                    } catch { }
                }
                else {
                    audioRef.current = new Audio('');

                    error();
                    setIsPlayingArr(false, isPlayingArr.length, index)
                }

            } else {
                closeDrawer();

                audioRef.current.pause();
                audioRef.current.removeEventListener('ended', () => setIsPlayingArr(false, isPlayingArr.length, index));

            }
        }
    }
        , [isPlayingArr[index]]);


    React.useEffect(() => {

        if (audioRef.current != null) {
            audioRef.current.volume = volume / 100;
        } else {
            //audioRef.current?.volume = volume / 100;
        }

    }, [volume]);

    const onScrub = (event) => {
        const value = parseFloat(event.target.value);
        // Clear any timers already running
        //clearInterval(intervalRef.current);
        audioRef.current.currentTime = value;
        setTrackProgress(audioRef.current.currentTime);
    };

    const startTimer = () => {
        // Clear any timers already running
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
            if (audioRef.current.ended) {
                setTrackProgress(audioRef.current.duration);

                //toNextTrack();
            } else {
                setTrackProgress(audioRef.current.currentTime);
            }
        }, [1000]);
    };
    React.useEffect(() => {

        setTrackProgress(0);


    }, [index]);
    React.useEffect(() => {

        getDomColor();

    }, [index]);
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
        else if (type == 'album') {
            try {
                //let color = '';
                const options = {

                    crossOrigin: 'anonymous'
                }
                return extractColors(albumMedia, options)
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
                return extractColors(rows?.tracks[index]?.album.images[1].url, options)
                    .then((result) => { setColor(result[0].hex); })
                    .catch(console.error);
                // return color;
            }
            catch {

            }
        }
        else if (type == 'recommend') {
            try {
                //let color = '';
                const options = {

                    crossOrigin: 'anonymous'
                }
                return extractColors(rows?.tracks[index]?.album.images[1].url, options)
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
    const reloadLocation = () => {
        window.location.reload()
    }
    return (
        index != -1 ? (<Drawer open={open} toNext={toNext} toPrev={toPrev} closeDrawer={closeDrawer} openDrawer={openDrawer} color={color} volume={volume} muteVolume={muteVolume} setVolume={updateVolume}  albumName={albumName} albumID={albumID} albumReleaseDate={albumDate} albumMedia={albumMedia} updateState={updateState} track={track} songName={songName} artists={artists} liked={true} playing={isPlayingArr} setPlaying={setIsPlayingArr} trackLength={audioRef?.current?.duration} currentTime={trackProgress} index={index} onScrub={onScrub}
            setSelectedPlaylist={setSelectedPlaylist} setSelectedPlaylistAlbumMedia={setSelectedPlaylistAlbumMedia} setSelectedPlaylistDateAdded={setSelectedPlaylistDateAdded} setSelectedPlaylistName={setSelectedPlaylistName} ></Drawer>
        )
            : ('')

    )

    // Handles cleanup and setup when changing tracks

}
export default AudioPlayer;