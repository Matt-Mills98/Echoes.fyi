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
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { Link } from "react-router-dom";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Animation from '../PlayingAnimation/animation';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import LaunchIcon from '@mui/icons-material/Launch';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import AlbumIcon from '@mui/icons-material/Album';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GetWindowDimensions from '../WindowDimensions/WindowDimensions';
import FilterListIcon from '@mui/icons-material/FilterList';
import Toolbar from '@mui/material/Toolbar';
import Tooltips from '@mui/material/Tooltip';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import ExplicitIcon from '@mui/icons-material/Explicit';
import Stack from '@mui/material/Stack';
import AnalysisDialog from '../Profile/AnalysisDialog';
import refreshTokenFunc from '../SignIn/RefreshToken';
import checkAccessToken from '../SignIn/CheckAccessToken'
import AlertTitle from '@mui/material/AlertTitle';
import AnalyticsIcon from '@mui/icons-material/Analytics';

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
        const order = comparator(a[0]?.album, b[0]?.album);
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
        const order = comparator(a[0]?.album, b[0]?.album);
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
export default function StickyHeadTable(props) {
    const { height, width } = GetWindowDimensions();

    const { aT, id, totalParams, auto, setRows, rows, initPlayingArr, playingArr, setIsPlayingArr, setIndex, setType, setTrackID, trackID } = props;
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('');
    const [rowsLocal, setRowsLocal] = React.useState([]);
    const [liked, setLiked] = React.useState([]);

    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const [open, setOpen] = React.useState(false);
    const [openFilter, setOpenFilter] = React.useState(null);
    const anchorFilterMenu = Boolean(openFilter);
    const [track, setTrack] = React.useState([]);
    const [analysis, setAnalysis] = React.useState([]);
    const [features, setFeatures] = React.useState([]);
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [snackbarMessage, setSnackbarMessage] = React.useState('');
    const [openMore, setOpenMore] = React.useState(null);
    const [menuItem, setMenuItem] = React.useState([]);
    const [itemIndex, setItemIndex] = React.useState('');
    const [artistsOpenMore, setArtistsOpenMore] = React.useState(null);
    const anchorMenu = Boolean(openMore);
    const artistsAnchorMenu = Boolean(artistsOpenMore);

    const [loading, setLoading] = React.useState(false);
    const [playing, setPlaying] = React.useState(false);
    const [hovering, setHovering] = React.useState([]);

    React.useEffect(() => { getFollowedSongs() }, [totalParams, auto]);
    React.useEffect(() => { checkLikedSongs() }, [rowsLocal]);


    const checkLikedSongs = async () => {
        if (!checkAccessToken()) {

            let ids = '';
            rowsLocal?.tracks?.map((track) => { ids = ids + track.id + '%2C' });
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
    const getFollowedSongs = async () => {
        if (!checkAccessToken()) {

            setLoading(true);

            auto ? (
                await fetch("https://api.spotify.com/v1/recommendations?seed_tracks=" + id + "&limit=50" + totalParams, {
                    method: "GET", headers: { Authorization: `Bearer ${aT}` }
                })
                    .then(async (result) => {
                        if (result.ok) {
                            const json = await result.json();
                            setRowsLocal(json);
                            setRowsLocal(json);
                            if (playingArr == []) { initPlayingArr(json.items?.length); }
                            initHoveringArr(json.items?.length);

                        }
                        else {
                            setError(true);
                            setErrorMessage('Failed to retrieve recommendations');
                            setRowsLocal([]);
                        }
                    })) : (
                totalParams != '' ? (
                    await fetch("https://api.spotify.com/v1/recommendations?&limit=50" + totalParams, {
                        method: "GET", headers: { Authorization: `Bearer ${aT}` }
                    })
                        .then(async (result) => {
                            if (result.ok) {
                                const json = await result.json();
                                setRowsLocal(json);
                                initPlayingArr(json.items?.length);
                                initHoveringArr(json.items?.length);

                            }
                            else {
                                setError(true);
                                setErrorMessage('Failed to retrieve recommendations');
                                setRowsLocal([]);
                            }
                        })) : (console.log('')))

            setLoading(false);
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
                            let el = liked.map((item, i) => {
                                if (index === i) { item = !localLiked } return item
                            });
                            setLiked(el);
                            setOpenSnackbar(true);
                            setSnackbarMessage('Added to Liked Songs');
                        }
                        else {
                            setOpenSnackbar(true);
                            setSnackbarMessage('Error: Failed to remove from liked songs');

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
        rowsLocal.tracks.map((item, index) => {
            if (id == item.id) {
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

        () => orderBy == 'release_date' ? (stableSortAdded(rowsLocal?.tracks, getComparator(order, orderBy))
        ) : (orderBy == 'album' ? (stableSortAlbum(rowsLocal?.tracks, getComparator(order, 'name'))
        ) : (orderBy == 'artist' ? (stableSortArtist(rowsLocal?.tracks, getComparator(order, 'name'))
        ) : (stableSort(rowsLocal?.tracks, getComparator(order, orderBy))
        )
        )
        )
        ,
        [order, orderBy, rowsLocal],
    );
    const openMenu = (event, item, index) => {
        setOpenMore(event.currentTarget);
        setMenuItem(item);
        setItemIndex(index);

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
        if (codestring != '') {
            navigator.clipboard.writeText(codestring);
            setOpenSnackbar(true);
            setSnackbarMessage('Copied to Clipboard!');
        }
        else {
            setOpenSnackbar(true);
            setSnackbarMessage('Code String could not be found');
        }
    }


    const handleClickOpen = (event, item, actIndex, trackLocal) => {
        if (width > 700) {
            openAnalysis(trackLocal);
        }
        else {
            openMenu(event, item, actIndex)
        }
    };

    const openAnalysis = async (trackLocal) => {
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
    }

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
                                Similar Songs
                            </Typography>
                            <Tooltips title="Filter list">
                                <IconButton>
                                    <FilterListIcon sx={{ color: '#71c1e3' }} onClick={(event) => { openFilterMenu(event) }} />
                                </IconButton>
                            </Tooltips>
                        </Toolbar>                
                        <Box sx={{ overflow: "auto" }}>
                            <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
                                <TableContainer sx={{
                                    maxWidth: '95vw',

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
                                        bgcolor: '#16191a', display: 'block',
                                        '& .MuiTableCell-sizeSmall': {
                                            pt: '0px', pb: '0px', margin: '0px'
                                        },
                                    }}>
                                        <TableHead >
                                            <TableRow >
                                                <TableCell
                                                    key={'index'}
                                                    align={'center'}

                                                    sx={{ bgcolor: '#16191a', borderBottom: 'none', width: '5%', }}>
                                                    <Typography sx={{ color: '#FFFFFF' }} variant="body2">
                                                        #
                                                    </Typography>
                                                </TableCell>

                                                <TableCell
                                                    key={'name'}
                                                    align={'left'}
                                                    sx={{ color: '#FFFFFF', bgcolor: '#16191a', borderBottom: 'none', minWidth: '35%' }} sortDirection={orderBy === 'name' ? order : false}
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
                                                        sx={{ color: '#FFFFFF', bgcolor: '#16191a', borderBottom: 'none', minWidth: '35%' }} sortDirection={orderBy === 'album' ? order : false}
                                                    >
                                                        <TableSortLabel
                                                            active={orderBy === 'album'}
                                                            direction={orderBy === 'album' ? order : 'asc'}
                                                            onClick={createSortHandler('album')}
                                                            sx={{
                                                                '& .MuiTableSortLabel-icon': {
                                                                    color: '#999999 !important',
                                                                },
                                                            }}                                    >
                                                            <Typography sx={{ color: '#FFFFFF' }} variant="body2">
                                                                Album
                                                            </Typography>
                                                            {orderBy === 'album' ? (
                                                                <Box component="span" sx={visuallyHidden} >
                                                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                                </Box>
                                                            ) : null}
                                                        </TableSortLabel>

                                                    </TableCell>
                                                }
                                                {width > 1400 &&
                                                    <TableCell
                                                        key={'release_date'}
                                                        align={'left'}
                                                        sx={{ color: '#FFFFFF', bgcolor: '#16191a', borderBottom: 'none', minWidth: '10%' }} sortDirection={orderBy === 'release_date' ? order : false}
                                                    >
                                                        <TableSortLabel
                                                            active={orderBy === 'release_date'}
                                                            direction={orderBy === 'release_date' ? order : 'asc'}
                                                            onClick={createSortHandler('release_date')}
                                                            sx={{
                                                                '& .MuiTableSortLabel-icon': {
                                                                    color: '#999999 !important',
                                                                },
                                                            }}                                    >
                                                            <Typography sx={{ color: '#FFFFFF' }} variant="body2">
                                                                Date Added
                                                            </Typography>
                                                            {orderBy === 'release_date' ? (
                                                                <Box component="span" sx={visuallyHidden} >
                                                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                                </Box>
                                                            ) : null}
                                                        </TableSortLabel>

                                                    </TableCell>}

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
                                                {width > 700 &&

                                                    <TableCell
                                                        key={'more'}
                                                        align={'right'}
                                                        sx={{ bgcolor: '#16191a', borderBottom: 'none', width: '5%' }}>
                                                        <Typography sx={{ color: '#FFFFFF' }} variant="body2">
                                                            More
                                                        </Typography>
                                                    </TableCell>
                                                }
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
                                                                            {(playingArr[actIndex] && trackID == item.id) ?
                                                                                (<IconButton sx={{ color: '#999999' }} onClick={() => { setPlaying(false); setIsPlayingArr(false, rowsLocal?.tracks?.length, actIndex) }}>
                                                                                    <PauseIcon sx={{ color: '#999999' }} />
                                                                                </IconButton>
                                                                                ) :
                                                                                (<IconButton sx={{ color: '#999999' }} onClick={() => { setPlaying(true); setRows(rowsLocal); setTrackID(item.id); setType('recommend'); setIsPlayingArr(true, rowsLocal?.tracks?.length, getIndex(item?.id)); setIndex(getIndex(item?.id)); }}>
                                                                                    <PlayArrowIcon sx={{ color: '#999999' }} />
                                                                                </IconButton >)}
                                                                        </div>) :
                                                                        (<div>
                                                                            {(playingArr[actIndex] && trackID == item.id) ? (<Animation />) : (<Typography sx={{ color: '#999999' }} variant="body2">
                                                                                {index + 1}
                                                                            </Typography>)

                                                                            }
                                                                        </div>
                                                                        )}
                                                                </div>

                                                            ) : (<div>
                                                                {(playingArr[actIndex] && trackID == item.id) ?
                                                                    (<IconButton sx={{ color: '#999999' }} onClick={() => { setPlaying(false); setIsPlayingArr(false, rowsLocal?.tracks?.length, actIndex) }}>
                                                                        <PauseIcon sx={{ color: '#999999' }} />
                                                                    </IconButton>
                                                                    ) :
                                                                    (<IconButton sx={{ color: '#999999' }} onClick={() => { setPlaying(true); setRows(rowsLocal); setTrackID(item.id); setType('recommend'); setIsPlayingArr(true, rowsLocal?.tracks?.length, getIndex(item?.id)); setIndex(getIndex(item?.id)); }}>
                                                                        <PlayArrowIcon sx={{ color: '#999999' }} />
                                                                    </IconButton >)}
                                                            </div>)
                                                            }
                                                        </TableCell>


                                                        <TableCell sx={{
                                                            borderBottom: 'none', maxWidth:'40vw', whiteSpace: "nowrap",
                                                            textOverflow: "ellipsis",
                                                        }} onClick={(event) => { handleClickOpen(event, item, actIndex, item) }}>
                                                            <Stack sx={{ m: '0px', p: '0px' }} direction="row" alignItems="center">

                                                                <CardMedia component="img" sx={{ p: '0px', m: '10px', ml: '0px', display: 'block', width: '40px', height: '40px', borderRadius: '2px' }}
                                                                    image={item.album.images[1].url}
                                                                />
                                                                <Stack sx={{
                                                                    m: '0px', p: '0px',
                                                                    overflow: "hidden",
                                                                    "& .MuiCardContent-content": {
                                                                        overflow: "hidden"
                                                                    }
                                                                }} direction="column" alignItems="left" >
                                                                    <Typography noWrap sx={{ color: '#FFFFFF', fontSize: { xs: '14px', sm: '14px', md: '14px', lg: '14px', xl: '14px' } }} variant="body2">
                                                                        {item.name}
                                                                    </Typography>
                                                                    <Stack direction="row" alignItems="center">
                                                                        {item.explicit ?
                                                                            (
                                                                                <ExplicitIcon fontSize={'small'} sx={{ color: '#999999', mr: '5px' }} />

                                                                            ) :
                                                                            (
                                                                                <div></div>
                                                                            )}
                                                                        <Typography noWrap sx={{ color: '#999999', fontSize: { xs: '11px', sm: '12px', md: '13px', lg: '14px', xl: '14px' } }} variant="body2">

                                                                            {item.artists.map((artist, index) => (index ? ', ' : '') + artist.name)}
                                                                        </Typography>

                                                                    </Stack>
                                                                </Stack>
                                                            </Stack>
                                                        </TableCell>
                                                        {width > 800 &&

                                                            <TableCell sx={{
                                                                borderBottom: 'none', maxWidth:'20vw', whiteSpace: "nowrap",
                                                                textOverflow: "ellipsis",
                                                            }} onClick={(event) => { handleClickOpen(event, item, actIndex, item) }}>
                                                                <Typography noWrap sx={{ color: '#999999' }} variant="body2">
                                                                    {item.album.name}
                                                                </Typography>
                                                            </TableCell>
                                                        }
                                                        {width > 1400 &&
                                                            <TableCell sx={{ borderBottom: 'none', width: '15%' }} onClick={(event) => { handleClickOpen(event, item, actIndex, item) }}>
                                                                <Typography sx={{ color: '#999999' }} variant="body2">
                                                                    {moment(item.album?.release_date).fromNow()}
                                                                </Typography>
                                                            </TableCell>
                                                        }
                                                        {width > 1000 &&
                                                            <TableCell sx={{ borderBottom: 'none', width: '5%' }} onClick={(event) => { handleClickOpen(event, item, actIndex, item) }}>
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
                                                        {width > 700 &&

                                                            <TableCell align={'right'} sx={{ borderBottom: 'none', width: '5%' }} >
                                                                <IconButton sx={{ color: '#999999' }} onClick={(event) => { openMenu(event, item, actIndex); }}>
                                                                    <MoreHorizIcon sx={{ color: '#999999' }} />
                                                                </IconButton>
                                                            </TableCell>
                                                        }
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
                                                {width <= 700 &&

                                                    <MenuItem sx={{
                                                        color: '#999999', ':hover': {
                                                            bgcolor: '#272c2e',
                                                            transition: '0.25s',
                                                            cursor: 'pointer'
                                                        },
                                                    }} onClick={() => { closeMenu(); openAnalysis(menuItem); }} >
                                                        <ListItemIcon >
                                                            <AnalyticsIcon sx={{ color: '#999999' }} />
                                                        </ListItemIcon>
                                                        <ListItemText>Get Analysis</ListItemText>
                                                    </MenuItem>
                                                }
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
                                                }} component={Link} to={'/Album?id=' + menuItem?.album?.id + '&name=' + encodeURIComponent(menuItem?.album?.name) + '&date=' + encodeURIComponent(menuItem?.album?.release_date) + '&media=' + encodeURIComponent(menuItem?.album?.images[1].url)}
                                                    onClick={() => { closeMenu(); }}>
                                                    <ListItemIcon >
                                                        <AlbumIcon sx={{ color: '#999999' }} />
                                                    </ListItemIcon>
                                                    <ListItemText>Get Album</ListItemText>
                                                </MenuItem>
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

                                                {menuItem.artists?.map((artist) => {
                                                    return (<MenuItem sx={{
                                                        color: '#999999', ':hover': {
                                                            bgcolor: '#272c2e',
                                                            transition: '0.25s',
                                                            cursor: 'pointer'
                                                        },
                                                    }} component={Link} to={'/Artist?id=' + artist.id}
                                                        onClick={() => { closeMenu(); }}><ListItemIcon >
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
                                                }} onClick={createSortHandler('album')} >
                                                    <TableSortLabel
                                                        active={orderBy === 'album'}
                                                        direction={orderBy === 'album' ? order : 'asc'}

                                                        sx={{
                                                            '& .MuiTableSortLabel-icon': {
                                                                color: '#999999 !important',
                                                            },
                                                        }}                                    >
                                                        <ListItemText sx={{ color: '#999999' }}>Album</ListItemText>

                                                        {orderBy === 'album' ? (
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
                                                }} onClick={createSortHandler('release_date')}
                                                >
                                                    <TableSortLabel
                                                        active={orderBy === 'release_date'}
                                                        direction={orderBy === 'release_date' ? order : 'asc'}
                                                        sx={{
                                                            '& .MuiTableSortLabel-icon': {
                                                                color: '#999999 !important',
                                                            },
                                                        }}                                    >
                                                        <ListItemText sx={{ color: '#999999' }}>Date Added</ListItemText>

                                                        {orderBy === 'release_date' ? (
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
                                                }} onClick={createSortHandler('popularity')}
                                                >
                                                    <TableSortLabel
                                                        active={orderBy === 'popularity'}
                                                        direction={orderBy === 'popularity' ? order : 'asc'}
                                                        sx={{
                                                            '& .MuiTableSortLabel-icon': {
                                                                color: '#999999 !important',
                                                            },
                                                        }}                                    >
                                                        <ListItemText sx={{ color: '#999999' }}>Popularity</ListItemText>

                                                        {orderBy === 'popularity' ? (
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
                            {
                                loading && <Backdrop
                                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                                    open={loading}
                                >
                                    <CircularProgress sx={{ color: '#71c1e3' }} />
                                </Backdrop>
                            }
                        </Box></Box>

                </Card >
            )}
        </Box>
    );
}