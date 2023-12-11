import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import moment from 'moment/moment';
import IconButton from '@mui/material/IconButton';

import Snackbar from '@mui/material/Snackbar';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';


import { Link } from "react-router-dom";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LaunchIcon from '@mui/icons-material/Launch';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Pagination from '@mui/material/Pagination';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Alert from '@mui/material/Alert';
import Animation from '../PlayingAnimation/animation';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import FilterListIcon from '@mui/icons-material/FilterList';
import Toolbar from '@mui/material/Toolbar';
import Tooltips from '@mui/material/Tooltip';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import ExplicitIcon from '@mui/icons-material/Explicit';
import Stack from '@mui/material/Stack';
import GetWindowDimensions from '../WindowDimensions/WindowDimensions';
import AnalysisDialog from './AnalysisDialog';
import refreshTokenFunc from '../SignIn/RefreshToken';
import checkAccessToken from '../SignIn/CheckAccessToken'
import AlertTitle from '@mui/material/AlertTitle';




function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),

        minutes = (minutes < 10) ? minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}



function descendingComparator(a, b, orderBy) {
    try {
        if (b[orderBy].toUpperCase() < a[orderBy].toUpperCase()) {
            return -1;
        }
        if (b[orderBy].toUpperCase() > a[orderBy].toUpperCase()) {
            return 1;
        }
    }
    catch {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}


function stableSort(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);

    stabilizedThis?.sort((a, b) => {

        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
}
function stableSortAdded(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);

    stabilizedThis?.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
}
function stableSortAlbum(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);

    stabilizedThis?.sort((a, b) => {
        const order = comparator(a[0].track.album, b[0].track.album);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
}
function stableSortArtist(array, comparator) {
    const stabilizedThis = array?.map((el, index) => [el, index]);

    stabilizedThis?.sort((a, b) => {
        const order = comparator(a[0].artists[0], b[0].artists[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis?.map((el) => el[0]);
}
export default function UserAlbumSongs(props) {
    let { aT } = props;
    const { playlistID, playlistName, albumDateAdded, albumMedia, setDisplayed, setSelectedPlaylist, setSelectedPlaylistName, setDateAdded, setAlbumMedia, setArtistID, setRows, playingArr, setIsPlayingArr, setIndex, setType, updateGlobalMedia, setTrackID, trackID } = props;
    const { width } = GetWindowDimensions();
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('');
    const [page, setPage] = React.useState(1);
    const [rowsLocal, setRowsLocal] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [track, setTrack] = React.useState([]);
    const [analysis, setAnalysis] = React.useState([]);
    const [features, setFeatures] = React.useState([]);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [openMore, setOpenMore] = React.useState(null);
    const [openFilter, setOpenFilter] = React.useState(null);
    const anchorFilterMenu = Boolean(openFilter);
    const [menuItem, setMenuItem] = React.useState([]);
    const [itemIndex, setItemIndex] = React.useState('');

    const [artistsOpenMore, setArtistsOpenMore] = React.useState(null);
    const anchorMenu = Boolean(openMore);
    const artistsAnchorMenu = Boolean(artistsOpenMore);
    const [playing, setPlaying] = React.useState(false);
    const [audIndex, setAudIndex] = React.useState(-1);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [hovering, setHovering] = React.useState([]);
    const [liked, setLiked] = React.useState([]);

    React.useEffect(() => { setPage(1); }, [playlistID]);
    React.useEffect(() => { getPlaylistSongs(0) }, [page, playlistID]);
    React.useEffect(() => { checkLikedSongs() }, [rowsLocal])

    const audioSrcMissing = () => {
        setOpenSnackbar(true);
        setSnackbarMessage('Error: Audio Preview not supplied by Spotify');
    }

    const getPlaylistSongs = async (off) => {
        if (!checkAccessToken()) {

            console.log(playlistID);
            setLoading(true);
            off = (page - 1) * 50
            await fetch("https://api.spotify.com/v1/albums/" + playlistID + "/tracks?limit=50&offset=" + off, {
                method: "GET", headers: { Authorization: `Bearer ${aT}` }
            })
                .then(async (result) => {
                    if (result.ok) {
                        const json = await result.json();
                        setRowsLocal(json);
                        initHoveringArr(json.items?.length);
                    }
                    else {
                        setError(true);
                        setErrorMessage('Failed to retrieve Albums Tracks');
                        setRowsLocal([]);
                    }
                });
            setLoading(false);
        }
        else {
            aT = refreshTokenFunc();
        }
        window.document.title = 'Albums | ' + playlistName;

    }
    const checkLikedSongs = async () => {
        if (!checkAccessToken()) {

            let ids = '';
            rowsLocal?.items?.map((item) => { ids = ids + item.id + '%2C' });
            if (ids != '') {
                await fetch("https://api.spotify.com/v1/me/tracks/contains?ids=" + ids, {
                    method: "GET", headers: { Authorization: `Bearer ${aT}` }
                })
                    .then(async (result) => {
                        if (result.ok) {
                            const json = await result.json();
                            setLiked(json);

                        }
                        else {
                            setOpenSnackbar(true);
                            setSnackbarMessage('Error: Failed to retrieve liked information')
                        }
                    });
            }
        }
        else {
            aT = refreshTokenFunc();
        }
    }
    const toggleLiked = async (localLiked, id, index) => {
        if (!checkAccessToken()) {

            localLiked ? ((
                await fetch("https://api.spotify.com/v1/me/tracks?ids=" + id, {
                    method: "DELETE", headers: { Authorization: `Bearer ${aT}`, 'Content-Type': 'application/json' }, data: { "ids": id }
                })
                    .then(async (result) => {
                        if (result.ok) {
                            console.log('deleted')
                            let el = liked.map((item, i) => {
                                if (index === i) { item = !localLiked } return item
                            });
                            setLiked(el);
                            setOpenSnackbar(true);
                            setSnackbarMessage('Removed from Liked Songs');
                        }
                        else {
                            setOpenSnackbar(true);
                            setSnackbarMessage('Error: Failed to remove from liked songs');
                        }
                    }))
            ) : (
                await fetch("https://api.spotify.com/v1/me/tracks?ids=" + id, {
                    method: "PUT", headers: { Authorization: `Bearer ${aT}`, 'Content-Type': 'application/json' }, data: { "ids": id }
                })
                    .then(async (result) => {
                        if (result.ok) {
                            console.log('added')
                            let el = liked.map((item, i) => {
                                if (index === i) { item = !localLiked } return item
                            });
                            setLiked(el);
                            setOpenSnackbar(true);
                            setSnackbarMessage('Added to Liked Songs');
                        }
                        else {
                            setOpenSnackbar(true);
                            setSnackbarMessage('Error: Failed to add to liked songs');
                        }
                    })
            )
        }
        else {
            aT = refreshTokenFunc();
        }
    }
    const getIndex = (id) => {
        let i = 0;
        rowsLocal.items.map((item, index) => {
            if (id == item?.id) {
                i = index;
            }
        })
        return i;
    }
    const createSortHandler = (property) => (event) => {
        handleRequestSort(event, property);
    };
    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };
    const visibleRows = React.useMemo(

        () => orderBy == 'added_at' ? (stableSortAdded(rowsLocal?.items, getComparator(order, 'release_date'))
        ) : (orderBy == 'album' ? (stableSortAlbum(rowsLocal?.items, getComparator(order, 'name'))
        ) : (orderBy == 'artist' ? (stableSortArtist(rowsLocal?.items, getComparator(order, 'name'))
        ) : (stableSort(rowsLocal?.items, getComparator(order, orderBy))
        )
        )
        )
        ,
        [order, orderBy, rowsLocal],
    );


    const initHoveringArr = (length) => {
        let arr1 = [];
        for (let i = 0; i < length; i++) {
            arr1.push(false);
        }
        setHovering(arr1);

    }

    const setIsHoveringArr = (boolVal, index) => {
        let length = playingArr.length;
        let newArr = [];
        for (let i = 0; i < length; i++) {
            newArr.push(false);
        }
        newArr[index] = boolVal;
        setHovering(newArr);
    }

    const copyToClipBoard = (codestring) => {
        setOpenSnackbar(true)
        navigator.clipboard.writeText(codestring);
    }
    const openMenu = (event, item, index) => {
        setOpenMore(event.currentTarget);
        setMenuItem(item);
        setItemIndex(index)

    }
    const artistsOpenMenu = (event) => {
        setArtistsOpenMore(event.currentTarget);
    }

    const closeMenu = () => {
        setOpenMore(null);
        setArtistsOpenMore(null);
    }
    const openFilterMenu = (event) => {
        setOpenFilter(event.currentTarget);
    }
    const closeFilter = () => {
        setOpenFilter(null);

    }
    const updateDisplayed = (type) => {
        setDisplayed(type);
    }
    const updateSelectedPlaylist = (id, name, dateAdded, media) => {
        setSelectedPlaylist(id);
        setSelectedPlaylistName(name);
        setDateAdded(dateAdded);
        setAlbumMedia(media);
        setArtistID(id);
    }
    const changePage = (event, value) => {
        setPage(value)
    }
    const handleClickOpen = async (trackLocal) => {
        if (!checkAccessToken()) {

            setLoading(true);

            await fetch("https://api.spotify.com/v1/audio-analysis/" + trackLocal.id, {
                method: "GET", headers: { Authorization: `Bearer ${aT}` }
            })
                .then(async (result) => {
                    if (result.ok) {
                        const json = await result.json();
                        setAnalysis(json);

                    }
                    else {
                        setOpenSnackbar(true);
                        setSnackbarMessage('Error: Failed to retrieve audio analysis');;
                    }
                });

            await fetch("https://api.spotify.com/v1/audio-features/" + trackLocal.id, {
                method: "GET", headers: { Authorization: `Bearer ${aT}` }
            })
                .then(async (result) => {
                    if (result.ok) {
                        const json = await result.json();
                        setFeatures(json);

                    }
                    else {
                        setOpenSnackbar(true);
                        setSnackbarMessage('Error: Failed to retrieve audio features');
                    }
                });
            setTrack(trackLocal);
            setOpen(true);
            setLoading(false);
        }
        else {
            refreshTokenFunc();
        }

    };

    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <Box marginBottom={'100px'}>

            {error ? (<Alert severity="error" variant="outlined">
                <AlertTitle>Error</AlertTitle>
                {errorMessage}
            </Alert>
            ) : (
                <Card sx={{ maxWidth: '100%', bgcolor: '#16191a' }}>

                    <Box sx={{ padding: '15px' }}>
                        <Toolbar
                            sx={{
                                pl: { sm: 2 },
                                pr: { xs: 1, sm: 1 },

                            }}
                        >
                            <Typography
                                sx={{ flex: '1 1 100%', color: '#71c1e3' }}
                                variant="h6"
                                id="tableTitle"
                                component="div"
                            >
                            </Typography>
                            <Tooltips title="Filter list">
                                <IconButton>
                                    <FilterListIcon sx={{ color: '#71c1e3' }} onClick={(event) => { openFilterMenu(event) }} />
                                </IconButton>
                            </Tooltips>
                        </Toolbar>
                        <TableContainer sx={{
                            maxHeight: '67vh', scrollbarWidth: "none" /* Firefox */,
                            ':hover': {
                                "&::-webkit-scrollbar-thumb": {
                                    backgroundColor: '#272c2e'
                                },
                            },

                            "&::-webkit-scrollbar": {
                                width: '10px',
                                height: '10px',
                                backgroundColor: '#16191a',
                                display: 'inline-block',
                                textAlign: 'center',
                                ':hover': {
                                    cursor: 'pointer'
                                }
                            },
                            "&::-webkit-scrollbar-thumb": {
                                width: '10px',

                                backgroundColor: '#16191a',
                                borderRadius: '4px',
                                height: '10px',

                            },
                        }}>
                            <Table size="small" stickyHeader aria-label="sticky table" sx={{
                                bgcolor: '#16191a', display: 'block'
                            }}>
                                <TableHead >
                                    <TableRow >
                                        <TableCell
                                            key={'index'}
                                            align={'center'}
                                            sx={{ bgcolor: '#16191a', borderBottom: 'none', width: '5%' }}>
                                            <Typography sx={{ color: '#FFFFFF' }} variant="body2">
                                                #
                                            </Typography>
                                        </TableCell>

                                        <TableCell
                                            key={'name'}
                                            align={'left'}
                                            sx={{ color: '#FFFFFF', bgcolor: '#16191a', borderBottom: 'none', minWidth: '5%' }} sortDirection={orderBy === 'name' ? order : false}
                                        >
                                            <TableSortLabel
                                                active={orderBy === 'name'}
                                                direction={orderBy === 'name' ? order : 'asc'}
                                                onClick={createSortHandler('name')}
                                                sx={{
                                                    '& .MuiTableSortLabel-icon': {
                                                        color: '#999999 !important',
                                                    },
                                                }}
                                            >
                                                <Typography sx={{ color: '#FFFFFF' }} variant="body2">
                                                    Title
                                                </Typography>
                                                {orderBy === 'name' ? (
                                                    <Box component="span" sx={visuallyHidden} >
                                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                    </Box>
                                                ) : null}
                                            </TableSortLabel>

                                        </TableCell>
                                        {width > 800 &&

                                            <TableCell
                                                key={'album'}
                                                align={'left'}
                                                sx={{ color: '#FFFFFF', bgcolor: '#16191a', borderBottom: 'none', minWidth: '5%' }} sortDirection={orderBy === 'album' ? order : false}
                                            >

                                                <Typography sx={{ color: '#FFFFFF' }} variant="body2">
                                                    Album
                                                </Typography>


                                            </TableCell>
                                        }
                                        {width > 1400 &&

                                            <TableCell
                                                key={'added_at'}
                                                align={'left'}
                                                sx={{ color: '#FFFFFF', bgcolor: '#16191a', borderBottom: 'none', minWidth: '5%' }} sortDirection={orderBy === 'added_at' ? order : false}
                                            >

                                                <Typography sx={{ color: '#FFFFFF' }} variant="body2">
                                                    Date Released
                                                </Typography>

                                            </TableCell>
                                        }
                                        {width > 1000 &&

                                            <TableCell
                                                key={'duration_ms'}
                                                align={'left'}
                                                sx={{ color: '#FFFFFF', bgcolor: '#16191a', borderBottom: 'none', minWidth: '5%' }} sortDirection={orderBy === 'duration_ms' ? order : false}
                                            >
                                                <TableSortLabel
                                                    active={orderBy === 'duration_ms'}
                                                    direction={orderBy === 'duration_ms' ? order : 'asc'}
                                                    onClick={createSortHandler('duration_ms')}
                                                    sx={{
                                                        '& .MuiTableSortLabel-icon': {
                                                            color: '#999999 !important',
                                                        },
                                                    }}                                    >
                                                    <Typography sx={{ color: '#FFFFFF' }} variant="body2">
                                                        Duration
                                                    </Typography>
                                                    {orderBy === 'duration_ms' ? (
                                                        <Box component="span" sx={visuallyHidden} >
                                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                        </Box>
                                                    ) : null}
                                                </TableSortLabel>
                                            </TableCell>
                                        }
                                        {width > 700 &&
                                            <TableCell
                                                key={'liked'}
                                                align={'right'}
                                                sx={{ bgcolor: '#16191a', borderBottom: 'none', width: '5%' }}>
                                                <Typography sx={{ color: '#FFFFFF' }} variant="body2">
                                                </Typography>
                                            </TableCell>
                                        }
                                        <TableCell
                                            key={'more'}
                                            align={'right'}
                                            sx={{ bgcolor: '#16191a', borderBottom: 'none', width: '5%' }}>
                                            <Typography sx={{ color: '#FFFFFF' }} variant="body2">
                                                More
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {visibleRows?.map((item, index) => {
                                        const actIndex = getIndex(item?.id);

                                        return (
                                            <TableRow sx={{
                                                ':hover': {
                                                    bgcolor: '#272c2e',
                                                    transition: '0.25s',
                                                    cursor: 'pointer',
                                                },
                                            }} tabIndex={-1} key={index} onMouseOver={() => { setIsHoveringArr(true, index) }} onMouseOut={() => { setIsHoveringArr(false, index) }} >
                                                <TableCell align={'center'} sx={{ borderBottom: 'none', width: '5%' }} >
                                                    {width > 700 ? (
                                                        <div>
                                                            {hovering[index] ? (
                                                                <div>
                                                                    {(playingArr[actIndex] && trackID == item?.id) ?
                                                                        (<IconButton sx={{ color: '#999999' }} onClick={() => { setPlaying(false); setIsPlayingArr(false, rowsLocal?.items?.length, actIndex) }}>
                                                                            <PauseIcon sx={{ color: '#999999' }} />
                                                                        </IconButton>
                                                                        ) :
                                                                        (<IconButton sx={{ color: '#999999' }} onClick={() => { setPlaying(true); setRows(rowsLocal); setTrackID(item?.id); setType('album'); updateGlobalMedia(albumMedia); setIsPlayingArr(true, rowsLocal?.items?.length, actIndex); setIndex(actIndex); }}>
                                                                            <PlayArrowIcon sx={{ color: '#999999' }} />
                                                                        </IconButton >)}
                                                                </div>) :
                                                                (<div>
                                                                    {(playingArr[actIndex] && trackID == item?.id) ? (<Animation />) : (<Typography sx={{ color: '#999999' }} variant="body2">
                                                                        {index + 1 + ((page - 1) * 50)}
                                                                    </Typography>)

                                                                    }
                                                                </div>
                                                                )}
                                                        </div>) : (<div>
                                                            {(playingArr[actIndex] && trackID == item.id) ?
                                                                (<IconButton sx={{ color: '#999999' }} onClick={() => { setPlaying(false); setIsPlayingArr(false, rowsLocal?.items?.length, actIndex) }}>
                                                                    <PauseIcon sx={{ color: '#999999' }} />
                                                                </IconButton>
                                                                ) :
                                                                (<IconButton sx={{ color: '#999999' }} onClick={() => { setPlaying(true); setRows(rowsLocal); setTrackID(item?.id); setType('album'); updateGlobalMedia(albumMedia); setIsPlayingArr(true, rowsLocal?.items?.length, actIndex); setIndex(actIndex); }}>
                                                                    <PlayArrowIcon sx={{ color: '#999999' }} />
                                                                </IconButton >)}
                                                        </div>)

                                                    }
                                                </TableCell>
                                                <TableCell sx={{ borderBottom: 'none', width: '35%' }} onClick={() => { handleClickOpen(item) }}>
                                                    <Card elevation={0} sx={{ display: 'flex', bgcolor: 'transparent', width: '100%', padding: 0, }}>
                                                        <CardMedia component="img" sx={{ margin: 'auto', display: 'block', width: '50px', borderRadius: '4px' }}
                                                            image={albumMedia}
                                                        />
                                                        <CardContent sx={{ flex: '1 0 auto' }} >
                                                            <Typography sx={{ color: '#FFFFFF' }} variant="body2">
                                                                {item.name}
                                                            </Typography>
                                                            <Typography sx={{ color: '#999999' }} variant="body2">
                                                                <Stack direction="row" alignItems="center">
                                                                    {item.explicit ?
                                                                        (
                                                                            <ExplicitIcon fontSize={'small'} sx={{ color: '#999999', mr: '5px' }} />

                                                                        ) :
                                                                        (
                                                                            <div></div>
                                                                        )}
                                                                    {item.artists.map((artist, index) => (index ? ', ' : '') + artist.name)}
                                                                </Stack>
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                </TableCell>
                                                {width > 800 &&

                                                    <TableCell sx={{ borderBottom: 'none', width: '35%' }} onClick={() => { handleClickOpen(item) }}>
                                                        <Typography sx={{ color: '#999999' }} variant="body2">
                                                            {playlistName}
                                                        </Typography>
                                                    </TableCell>
                                                }
                                                {width > 1400 &&

                                                    <TableCell sx={{ borderBottom: 'none', width: '15%' }} onClick={() => { handleClickOpen(item) }}>
                                                        <Typography sx={{ color: '#999999' }} variant="body2">
                                                            {moment(albumDateAdded).fromNow()}
                                                        </Typography>
                                                    </TableCell>
                                                }
                                                {width > 1000 &&

                                                    <TableCell sx={{ borderBottom: 'none', width: '5%' }} onClick={() => { handleClickOpen(item) }}>
                                                        <Typography sx={{ color: '#999999' }} variant="body2">
                                                            {msToTime(item.duration_ms)}
                                                        </Typography>
                                                    </TableCell>
                                                }
                                                {width > 700 &&
                                                    <TableCell align={'right'} sx={{ borderBottom: 'none', width: '5%' }} >
                                                        {liked[actIndex] ? (
                                                            <IconButton sx={{ color: '#999999' }} onClick={(event) => { toggleLiked(liked[actIndex], item.id, actIndex); }}>
                                                                <FavoriteIcon sx={{ color: '#71c1e3' }} />
                                                            </IconButton>) : (<div>
                                                                {hovering[index] ? (
                                                                    <IconButton sx={{ color: '#999999' }} onClick={(event) => { toggleLiked(liked[actIndex], item.id, actIndex); }}>
                                                                        {liked[actIndex] ? (<FavoriteIcon sx={{ color: '#71c1e3' }} />) : (<FavoriteBorderIcon sx={{ color: '#999999' }} />
                                                                        )}
                                                                    </IconButton>
                                                                ) : (<Box></Box>)}
                                                            </div>)}
                                                    </TableCell>
                                                }
                                                <TableCell align={'right'} sx={{ borderBottom: 'none', width: '5%' }} >
                                                    <IconButton sx={{ color: '#999999' }} onClick={(event) => { openMenu(event, item, actIndex) }}>
                                                        <MoreHorizIcon sx={{ color: '#999999' }} />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}

                                    <Menu
                                        sx={{
                                            "& .MuiPaper-root": {
                                                backgroundColor: '#16191a'
                                            },

                                        }}
                                        id="basic-menu"
                                        anchorEl={openMore}
                                        open={anchorMenu}
                                        onClose={closeMenu}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem sx={{
                                            color: '#999999', ':hover': {
                                                bgcolor: '#272c2e',
                                                transition: '0.25s',
                                                cursor: 'pointer'
                                            },
                                        }} component={Link} to={'/Recommendations?id=' + menuItem?.id} >
                                            <ListItemIcon >
                                                <ThumbUpIcon sx={{ color: '#999999' }} />
                                            </ListItemIcon>
                                            <ListItemText>Get Recommendations</ListItemText>
                                        </MenuItem>
                                        {width <= 700 &&
                                            <MenuItem sx={{
                                                color: '#999999', ':hover': {
                                                    bgcolor: '#272c2e',
                                                    transition: '0.25s',
                                                    cursor: 'pointer'
                                                },
                                            }}
                                                onClick={() => { toggleLiked(liked[itemIndex], menuItem?.id, itemIndex) }}>
                                                <ListItemIcon >
                                                    {liked[itemIndex] ? (
                                                        <FavoriteIcon sx={{ color: '#71c1e3' }} />
                                                    ) : (<FavoriteBorderIcon sx={{ color: '#999999' }} />)}
                                                </ListItemIcon>
                                                {liked[itemIndex] ? (

                                                    <ListItemText>Remove Track</ListItemText>
                                                ) : (<ListItemText>Like Track</ListItemText>
                                                )}
                                            </MenuItem>
                                        }
                                        <MenuItem sx={{
                                            color: '#999999', ':hover': {
                                                bgcolor: '#272c2e',
                                                transition: '0.25s',
                                                cursor: 'pointer'
                                            },
                                        }} component={Link} to={menuItem?.external_urls?.spotify} >
                                            <ListItemIcon >
                                                <LaunchIcon sx={{ color: '#999999' }} />
                                            </ListItemIcon>
                                            <ListItemText>Listen on Spotify</ListItemText>
                                        </MenuItem>
                                        <Divider sx={{ my: 0.5, bgcolor: '#999999' }} />

                                        <MenuItem sx={{
                                            color: '#999999', ':hover': {
                                                bgcolor: '#272c2e',
                                                transition: '0.25s',
                                                cursor: 'pointer'
                                            },
                                        }} onClick={artistsOpenMenu} >
                                            <ListItemIcon >
                                                <ExpandMoreIcon sx={{ color: '#999999' }} />
                                            </ListItemIcon>
                                            <ListItemText>Artists</ListItemText>
                                        </MenuItem>


                                    </Menu>
                                    <Menu
                                        sx={{
                                            "& .MuiPaper-root": {
                                                backgroundColor: '#16191a'
                                            },

                                        }}
                                        id="basic-menu"
                                        anchorEl={artistsOpenMore}
                                        open={artistsAnchorMenu}
                                        onClose={closeMenu}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >

                                        {menuItem?.artists?.map((artist) => {
                                            return (<MenuItem sx={{
                                                color: '#999999', ':hover': {
                                                    bgcolor: '#272c2e',
                                                    transition: '0.25s',
                                                    cursor: 'pointer'
                                                },
                                            }} component={Link} to={'/Artist?id=' + artist.id}
                                                onClick={() => { closeMenu(); updateDisplayed('Artists'); updateSelectedPlaylist(artist?.id, artist?.name, '', ''); }}><ListItemIcon >
                                                    <OpenInFullIcon sx={{ color: '#999999' }} />
                                                </ListItemIcon>
                                                <ListItemText>{artist.name + "'s Top Songs"}</ListItemText></MenuItem>)

                                        })}
                                    </Menu>
                                    <Menu
                                        sx={{
                                            "& .MuiPaper-root": {
                                                backgroundColor: '#16191a'
                                            },

                                        }}
                                        id="basic-menu"
                                        anchorEl={openFilter}
                                        open={anchorFilterMenu}
                                        onClose={closeFilter}
                                        MenuListProps={{
                                            'aria-labelledby': 'basic-button',
                                        }}
                                    >
                                        <MenuItem sx={{
                                            color: '#999999', ':hover': {
                                                bgcolor: '#272c2e',
                                                transition: '0.25s',
                                                cursor: 'pointer'
                                            },
                                        }} onClick={createSortHandler('name')}
                                        >
                                            <TableSortLabel
                                                active={orderBy === 'name'}
                                                direction={orderBy === 'name' ? order : 'asc'}
                                                onClick={createSortHandler('name')}
                                                sx={{
                                                    '& .MuiTableSortLabel-icon': {
                                                        color: '#999999 !important',
                                                    },
                                                }}
                                            >
                                                <ListItemText sx={{ color: '#999999' }}>Title</ListItemText>

                                                {orderBy === 'name' ? (
                                                    <Box component="span" sx={visuallyHidden} >
                                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                    </Box>
                                                ) : null}
                                            </TableSortLabel>
                                        </MenuItem>
                                        <MenuItem sx={{
                                            color: '#999999', ':hover': {
                                                bgcolor: '#272c2e',
                                                transition: '0.25s',
                                                cursor: 'pointer'
                                            },
                                        }} onClick={createSortHandler('artist')}
                                        >
                                            <TableSortLabel
                                                active={orderBy === 'artist'}
                                                direction={orderBy === 'artist' ? order : 'asc'}
                                                sx={{
                                                    '& .MuiTableSortLabel-icon': {
                                                        color: '#999999 !important',
                                                    },
                                                }}
                                            >
                                                <ListItemText sx={{ color: '#999999' }}>Artist</ListItemText>

                                                {orderBy === 'artist' ? (
                                                    <Box component="span" sx={visuallyHidden} >
                                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                    </Box>
                                                ) : null}
                                            </TableSortLabel>
                                        </MenuItem>

                                        <MenuItem sx={{
                                            color: '#999999', ':hover': {
                                                bgcolor: '#272c2e',
                                                transition: '0.25s',
                                                cursor: 'pointer'
                                            },
                                        }} onClick={createSortHandler('duration_ms')}
                                        >
                                            <TableSortLabel
                                                active={orderBy === 'duration_ms'}
                                                direction={orderBy === 'duration_ms' ? order : 'asc'}
                                                sx={{
                                                    '& .MuiTableSortLabel-icon': {
                                                        color: '#999999 !important',
                                                    },
                                                }}                                    >
                                                <ListItemText sx={{ color: '#999999' }}>Duration</ListItemText>

                                                {orderBy === 'duration_ms' ? (
                                                    <Box component="span" sx={visuallyHidden} >
                                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                    </Box>
                                                ) : null}
                                            </TableSortLabel>
                                        </MenuItem>

                                        <MenuItem sx={{
                                            color: '#999999', ':hover': {
                                                bgcolor: '#272c2e',
                                                transition: '0.25s',
                                                cursor: 'pointer'
                                            },
                                        }} onClick={createSortHandler('explicit')}
                                        >
                                            <TableSortLabel
                                                active={orderBy === 'explicit'}
                                                direction={orderBy === 'explicit' ? order : 'asc'}
                                                sx={{
                                                    '& .MuiTableSortLabel-icon': {
                                                        color: '#999999 !important',
                                                    },
                                                }}                                    >
                                                <ListItemText sx={{ color: '#999999' }}>Explicit</ListItemText>

                                                {orderBy === 'explicit' ? (
                                                    <Box component="span" sx={visuallyHidden} >
                                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                    </Box>
                                                ) : null}
                                            </TableSortLabel>
                                        </MenuItem>

                                    </Menu>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Grid container justifyContent="center">
                            <Pagination sx={{
                                "& .MuiPaginationItem-root": {
                                    color: "#999999",
                                    '&.Mui-selected': {
                                        background: '#71c1e3',
                                        color: 'black',
                                        // borderRadius: '50%',
                                    },
                                },
                                float: 'center'
                            }} count={Math.ceil(rowsLocal.total / 50)} page={page} onChange={changePage} />
                        </Grid>


                    </Box>
                    <AnalysisDialog track={track} features={features} analysis={analysis} open={open} handleClose={handleClose} copyToClipBoard={copyToClipBoard} />
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
                    {loading && <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={loading}
                    >
                        <CircularProgress sx={{ color: '#71c1e3' }} />
                    </Backdrop>
                    }
                </Card >

            )
            };
        </Box>

    );
}