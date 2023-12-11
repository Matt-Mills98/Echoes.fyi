import * as React from 'react';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Card from '@mui/material/Card';
import { Grid, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import AlbumIcon from '@mui/icons-material/Album';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import PersonIcon from '@mui/icons-material/Person';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import CloseIcon from '@mui/icons-material/Close';
import {  useTheme } from '@mui/material/styles';
import { YearCalendar } from '@mui/x-date-pickers';
import SearchAlbums from './SearchAlbums';
import SearchArtists from './SearchArtists';
import SearchTracks from './SearchTracks';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import refreshTokenFunc from '../SignIn/RefreshToken';
import checkAccessToken from '../SignIn/CheckAccessToken'
import AlertTitle from '@mui/material/AlertTitle';
export default function CustomizedInputBase(props) {
    const { setRows, rows, initPlayingArr, playingArr, setIsPlayingArr, setIndex, setType, setMedia, setTrackID, trackID } = props
    let accessToken = localStorage.getItem('accessToken');
    const [open, setOpen] = React.useState(false);
    const [openMore, setOpenMore] = React.useState(false);
    const [searchType, setSearchType] = React.useState([]);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [searchString, setSearchString] = React.useState('');
    const [tags, setTags] = React.useState([]);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogGenreOpen, setDialogGenreOpen] = React.useState(false);
    const [searchResults, setSearchResults] = React.useState([]);
    const [year, setYear] = React.useState(dayjs('2022-04-17'));
    const [genres, setGenres] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const outerTheme = useTheme();

    const anchorMenu = Boolean(open);
    const anchorMenuMore = Boolean(openMore);

    React.useEffect(() => { initTags(); getGenres(); window.document.title = 'Search' }, [])

    const getGenres = async () => {


        setGenres(props.genres);
        //initSelectedGenres(json.genres.length);

    }
    const getSearch = async () => {
        if (!checkAccessToken()) {

            setLoading(true);

            let types = '';
            if (searchType.length != 0) {
                console.log(searchType);

                let el = searchType.map((type, i) => {
                    type = type.substring(0, type.length - 1); type = type.toLowerCase(); return type
                });
                types = '&type=' + el.join(',');
            }
            else {
                types = '&type=album,track,artist';
            }
            let q = formQParams();
            await fetch("https://api.spotify.com/v1/search?q=" + q + types + '&limit=50', {
                method: "GET", headers: { Authorization: `Bearer ${accessToken}` }
            })
                .then(async (result) => {
                    if (result.ok) {
                        const json = await result.json();
                        setSearchResults(json);
                        //initSelectedGenres(json.genres.length);
                    }
                    else {
                        setError(true);
                        setErrorMessage('Failed to retrieve search');
                        setSearchResults([]);
                    }
                });
            setLoading(false);
        }
        else {
            accessToken = refreshTokenFunc();
        }
    }
    const enterSearchString = (e) => {
        if (e.keyCode == 13) {
            getSearch();
            // put the login here
        }
    }
    const formQParams = () => {
        let year = '';
        let genre = '';
        let hipsterTag = '';
        let newTag = '';
        if (tags[0].selected) {
            year = '%20year%2C' + tags[0].text;
        }
        if (tags[1].selected) {
            hipsterTag = '%20tag%2Chipster'
        }
        if (tags[2].selected) {
            newTag = '%20tag%2Cnew'
        }
        if (tags[3].selected) {
            genre = '%20genre%2C' + tags[3].text;
        }
        return searchString + year + genre + hipsterTag + newTag;
    }
    const openMenuMore = (event) => {
        setOpenMore(event.currentTarget);
    }

    const closeMenuMore = () => {
        setOpenMore(null);
    }
    const openMenu = (event) => {
        setOpen(event.currentTarget);
    }

    const closeMenu = () => {
        setOpen(null);
    }

    const updateSearchString = (event) => {
        setSearchString(event.target.value)
    }

    const setSelected = (boolVal, index) => {
        console.log(tags);

        let el = tags.map((tag, i) => {
            if (index === i) { tag.selected = boolVal } return tag
        });
        setTags(el);

    }
    const initTags = () => {
        const arr = [{ selected: false, text: '', type: 'Year' }, { selected: false, text: '', type: 'Hipster' }, { selected: false, text: '', type: 'New' }, { selected: false, text: '', type: 'Genre' }];
        setTags(arr);
    }
    const updateText = (value, index) => {
        console.log(tags);

        let el = tags.map((tag, i) => {
            if (index === i) { tag.text = value } return tag
        });
        setTags(el);

    }
    const handleChange = (event) => {
        const value = event.target.value;
        setSearchType(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        initTags();
    };
    const search = () => {
        if (searchString == '') {
            setSnackbarMessage('Error: Please enter search value');
            setOpenSnackbar(true);
        }
    }
    const handleDialogClose = () => {
        setDialogOpen(false);
    };
    const handleDialogGenreClose = () => {
        setDialogGenreOpen(false);
    };
    const getName = (name) => {
        let text = name[0].toUpperCase() + name.slice(1);

        if (text.includes('-')) {
            text = text.toLowerCase()
                .split('-')
                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                .join('-');
        }
        if (text.includes('-Opm')) {
            text = 'Philippines-OPM';
        }
        if (text == 'Edm' || text == 'Mpb' || text == 'Idm') {
            text = text.toUpperCase();
        }
        return text;

    }
    return (
        <Box marginBottom={'100px'}>
            {error ? (<Alert severity="error" variant="outlined">
                <AlertTitle>Error</AlertTitle>
                {errorMessage}
            </Alert>
            ) : (<Box>
                <Grid
                >
                    <Grid item xs={12}>
                        <Grid container
                            spacing={2}
                            direction="row"
                            alignItems="center"
                            justifyContent="center">
                            <Grid item xs={12} sm={12} md={10} lg={8} xl={5}>
                                <Card sx={{ bgcolor: '#16191a' }}>
                                    <Grid container
                                        spacing={0}
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="center">
                                        <IconButton sx={{
                                            p: '10px', color: '#71c1e3',
                                        }} aria-label="menu" onClick={openMenu}>
                                            <MenuIcon sx={{
                                                color: '#71c1e3',
                                            }} />
                                        </IconButton>
                                        <Select
                                            MenuProps={{
                                                sx: {
                                                    "& .MuiPaper-root": {
                                                        backgroundColor: '#16191a'
                                                    },

                                                }
                                            }}
                                            sx={{ width: '0px', height: '0px', visibility: 'hidden' }}
                                            labelId="demo-multiple-name-label"
                                            id="demo-multiple-name"
                                            multiple
                                            value={searchType}
                                            onChange={handleChange}
                                            open={open}
                                            onClose={closeMenu}
                                            onOpen={openMenu}

                                        >
                                            <MenuItem
                                                key={'Albums'}
                                                value={'Albums'}
                                                sx={{
                                                    color: '#999999', ':hover': {
                                                        bgcolor: '#272c2e',
                                                        transition: '0.25s',
                                                        cursor: 'pointer'
                                                    },
                                                }}
                                            >
                                                <ListItemIcon >
                                                    <AlbumIcon sx={{ color: '#999999' }} />
                                                </ListItemIcon>
                                                <ListItemText>Albums</ListItemText>
                                            </MenuItem>
                                            <MenuItem
                                                key={'Artists'}
                                                value={'Artists'}
                                                sx={{
                                                    color: '#999999', ':hover': {
                                                        bgcolor: '#272c2e',
                                                        transition: '0.25s',
                                                        cursor: 'pointer'
                                                    },
                                                }}
                                            >

                                                <ListItemIcon >
                                                    <AudiotrackIcon sx={{ color: '#999999' }} />
                                                </ListItemIcon>
                                                <ListItemText>Artists</ListItemText>
                                            </MenuItem>
                                            <MenuItem
                                                key={'Tracks'}
                                                value={'Tracks'}
                                                sx={{
                                                    color: '#999999', ':hover': {
                                                        bgcolor: '#272c2e',
                                                        transition: '0.25s',
                                                        cursor: 'pointer'
                                                    },
                                                }}
                                            >
                                                <ListItemIcon >
                                                    <PersonIcon sx={{ color: '#999999' }} />
                                                </ListItemIcon>
                                                <ListItemText>Tracks</ListItemText>
                                            </MenuItem>
                                        </Select>
                                        <InputBase
                                            onKeyDown={enterSearchString}
                                            value={searchString}
                                            onChange={updateSearchString}
                                            sx={{ ml: 1, flex: 1, color: '#CCCCCC' }}
                                            placeholder={"Search " + searchType.join(', ')}
                                            inputProps={{ 'aria-label': "Search " + searchType.join(', ') }}
                                        />
                                        {tags.map((tag, index) => tag.selected && <Button type="submit" sx={{ borderRadius: 28, backgroundColor: `rgb(${index * 10 + 50}, ${index * 50 + 50}, ${200}, 0.5)`, textTransform: 'none', margin: '2px', color: 'white', padding: 'none' }} onClick={() => { setSelected(false, index) }}><RemoveIcon fontSize='small'></RemoveIcon>{tag.text != '' ? (tag.text) : (tag.type)}</Button>)}


                                        <IconButton sx={{ p: '10px', color: '#71c1e3' }} aria-label="More" onClick={openMenuMore}>
                                            <MoreVertIcon />
                                        </IconButton>
                                        <Menu
                                            sx={{
                                                "& .MuiPaper-root": {
                                                    backgroundColor: '#16191a'
                                                },

                                            }}
                                            id="basic-menu"
                                            anchorEl={openMore}
                                            open={anchorMenuMore}
                                            onClose={closeMenuMore}
                                            MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                            }}
                                        >
                                            <div>
                                                {searchType == 'Albums' &&
                                                    <div>

                                                        <MenuItem sx={{
                                                            color: '#999999', ':hover': {
                                                                bgcolor: '#272c2e',
                                                                transition: '0.25s',
                                                                cursor: 'pointer'
                                                            },
                                                        }}
                                                            onClick={() => { setSelected(true, 1); closeMenuMore(); }}>

                                                            <ListItemText>Search Bottom 10% Popularity</ListItemText>
                                                        </MenuItem>
                                                        <MenuItem sx={{
                                                            color: '#999999', ':hover': {
                                                                bgcolor: '#272c2e',
                                                                transition: '0.25s',
                                                                cursor: 'pointer'
                                                            },
                                                        }}
                                                            onClick={() => { setSelected(true, 2); closeMenuMore(); }}>

                                                            <ListItemText>Search New Albums</ListItemText>
                                                        </MenuItem>

                                                    </div>
                                                }
                                                {(searchType.toString() != '' && !searchType.includes('Albums')) &&
                                                    <MenuItem sx={{
                                                        color: '#999999', ':hover': {
                                                            bgcolor: '#272c2e',
                                                            transition: '0.25s',
                                                            cursor: 'pointer'
                                                        },
                                                    }}
                                                        onClick={() => { setDialogGenreOpen(true); closeMenuMore(); }}>

                                                        <ListItemText>Search Genres</ListItemText>
                                                    </MenuItem>
                                                }
                                                <MenuItem sx={{
                                                    color: '#999999', ':hover': {
                                                        bgcolor: '#272c2e',
                                                        transition: '0.25s',
                                                        cursor: 'pointer'
                                                    },
                                                }}
                                                    onClick={() => { setDialogOpen(true); closeMenuMore(); }}>

                                                    <ListItemText>Search Year</ListItemText>

                                                </MenuItem>
                                            </div>
                                        </Menu>
                                        <IconButton type="button" sx={{
                                            p: '10px', color: '#71c1e3'

                                        }} aria-label="search">
                                            <SearchIcon onClick={getSearch} />
                                        </IconButton>
                                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

                                    </Grid>
                                </Card>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container
                        spacing={2}
                        marginTop={'5px'}
                    >
                        <Grid item sx={12} md={12}  >
                            {searchResults?.albums != null &&
                                <SearchAlbums aT={accessToken} playlists={searchResults?.albums}></SearchAlbums>
                            }
                        </Grid>
                        <Grid item sx={12} md={12} >
                            {searchResults?.artists != null &&
                                <SearchArtists aT={accessToken} artists={searchResults?.artists}></SearchArtists>
                            }
                        </Grid>
                        <Grid item sx={12} md={12} >
                            {searchResults?.tracks != null &&
                                <SearchTracks aT={accessToken} rows={searchResults?.tracks} setRows={setRows} initPlayingArr={initPlayingArr} playingArr={playingArr} setIsPlayingArr={setIsPlayingArr} setIndex={setIndex} setType={setType} setTrackID={setTrackID} trackID={trackID}></SearchTracks>
                            }
                        </Grid>


                    </Grid>
                </Grid>

                <Dialog PaperProps={{ sx: { maxWidth: '90vw' } }} onClose={handleDialogClose} open={dialogOpen} sx={{

                    '& .MuiPaper-root': {
                        backgroundColor: '#16191a',
                        maxwidth: '90vh'
                    },

                }}>
                    <DialogTitle variant="h4" ><Typography variant="h6" sx={{ color: '#71c1e3' }}>Select Date</Typography></DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleDialogClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <DialogContent sx={{ '&::-webkit-scrollbar': { display: 'none' }, margin: 'none' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <YearCalendar value={year} onChange={(newValue) => { setYear(newValue); updateText(newValue.year(), 0) }} yearsPerRow={4} sx={{ '&.MuiYearCalendar-root': { color: '#999999', "& .Mui-selected": { bgcolor: '#71c1e3', color: 'black', fontWeight: 'bold' } }, '&::-webkit-scrollbar': { display: 'none' }, margin: 'none' }} />
                            </DemoContainer>
                        </LocalizationProvider>
                        <Grid container justifyContent="flex-end" margin={'5px'}>
                            <Button sx={{ color: '#71c1e3' }} onClick={() => { handleDialogClose(); setSelected(true, 0) }} >Add Search Tag</Button>
                        </Grid>
                    </DialogContent>
                </Dialog>
                <Dialog PaperProps={{ sx: { maxWidth: '90vw' } }} onClose={handleDialogGenreClose} open={dialogGenreOpen} sx={{

                    '& .MuiPaper-root': {
                        backgroundColor: '#16191a',
                        maxwidth: '90vh'
                    },

                }}>
                    <DialogTitle variant="h4" ><Typography variant="h6" sx={{ color: '#71c1e3' }}>Select Genre</Typography></DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleDialogGenreClose}
                        sx={{
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <DialogContent sx={{ '&::-webkit-scrollbar': { display: 'none' }, margin: 'none' }}>
                        <Grid container >
                            {genres.genres?.map((name, index) => (
                                <Box >
                                    <Button type="submit" sx={{ borderRadius: 28, backgroundColor: `rgb(${index + 60}, ${index + 150}, ${255}, 0.5)`, textTransform: 'none', margin: '2px', color: 'white', padding: 'none' }} onClick={() => { setSelected(true, 3); updateText(name, 3); handleDialogGenreClose(); }}><RemoveIcon fontSize='small'></RemoveIcon>{getName(name)}</Button>
                                </Box>
                            ))}
                        </Grid>
                    </DialogContent>
                </Dialog>
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
                {
                    loading && <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                    >
                        <CircularProgress sx={{ color: '#71c1e3' }} />
                    </Backdrop>
                }
            </Box>
            )}
        </Box>
    );
}