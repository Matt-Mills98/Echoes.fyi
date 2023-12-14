import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { Link } from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import refreshTokenFunc from '../SignIn/RefreshToken';
import checkAccessToken from '../SignIn/CheckAccessToken'
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
export default function MultiActionAreaCard(props) {
    let { aT } = props;
    const { userID, setDisplayed, setSelectedPlaylist, setSelectedPlaylistName } = props;
    const accessToken = localStorage.getItem('accessToken');

    const [page, setPage] = React.useState(1);
    const [playlists, setPlaylists] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [category, setCategory] = React.useState('');

    const [open, setOpen] = React.useState(false);
    const [open1, setOpen1] = React.useState(false);

    const [total, setTotal] = React.useState(0);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    React.useEffect(() => { getCategories() }, []);
    React.useEffect(() => { getPlaylists() }, [category, page]);
    const getCategories = async () => {
        if (!checkAccessToken()) {
            await fetch("https://api.spotify.com/v1/browse/categories?limit=50", {
                method: "GET", headers: { Authorization: `Bearer ${aT}` }
            })
                .then(async (result) => {
                    if (result.ok) {
                        const json = await result.json();
                        setCategories(json);
                        console.log(json);
                    }
                    else {

                        setError(true);
                        setErrorMessage('Failed to retrieve Categories');
                        setCategories([]);
                    }
                });
        }
        else {
            refreshTokenFunc();
        }
    }
    const getPlaylists = async () => {
        if (!checkAccessToken()) {

            let cat = '';
            if (category == '') {
                cat = 'toplists';
            }
            else {
                cat = category;
            }
            let off = (page - 1) * 50;

            await fetch("https://api.spotify.com/v1/browse/categories/" + cat + "/playlists?limit=50&offset=" + off, {
                method: "GET", headers: { Authorization: `Bearer ${aT}` }
            })
                .then(async (result) => {
                    if (result.ok) {
                        const json = await result.json();
                        setPlaylists(json);
                        console.log(json);

                    }
                    else {
                        setError(true);
                        setErrorMessage('Failed to retrieve Playlists');
                        setPlaylists([]);
                    }
                });
        }
        else {
            aT = refreshTokenFunc();
        }
    }

    const redirectToProfile = async () => {
        //document.location.href = profile.external_urls.spotify;
    }
    const handleChange = (event) => {
        setCategory(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose1 = () => {
        setOpen1(false);
    };

    const handleOpen1 = () => {
        setOpen1(true);
    };
    const updateDisplayed = (type) => {
        setDisplayed(type);
    }
    const updateSelectedPlaylist = (id, name) => {
        setSelectedPlaylist(id);
        setSelectedPlaylistName(name);
    }
    const changePage = (event, value) => {
        setPage(value)
    }
    return (
        <Box>
            {error ? (<Alert severity="error" variant="outlined">
                <AlertTitle>Error</AlertTitle>
                {errorMessage}
            </Alert>
            ) : (
                <Box>
                    <Box sx={{ display: { xs: 'none', md: 'none', lg: 'flex', xl: 'flex' } }}>
                        <Card sx={{ minWidth: '100%', bgcolor: '#16191a' }}>
                            <CardContent sx={{ margin: '15px', padding: '0px' }}>
                                <Stack direction="row" spacing={1} justifyContent='space-between'>
                                    <Grid container direction="row" alignItems="center">
                                        <Typography sx={{ color: '#71c1e3' }} gutterBottom variant="h6" component="div">
                                            By Genre
                                        </Typography>
                                    </Grid>
                                    <Stack direction="row" justifyContent={"flex-end"} spacing={1}>

                                        <Select
                                            MenuProps={{
                                                disableScrollLock: true,

                                                sx: {
                                                    "& .MuiPaper-root": {
                                                        backgroundColor: '#16191a'
                                                    }, overflow: 'auto', scrollbarWidth: "none" /* Firefox */,
                                                    "& ::-webkit-scrollbar": {
                                                        display: "none"
                                                    }

                                                }
                                            }}
                                            sx={{ width: '0px', height: '0px', visibility: 'hidden' }}
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            open={open}
                                            onClose={handleClose}
                                            onOpen={handleOpen}
                                            value={category}
                                            label="Category"
                                            onChange={handleChange}
                                        >
                                            {categories?.categories?.items?.map((cat) =>
                                                <MenuItem value={cat.id} sx={{
                                                    color: '#999999', ':hover': {
                                                        bgcolor: '#272c2e',
                                                        transition: '0.25s',
                                                        cursor: 'pointer'
                                                    },
                                                }}>
                                                    {cat?.name}
                                                </MenuItem>
                                            )}

                                        </Select>
                                        <IconButton size="large" onClick={handleOpen} >
                                            <MoreVertIcon sx={{ color: '#71c1e3' }} />
                                        </IconButton>

                                    </Stack>
                                </Stack>

                                <Box sx={{
                                    maxHeight: '33vh', overflow: 'auto',
                                    scrollbarWidth: "none" /* Firefox */,
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
                                    {playlists.playlists?.items?.map((item) =>

                                        <Box>
                                            {item?.name != null &&

                                                <Stack direction="row" alignItems="center" component={Link} to={'?&type=Playlists&id=' + item?.id + '&name=' + item?.name}
                                                    onClick={() => { updateDisplayed('Playlists'); updateSelectedPlaylist(item?.id, item?.name); }} elevation={0} sx={{
                                                        display: 'flex', borderRadius: '4px', bgcolor: '#16191a', width: '100%', textDecoration: 'none', whiteSpace: "nowrap",
                                                        textOverflow: "ellipsis",
                                                        ':hover': {
                                                            bgcolor: '#272c2e',
                                                            transition: '.3s',
                                                            cursor: 'pointer',
                                                        },
                                                    }}>
                                                    <CardMedia component="img" sx={{ p: '10px', m: '5px', ml: '0px', display: 'block', width: '45px', height: '45px' }}
                                                        image={item?.images[0].url}
                                                    />
                                                    <Stack sx={{
                                                        m: '0px', p: '0px',
                                                        overflow: "hidden",
                                                        "& .MuiCardContent-content": {
                                                            overflow: "hidden"
                                                        }
                                                    }} direction="column" alignItems="left" >

                                                        <Typography noWrap sx={{ color: '#FFFFFF', fontSize: { xs: '14px', sm: '14px', md: '14px', lg: '14px', xl: '14px' } }} variant="body2">
                                                            {item?.name}
                                                        </Typography>
                                                        <Stack sx={{ m: '0px', p: '0px' }} direction="row" alignItems="center">


                                                            <Typography noWrap sx={{ color: '#999999', fontSize: { xs: '11px', sm: '12px', md: '13px', lg: '14px', xl: '14px' } }} variant="body2">

                                                                {item?.owner?.display_name}
                                                            </Typography>

                                                        </Stack>

                                                    </Stack>
                                                </Stack>
                                            }
                                        </Box>
                                    )}
                                </Box>
                                <Grid container justifyContent="center">
                                    <Pagination sx={{
                                        "& .MuiPaginationItem-root": {
                                            color: "#999999",
                                            '&.Mui-selected': {
                                                backgroundColor: '#71c1e3',
                                                color: 'black',
                                                // borderRadius: '50%',
                                            },
                                        },
                                        float: 'center'
                                    }} size={'small'} count={Math.ceil(playlists?.playlists?.total / 50)} page={page} onChange={changePage} siblingCount={0} />
                                </Grid>
                            </CardContent>


                        </Card>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'flex', lg: 'none', xl: 'none' } }}>
                        <div>
                            {playlists?.playlists != [] &&
                                <CardContent sx={{ marginRight: '0px', padding: '0px' }}>
                                    <Stack direction="row" spacing={1} justifyContent='space-between'>
                                        <Grid container direction="row" alignItems="center">
                                            <Typography sx={{ color: '#71c1e3' }} gutterBottom variant="h6" component="div">
                                                By Genre
                                            </Typography>
                                        </Grid>
                                        <Stack direction="row" justifyContent={"flex-end"} spacing={1}>
                                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">

                                                <Select
                                                    MenuProps={{
                                                        disableScrollLock: true,

                                                        sx: {
                                                            "& .MuiPaper-root": {
                                                                backgroundColor: '#16191a'
                                                            }, overflow: 'auto', scrollbarWidth: "none" /* Firefox */,
                                                            "& ::-webkit-scrollbar": {
                                                                display: "none"
                                                            }

                                                        }
                                                    }}
                                                    sx={{ width: '0px', height: '0px', visibility: 'hidden' }}
                                                    labelId="demo-controlled-open-select-label"
                                                    id="demo-controlled-open-select"
                                                    open={open1}
                                                    onClose={handleClose1}
                                                    onOpen={handleOpen1}
                                                    value={category}
                                                    label="Category"
                                                    onChange={handleChange}
                                                >
                                                    {categories?.categories?.items?.map((cat) =>
                                                        <MenuItem value={cat.id} sx={{
                                                            color: '#999999', ':hover': {
                                                                bgcolor: '#272c2e',
                                                                transition: '0.25s',
                                                                cursor: 'pointer'
                                                            },
                                                        }}>
                                                            {cat?.name}
                                                        </MenuItem>
                                                    )}
                                                </Select>
                                            </FormControl>
                                            <IconButton size="large" onClick={handleOpen} >
                                                <MoreVertIcon sx={{ color: '#71c1e3' }} />
                                            </IconButton>
                                        </Stack>
                                    </Stack>
                                    <Box sx={{
                                        maxHeight: '40vh', maxWidth: '92vw'
                                    }}>
                                        <Box sx={{
                                            maxHeight: '40vh', maxWidth: '100%', overflow: 'auto' /* Firefox */,
                                            "&::-webkit-scrollbar": {
                                                height: '10px',
                                                backgroundColor: '#0f0f0f',
                                                display: 'inline-block',
                                                textAlign: 'center',
                                                ':hover': {
                                                    cursor: 'pointer'
                                                }
                                            },
                                            "&::-webkit-scrollbar-thumb": {
                                                backgroundColor: '#272c2e',
                                                borderRadius: '4px',
                                                height: '10px',
                                                ':hover': {
                                                    cursor: 'pointer'
                                                }
                                            },
                                            userSelect: 'none'
                                        }}>
                                            <Grid container
                                                spacing={2}
                                                direction="row"
                                                alignItems="left"
                                                justifyContent="left"
                                                wrap='nowrap'
                                                sx={{}}>
                                                {playlists.playlists?.items?.map((item) =>

                                                    < Grid item xs={12} >
                                                        <Box>
                                                            {item?.name != null &&
                                                                <Card component={Link} to={'?&type=Playlists&id=' + item?.id + '&name=' + item?.name}
                                                                    onClick={() => { updateDisplayed('Playlists'); updateSelectedPlaylist(item?.id, item?.name); }} elevation={0} sx={{
                                                                        display: 'flex', bgcolor: '#16191a', paddingTop: '15px', paddingRight: '15px', paddingLeft: '15px', textDecoration: 'none', marginBottom: '20px', maxWidth: '100px',
                                                                        ':hover': {
                                                                            bgcolor: '#272c2e',
                                                                            transition: '.3s',
                                                                            cursor: 'pointer'
                                                                        },
                                                                    }}>
                                                                    <Grid>
                                                                        <CardMedia
                                                                            component="img"

                                                                            sx={{
                                                                                width: '100px', height: '100px'
                                                                            }}
                                                                            image={item?.images[0]?.url ? (item?.images[0]?.url) : ('./Spotify_Icon_RGB_Green.png')}
                                                                        />
                                                                        <CardContent sx={{
                                                                            marginLeft: '0px',
                                                                            paddingLeft: '0px',
                                                                            maxWidth: '100px',
                                                                            overflow: "hidden",
                                                                            "& .MuiCardContent-content": {
                                                                                overflow: "hidden"
                                                                            }
                                                                        }}>
                                                                            <Typography noWrap sx={{
                                                                                color: '#FFFFFF',
                                                                            }} variant="body2">
                                                                                {item?.name}
                                                                            </Typography>
                                                                            <Typography noWrap sx={{ color: '#999999' }} variant="body2">
                                                                                {item?.owner?.display_name}
                                                                            </Typography>
                                                                        </CardContent>
                                                                    </Grid>
                                                                </Card>
                                                            }
                                                        </Box>

                                                    </Grid>

                                                )}
                                            </Grid>

                                        </Box>
                                    </Box>
                                </CardContent>

                            }
                        </div >
                    </Box>
                </Box>
            )}
        </Box >

    );
}