import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Outlet, Link } from "react-router-dom";
import Home from './Home/Home';
import SignIn from './SignIn/SignIn';
import Profile from './Profile/Profile';
import Recommendations from './Recommendations/Recommendations';
import Search from './Search/Search';
import About from './About/About';
import Permissions from './Permissions/Permissions';
import AudioPlayer from './AudioPlayer/AudioPlayer';
import { Snackbar, Alert } from '@mui/material';
import SpotifyPlayer from './AudioPlayer/SpotifyPlayer';
import Statistics from './Statistics/Statistics';
import Recents from './Recents/Recents'
import Settings from './Settings/Settings'
import Album from './Albums/Albums';
import Artist from './Artists/Artists'
import refreshTokenFunc from './SignIn/RefreshToken';
import checkAccessToken from './SignIn/CheckAccessToken'
//const signedIn = sessionStorage.getItem("atoken");
//const settings = ['Sign In', 'Option 1', 'Option 2'];
const track = {
  name: "",
  album: {
    images: [
      { url: "" }
    ]
  },
  artists: [
    { name: "" }
  ]
}


//App Bar////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(false);

  //Audio Player State Vars
  const [rows, setRows] = React.useState([]);
  const [playingArr, setPlayingArr] = React.useState([]);
  const [index, setIndex] = React.useState(-1);
  const [type, setType] = React.useState('');
  const [trackID, setTrackID] = React.useState('');
  const [mediaURL, setMediaURL] = React.useState('');
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');
  const [deviceID, setDeviceID] = React.useState('');
  const refreshToken = localStorage.getItem('refreshToken');
  let accessToken = localStorage.getItem('accessToken');
  const expires = parseInt(localStorage.getItem('expires'));
  const profilePic = localStorage.getItem('profilePic');
  const genresArr = JSON.parse(localStorage.getItem('genres'));
  const streaming = localStorage.getItem('playback') ? (localStorage.getItem('playback')) : ('false');
  const genres = { 'genres': genresArr }
  //Spotify Audio
  const [is_paused, setPaused] = React.useState(false);
  const [is_active, setActive] = React.useState(false);
  const [player, setPlayer] = React.useState(undefined);
  const [current_track, setTrack] = React.useState(track);
  const [volume, setVolume] = React.useState(50)
  const [selectedPlaylist, setSelectedPlaylist] = React.useState('');
  const [selectedPlaylistName, setSelectedPlaylistName] = React.useState('');
  const [selectedPlaylistDateAdded, setSelectedPlaylistDateAdded] = React.useState('');
  const [selectedPlaylistAlbumMedia, setSelectedPlaylistAlbumMedia] = React.useState('');
  React.useEffect(() => {
    if (!checkAccessToken()) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      window.onSpotifyWebPlaybackSDKReady = () => {

        const player = new window.Spotify.Player({
          name: 'Echoes.fyi',
          getOAuthToken: cb => { cb(accessToken) },
          volume: volume / 100
        });

        setPlayer(player);
        player.connect().then(success => {
          if (success) {
            console.log('The Web Playback SDK successfully connected to Spotify!');
          }
        })
        player.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
          transferPlayback(device_id);
          setDeviceID(device_id);
        });

        player.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        player.addListener('player_state_changed', (state => {

          if (!state) {
            return;
          }
          setTrack(state.track_window.current_track);
          setPaused(state.paused);

          player.getCurrentState().then(state => {
            (!state) ? setActive(false) : setActive(true);

          });

        }));

        player.connect();

      };
    }
    else {
      accessToken = refreshTokenFunc();
    }


  }, [accessToken]);

  const transferPlayback = async (devID) => {
    if (!checkAccessToken()) {

      if (deviceID != '') {
        await fetch("https://api.spotify.com/v1/me/player", {
          method: "PUT", headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ "device_ids": [deviceID] })
        })
          .then(async (result) => {
            if (result.ok) {
              console.log('transferred');
            }
            else {
              console.log('bad');

            }
          })
      }
    }
    else {
      refreshTokenFunc();
    }
  }

  const updateSelectedPlaylist = (type) => {
    setSelectedPlaylist(type);

  }
  const updateSelectedPlaylistName = (type) => {
    setSelectedPlaylistName(type);
  }
  const updateSelectedPlaylistDateAdded = (type) => {
    setSelectedPlaylistDateAdded(type);

  }
  const updateSelectedPlaylistAlbumMedia = (type) => {
    setSelectedPlaylistAlbumMedia(type);

  }
  const updateState = (type) => {
    setState(type);

  }
  const updateDeviceID = (id) => {
    setDeviceID(id)
  }
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);

  };
  const updateRows = (rows) => {
    setRows(rows);
  }
  const initPlayingArr = (length) => {
    let arr1 = [];
    for (let i = 0; i < length; i++) {
      arr1.push(false);
    }
    setPlayingArr(arr1);

  }
  const updateMedia = (media) => {
    setMediaURL(media);
  }
  const updateType = (type) => {
    setType(type);
  }
  const updateIndex = (index) => {
    setIndex(index)
  }
  const updateTrackID = (trackID) => {
    setTrackID(trackID)
  }
  const updateVolume = (event) => {
    setVolume(parseInt(event.target.value))
  }
  const updateVolumeVal = (value) => {
    setVolume(value);
  }
  const setIsPlayingArr = (boolVal, totalLength, index) => {
    //console.log('Playing ' + index);
    let length = totalLength;
    let newArr = [];
    for (let i = 0; i < length; i++) {
      newArr.push(false);
    }
    newArr[index] = boolVal;
    console.log(newArr);
    setPlayingArr(newArr);
  }
  const audioSrcMissing = () => {
    setOpenSnackbar(true);
    setSnackbarMessage('Error: Audio Preview not supplied by Spotify');
  }
  const toPrev = () => {
    if (type == 'playlists') {
      if (index - 1 < 0) {
        setTrackID(rows.items[playingArr.length - 1].track?.id);
        setIsPlayingArr(true, playingArr.length, playingArr.length - 1);
        setIndex(playingArr.length - 1);

      } else {
        setTrackID(rows.items[index - 1].track?.id);
        setIsPlayingArr(true, playingArr.length, index - 1);
        setIndex(index - 1);
      }
    }
    else if (type == 'artist' || type == 'recommend') {
      if (index - 1 < 0) {
        setTrackID(rows.tracks[playingArr.length - 1].id);
        setIsPlayingArr(true, playingArr.length, playingArr.length - 1);
        setIndex(playingArr.length - 1);

      } else {
        setTrackID(rows.tracks[index - 1].id);
        setIsPlayingArr(true, playingArr.length, index - 1);
        setIndex(index - 1);

      }
    }
    else if (type == 'album' || type == 'search') {
      if (index - 1 < 0) {
        setTrackID(rows.items[playingArr.length - 1].id);
        setIsPlayingArr(true, playingArr.length, playingArr.length - 1);
        setIndex(playingArr.length - 1);

      } else {
        setTrackID(rows.items[index - 1].id);
        setIsPlayingArr(true, playingArr.length, index - 1);
        setIndex(index - 1);

      }
    }
  };
  const clearStorage = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expires');
  }
  const toNext = () => {
    console.log(type);
    if (type == 'playlists') {
      if (index < playingArr.length - 1) {
        console.log('playlist')
        //setTrackIndex(trackIndex + 1);
        setTrackID(rows.items[index + 1]?.track?.id);
        setIsPlayingArr(true, playingArr.length, index + 1);
        setIndex(index + 1);

      } else {
        setTrackID(rows.items[0]?.track?.id);
        setIsPlayingArr(true, playingArr.length, 0);
        setIndex(0);

      }
    }
    else if (type == 'artist' || type == 'recommend') {
      console.log('artrec');

      if (index < playingArr.length - 1) {
        //setTrackIndex(trackIndex + 1);
        setTrackID(rows.tracks[index + 1]?.id);
        setIsPlayingArr(true, playingArr.length, index + 1);
        setIndex(index + 1);

      } else {
        setTrackID(rows.tracks[0]?.id);
        setIsPlayingArr(true, playingArr.length, 0);
        setIndex(0);

      }
    }
    else if (type == 'album' || type == 'search') {
      console.log('albumplay');
      if (index < playingArr.length - 1) {
        //setTrackIndex(trackIndex + 1);
        setTrackID(rows.items[index + 1]?.id);
        setIsPlayingArr(true, playingArr.length, index + 1);
        setIndex(index + 1);

      } else {
        setTrackID(rows.items[0]?.id);
        setIsPlayingArr(true, playingArr.length, 0);
        setIndex(0);

      }
    }
  };
  return (
    <Box >
      <BrowserRouter>
        {(refreshToken == null || accessToken == null || refreshToken == '' || accessToken == '') ? (
          <Box sx={{ bgcolor: '#0f0f0f', minHeight: '100vh', height: '100%' }}><SignIn ></SignIn></Box>) : (
          <div><AppBar position="sticky" sx={{ background: 'linear-gradient(to right bottom, #4daad1, #0d4157)', minWidth: '100%', maxWidth: '100%', height:'100px' }}>
            <Container sx={{ width: '95vw', maxWidth: '100vw' }} maxWidth={false}>
              <Toolbar disableGutters>
                <Box component={Link} to='/About' >
                  <Box
                    component="img"

                    sx={{
                      display: { xs: 'none', md: 'flex', width: '150px' }, mr: 1
                    }}
                    alt="Echoes Logo"
                    src="EchoesTextLogo.png"
                  />
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                      "& .MuiPaper-root": {
                        backgroundColor: '#16191a'
                      },
                    }}
                  >
                    <MenuItem sx={{
                      color: '#999999', ':hover': {
                        bgcolor: '#272c2e',
                        transition: '0.25s',
                        cursor: 'pointer'
                      },
                    }} key={'home'} component={Link} to='/' onClick={() => { handleCloseNavMenu(); }} >
                      <Typography textAlign="center">Home</Typography>
                    </MenuItem>
                    <MenuItem sx={{
                      color: '#999999', ':hover': {
                        bgcolor: '#272c2e',
                        transition: '0.25s',
                        cursor: 'pointer'
                      },
                    }} key={'recommendations'} component={Link} to='/Recommendations' onClick={() => { handleCloseNavMenu(); }}>
                      <Typography textAlign="center">Recommendations</Typography>
                    </MenuItem>
                    <MenuItem sx={{
                      color: '#999999', ':hover': {
                        bgcolor: '#272c2e',
                        transition: '0.25s',
                        cursor: 'pointer'
                      },
                    }} key={'search'} component={Link} to='/Search' onClick={() => { handleCloseNavMenu(); }}>
                      <Typography textAlign="center" >Search</Typography>
                    </MenuItem>
                    <MenuItem sx={{
                      color: '#999999', ':hover': {
                        bgcolor: '#272c2e',
                        transition: '0.25s',
                        cursor: 'pointer'
                      },
                    }} key={'stats'} component={Link} to='/Statistics' onClick={() => { handleCloseNavMenu(); }}>
                      <Typography textAlign="center" >Statistics</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
                <Box
                  component="img"
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none', maxWidth: '150px' },
                    flexGrow: 1,
                  }}
                  alt="Echoes Logo"
                  src="EchoesTextLogo.png"
                />
                <Typography
                  variant="h5"
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >

                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

                  <Button
                    key={'home'}
                    onClick={() => { handleCloseNavMenu(); }}
                    sx={{ my: 2, color: 'white', display: 'block', ':hover': { color: '#CCDDFF' } }}
                    component={Link} to='/'
                  >
                    Home
                  </Button>
                  <Button
                    key={'recommendations'}
                    onClick={() => { handleCloseNavMenu(); }}
                    sx={{ my: 2, color: 'white', display: 'block', ':hover': { color: '#CCDDFF' } } }
                    component={Link} to='/Recommendations'

                  >
                    Recommendations
                  </Button>
                  <Button
                    key={'search'}
                    onClick={() => { handleCloseNavMenu(); }}
                    sx={{ my: 2, color: 'white', display: 'block', ':hover': { color: '#CCDDFF' } } }
                    component={Link} to='/Search'

                  >
                    Search
                  </Button>
                  <Button
                    key={'stats'}
                    onClick={() => { handleCloseNavMenu(); }}
                    sx={{ my: 2, color: 'white', display: 'block', ':hover': { color: '#CCDDFF' } } }
                    component={Link} to='/Statistics'

                  >
                    Statistics
                  </Button>
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      {profilePic ? (<Avatar alt="Profile" src={profilePic} />) : (<Avatar alt="Profile" src={''} />)
                      }
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{
                      mt: '45px', "& .MuiPaper-root": {
                        backgroundColor: '#16191a'
                      },
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem sx={{
                      color: '#999999', ':hover': {
                        color: '#CCCCCC', 
                        bgcolor: '#272c2e',
                        transition: '0.25s',
                        cursor: 'pointer'
                      },
                    }} component={Link} to='/Profile' key={'Profile'} onClick={() => { handleCloseUserMenu('Profile'); }}>
                      <Typography textAlign="center">Profile</Typography>
                    </MenuItem>
                    <MenuItem sx={{
                      color: '#999999', ':hover': {
                        color: '#CCCCCC', 
                        bgcolor: '#272c2e',
                        transition: '0.25s',
                        cursor: 'pointer'
                      },
                    }} component={Link} to='/Recents' key={'Recents'} onClick={() => { handleCloseUserMenu('Profile'); }}>
                      <Typography textAlign="center">Recent Tracks</Typography>
                    </MenuItem>
                    <MenuItem sx={{
                      color: '#999999', ':hover': {
                        color: '#CCCCCC', 
                        bgcolor: '#272c2e',
                        transition: '0.25s',
                        cursor: 'pointer'
                      },
                    }} component={Link} to='/Settings' key={'Settings'} onClick={() => { handleCloseUserMenu('Profile'); }}>
                      <Typography textAlign="center">Playback Settings</Typography>
                    </MenuItem>
                    <MenuItem sx={{
                      color: '#999999', ':hover': {
                        color: '#CCCCCC', 
                        bgcolor: '#272c2e',
                        transition: '0.25s',
                        cursor: 'pointer'
                      },
                    }} component={Link} to='/' key={'Sign out'} onClick={() => { clearStorage(); window.location.href = '/'; }}>
                      <Typography textAlign="center">Sign Out</Typography>
                    </MenuItem>
                  </Menu>
                </Box>
                {streaming === 'true' ? (index != -1 && <SpotifyPlayer aT={accessToken} deviceID={deviceID} updateState={updateState} volume={volume} setVolume={updateVolume} setVolumeVal={updateVolumeVal} is_paused={is_paused} setIndex={updateIndex} is_active={is_active} current_track={current_track} player={player} transferPlayback={transferPlayback} setDeviceID={updateDeviceID} rows={rows} isPlayingArr={playingArr} setIsPlayingArr={setIsPlayingArr} index={index} error={audioSrcMissing} type={type} mediaFromAlbum={mediaURL} setTrackID={updateTrackID} trackID={trackID} toNext={toNext} toPrev={toPrev} />) :
                  (index != -1 && <AudioPlayer rows={rows} updateState={updateState} isPlayingArr={playingArr} setIsPlayingArr={setIsPlayingArr} index={index} error={audioSrcMissing} type={type} mediaFromAlbum={selectedPlaylistAlbumMedia} setTrackID={updateTrackID} trackID={trackID} toNext={toNext} toPrev={toPrev} selectedPlaylist={selectedPlaylist} selectedPlaylistAlbumMedia={selectedPlaylistAlbumMedia} selectedPlaylistDateAdded={selectedPlaylistDateAdded} selectedPlaylistName={selectedPlaylistName} setSelectedPlaylist={updateSelectedPlaylist} setSelectedPlaylistAlbumMedia={updateSelectedPlaylistAlbumMedia} setSelectedPlaylistDateAdded={updateSelectedPlaylistDateAdded} setSelectedPlaylistName={updateSelectedPlaylistName}></AudioPlayer>)}
              </Toolbar>
            </Container>
          </AppBar>
            <Outlet />
            <Routes>
              <Route index element={<Box sx={{ bgcolor: '#0f0f0f', minHeight: '100vh', height: '100%', padding: '20px', userSelect: 'none', '-webkit-touch-callout': 'none' }}><Home setRows={updateRows} rows={rows} state={state} updateState={updateState} initPlayingArr={initPlayingArr} playingArr={playingArr} setIsPlayingArr={setIsPlayingArr} setIndex={updateIndex} setType={updateType} setMedia={updateMedia} setTrackID={updateTrackID} trackID={trackID} selectedPlaylist={selectedPlaylist} selectedPlaylistAlbumMedia={selectedPlaylistAlbumMedia} selectedPlaylistDateAdded={selectedPlaylistDateAdded} selectedPlaylistName={selectedPlaylistName} setSelectedPlaylist={updateSelectedPlaylist} setSelectedPlaylistAlbumMedia={updateSelectedPlaylistAlbumMedia} setSelectedPlaylistDateAdded={updateSelectedPlaylistDateAdded} setSelectedPlaylistName={updateSelectedPlaylistName}></Home></Box>} />
              <Route path="Profile" element={<Box sx={{ bgcolor: '#0f0f0f', minHeight: '100vh', height: '100%', padding: '20px', userSelect: 'none', '-webkit-touch-callout': 'none' }}><Profile setRows={updateRows} rows={rows} initPlayingArr={initPlayingArr} playingArr={playingArr} setIsPlayingArr={setIsPlayingArr} setIndex={updateIndex} setType={updateType} setMedia={updateMedia} setTrackID={updateTrackID} trackID={trackID} selectedPlaylist={selectedPlaylist} selectedPlaylistAlbumMedia={selectedPlaylistAlbumMedia} selectedPlaylistDateAdded={selectedPlaylistDateAdded} selectedPlaylistName={selectedPlaylistName} setSelectedPlaylist={updateSelectedPlaylist} setSelectedPlaylistAlbumMedia={updateSelectedPlaylistAlbumMedia} setSelectedPlaylistDateAdded={updateSelectedPlaylistDateAdded} setSelectedPlaylistName={updateSelectedPlaylistName}></Profile></Box>} />
              <Route path="Recommendations" element={<Box sx={{ bgcolor: '#0f0f0f', minHeight: '100vh', height: '100%', padding: '20px', userSelect: 'none', '-webkit-touch-callout': 'none' }}><Recommendations genres={genres} setRows={updateRows} rows={rows} initPlayingArr={initPlayingArr} playingArr={playingArr} setIsPlayingArr={setIsPlayingArr} setIndex={updateIndex} setType={updateType} setMedia={updateMedia} setTrackID={updateTrackID} trackID={trackID}></Recommendations></Box>} />
              <Route path="Search" element={<Box sx={{ bgcolor: '#0f0f0f', minHeight: '100vh', height: '100%', padding: '20px', userSelect: 'none', '-webkit-touch-callout': 'none' }}><Search genres={genres} setRows={updateRows} rows={rows} initPlayingArr={initPlayingArr} playingArr={playingArr} setIsPlayingArr={setIsPlayingArr} setIndex={updateIndex} setType={updateType} setMedia={updateMedia} setTrackID={updateTrackID} trackID={trackID}></Search></Box>} />
              <Route path="callback" element={<Box sx={{ bgcolor: '#0f0f0f', minHeight: '100vh', height: '100%', padding: '20px', userSelect: 'none', '-webkit-touch-callout': 'none' }}><SignIn></SignIn></Box>} />
              <Route path="About" element={<Box sx={{ bgcolor: '#0f0f0f', minHeight: '100vh', height: '100%', padding: '20px', userSelect: 'none', '-webkit-touch-callout': 'none' }}><About /></Box>} />
              <Route path="Statistics" element={<Box sx={{ bgcolor: '#0f0f0f', minHeight: '100vh', height: '100%', padding: '20px', userSelect: 'none', '-webkit-touch-callout': 'none' }}><Statistics genres={genres} setRows={updateRows} rows={rows} initPlayingArr={initPlayingArr} playingArr={playingArr} setIsPlayingArr={setIsPlayingArr} setIndex={updateIndex} setType={updateType} setMedia={updateMedia} setTrackID={updateTrackID} trackID={trackID}></Statistics></Box>} />
              <Route path="Artist" element={<Box sx={{ bgcolor: '#0f0f0f', minHeight: '100vh', height: '100%', padding: '20px', userSelect: 'none', '-webkit-touch-callout': 'none' }}><Artist setRows={updateRows} rows={rows} initPlayingArr={initPlayingArr} playingArr={playingArr} setIsPlayingArr={setIsPlayingArr} setIndex={updateIndex} setType={updateType} setMedia={updateMedia} setTrackID={updateTrackID} trackID={trackID} selectedPlaylist={selectedPlaylist} selectedPlaylistAlbumMedia={selectedPlaylistAlbumMedia} selectedPlaylistDateAdded={selectedPlaylistDateAdded} selectedPlaylistName={selectedPlaylistName} setSelectedPlaylist={updateSelectedPlaylist} setSelectedPlaylistAlbumMedia={updateSelectedPlaylistAlbumMedia} setSelectedPlaylistDateAdded={updateSelectedPlaylistDateAdded} setSelectedPlaylistName={updateSelectedPlaylistName}></Artist></Box>} />
              <Route path="Album" element={<Box sx={{ bgcolor: '#0f0f0f', minHeight: '100vh', height: '100%', padding: '20px', userSelect: 'none', '-webkit-touch-callout': 'none' }}><Album setRows={updateRows} rows={rows} initPlayingArr={initPlayingArr} playingArr={playingArr} setIsPlayingArr={setIsPlayingArr} setIndex={updateIndex} setType={updateType} setMedia={updateMedia} setTrackID={updateTrackID} trackID={trackID} selectedPlaylist={selectedPlaylist} selectedPlaylistAlbumMedia={selectedPlaylistAlbumMedia} selectedPlaylistDateAdded={selectedPlaylistDateAdded} selectedPlaylistName={selectedPlaylistName} setSelectedPlaylist={updateSelectedPlaylist} setSelectedPlaylistAlbumMedia={updateSelectedPlaylistAlbumMedia} setSelectedPlaylistDateAdded={updateSelectedPlaylistDateAdded} setSelectedPlaylistName={updateSelectedPlaylistName}></Album></Box>} />
              <Route path="Recents" element={<Box sx={{ bgcolor: '#0f0f0f', minHeight: '100vh', height: '100%', padding: '20px', userSelect: 'none', '-webkit-touch-callout': 'none' }}><Recents setRows={updateRows} rows={rows} initPlayingArr={initPlayingArr} playingArr={playingArr} setIsPlayingArr={setIsPlayingArr} setIndex={updateIndex} setType={updateType} setMedia={updateMedia} setTrackID={updateTrackID} trackID={trackID} selectedPlaylist={selectedPlaylist} selectedPlaylistAlbumMedia={selectedPlaylistAlbumMedia} selectedPlaylistDateAdded={selectedPlaylistDateAdded} selectedPlaylistName={selectedPlaylistName} setSelectedPlaylist={updateSelectedPlaylist} setSelectedPlaylistAlbumMedia={updateSelectedPlaylistAlbumMedia} setSelectedPlaylistDateAdded={updateSelectedPlaylistDateAdded} setSelectedPlaylistName={updateSelectedPlaylistName}></Recents></Box>} />
              <Route path="Settings" element={<Box sx={{ bgcolor: '#0f0f0f', minHeight: '100vh', height: '100%', padding: '20px', userSelect: 'none', '-webkit-touch-callout': 'none' }}><Settings aT={accessToken} /></Box>} />
              <Route path="Permissions" element={<Box sx={{ bgcolor: '#0f0f0f', minHeight: '100vh', height: '100%', padding: '20px', userSelect: 'none', '-webkit-touch-callout': 'none' }}><Permissions /></Box>} />
            </Routes>
          </div>)}

      </BrowserRouter>

      <Snackbar
        open={openSnackbar}
        onClose={() => setOpenSnackbar(false)}
        autoHideDuration={4000}
      >
        {snackbarMessage.includes('Error') ?
          (<Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>) :
          (<Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>)

        }
      </Snackbar>
    </Box >


  );
}
export default ResponsiveAppBar;
