import * as React from 'react';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import RemoveIcon from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CloseIcon from '@mui/icons-material/Close';

export default function MultipleSelect(props) {
    const localGenres = props.genres;
    const {  setGenresParams } = props;
    const [genres, setGenres] = React.useState([]);
    const [count, setCount] = React.useState(0);
    const [showAcousticness, setShowAcousticness] = React.useState(true);
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => { getGenreString() }, [genres])

    React.useEffect(() => { getGenres() }, []);

    const getGenres = () => {
        let arr = [];
        localGenres?.genres?.map((genre) => {
            let object = { genre: '', selected: false };
            object.genre = genre;
            arr.push(object);
        })
        setGenres(arr);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };


    const getGenreString = () => {
        let genreString = "&seed_genres="
        genres.map((genre) => {
            if (genre.selected) {
                genreString += genre.genre + '%2C'
            }
        })
        if (genreString != '&seed_genres=') {
            genreString = genreString.slice(0, -3);
            setGenresParams(genreString);
        }
        else {
            setGenresParams('');

        }
    }
    const setSelected = (boolVal, index) => {
        if (count >= 5 && boolVal) {

        }
        else {
            let el = genres.map((item, i) => {
                if (index === i) { item.selected = boolVal } return item
            });
            boolVal ? (setCount(count + 1)) : (setCount(count - 1));
            setGenres(el);
        }
    }
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
    //const randomNumRed = () => Math.floor(Math.random() * (150) + 50);
    //const randomNumGreen = () => Math.floor(Math.random() * (100) + 150);

    //const randomRGB = () => `rgb(${randomNumRed()}, ${randomNumGreen()}, ${255}, 0.6)`;

    return (
        <Box sx={{ width: '100%' }} >
            <Grid container direction="column" alignItems="left">

                <Grid item sx={12}>
                    <Button sx={{ borderRadius: 28, backgroundColor: '#518da6', textTransform: 'none', margin: '2px', color: 'white', padding: 'none' }} onClick={handleClickOpen}>
                        <Typography>Add Genres</Typography>
                        <AddIcon /></Button>
                </Grid>
            </Grid>
            <Grid container sx={{ width: '100%' }} >
                <Grid item sx={12}>
                    <Grid container>
                        {genres.map((name, index) => (
                            <Box >
                                {name.selected && <Button type="submit" sx={{ borderRadius: 28, backgroundColor: `rgb(${index + 60}, ${index + 150}, ${255}, 0.5)`, textTransform: 'none', margin: '2px', color: 'white', padding: 'none' }} onClick={() => { setSelected(false, index) }}><RemoveIcon fontSize='small'></RemoveIcon>{getName(name.genre)}</Button>}
                            </Box>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
            <Dialog PaperProps={{ sx: { maxWidth: '70vw' } }} onClose={handleClose} open={open} sx={{

                '& .MuiPaper-root': {
                    backgroundColor: '#16191a',
                    maxwidth: '90vh'
                },
            }}>
                <DialogTitle variant="h4" sx={{ color: '#71c1e3' }} >Select Genres <Typography variant="body1" sx={{ ml: '5px', color: '#999999' }}>Select up to 5 genres</Typography></DialogTitle>

                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                    <Grid container>
                        {genres.map((name, index) => (
                            <Box >
                                {name.selected && <Button type="submit" sx={{ borderRadius: 28, backgroundColor: `rgb(${index + 60}, ${index + 150}, ${255}, 0.5)`, textTransform: 'none', margin: '2px', color: 'white', padding: 'none' }} onClick={() => { setSelected(false, index) }}><RemoveIcon fontSize='small'></RemoveIcon>{getName(name.genre)}</Button>}
                            </Box>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogContent sx={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                    <Grid container>
                        {genres.map((name, index) => (
                            <Box sx={{}}>
                                {!name.selected && <Button type="submit" sx={{ borderRadius: 28, backgroundColor: `rgb(${index + 60}, ${index + 150}, ${255}, 0.5)`, textTransform: 'none', margin: '2px', color: 'white', padding: 'none' }} onClick={() => { setSelected(true, index) }}><AddIcon fontSize='small'></AddIcon>{getName(name.genre)}</Button>}
                            </Box>
                        ))}
                    </Grid>
                </DialogContent>
            </Dialog>

        </Box >
    );
}