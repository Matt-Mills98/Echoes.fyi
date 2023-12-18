import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Typography } from '@mui/material';

import Box from '@mui/material/Box';

import IconButton from '@mui/material/IconButton';

import DialogTitle from '@mui/material/DialogTitle';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Grid from '@mui/material/Grid';

import CloseIcon from '@mui/icons-material/Close';
import { Bar } from "react-chartjs-2";
import { Radar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import { RadialLinearScale, ArcElement, PointElement, LineElement, Filler, scales } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, RadialLinearScale, PointElement, LineElement, ArcElement, Filler, Title, Tooltip, Legend, scales);
function getKey(mode) {
    if (mode === 0) {
        return 'C';
    }
    else if (mode === 1) {
        return 'C♯, D♭';
    }
    else if (mode === 2) {
        return 'D';
    }
    else if (mode === 3) {
        return 'D♯, E♭';
    }
    else if (mode === 4) {
        return 'E';
    }
    else if (mode === 5) {
        return 'F';
    }
    else if (mode === 6) {
        return 'F♯, G♭';
    }
    else if (mode === 7) {
        return 'G';
    }
    else if (mode === 8) {
        return 'G♯, A♭';
    }
    else if (mode === 9) {
        return 'A';
    }
    else if (mode === 10) {
        return 'A♯, B♭';
    }
    else if (mode === 11) {
        return 'B';
    }
    else {
        return '';
    }
}
function getMode(mode) {
    if (mode === 1) {
        return 'Major';
    }
    else if (mode === 0) {
        return 'Minor';
    }
    else {
        return '';
    }
}
function msToTime(duration) {

    var seconds = Math.floor((duration / 1000) % 60);
    var minutes = Math.floor((duration / (1000 * 60)) % 60);

    minutes = (minutes < 10) ? minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}
function msToTime2(duration) {
    var milliseconds = Math.floor((duration % 1000) / 10);
    var seconds = Math.floor((duration / 1000) % 60);
    var minutes = Math.floor((duration / (1000 * 60)) % 60);

    minutes = (minutes < 10) ? minutes : minutes;
    seconds = (seconds < 10) ? seconds : seconds;

    if (minutes === 0) {
        return seconds + "." + milliseconds
    }
    else {
        return minutes + ":" + seconds + "." + milliseconds;
    }
}

function getColorSingle(sections, type, i) {
    var compare = 0
    var color;
    if (type === 'key') {
        compare = sections[i]?.key_confidence;
    }
    else if (type === 'duration') {
        compare = sections[i]?.confidence;
    }
    else if (type === 'tempo') {
        compare = sections[i].tempo_confidence;
    }
    else {
        compare = sections[i].mode_confidence;
    }
    if (compare <= 0.49)
        color = '#ff0000';
    else if (compare <= 0.74)
        color = '#ffee00';
    else
        color = '#00ff00';


    return color;
}
export default function AnalysisDialog(props) {
    const { track, features, analysis, open, handleClose, copyToClipBoard } = props;
    const optionTempo = {
        responsive: true,

        plugins: {

            title: {
                display: true,
                text: "Tempo (BPM)",
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (context) {
                        var multistringText = [context.parsed.y];
                        multistringText.push("Confidence: " + analysis?.sections[context.parsed.x]?.tempo_confidence);

                        return multistringText;
                    },

                }
            },
            legend: {
                display: false,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 16
                }
            },
        },
    };

    const dataTempo = {
        labels: analysis?.sections?.map((section, index) => index + 1),
        datasets: [
            {
                label: "Tempo",
                data: analysis?.sections?.map(section => section.tempo),
                backgroundColor: (context) => {
                    return analysis?.sections?.map((section, index) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                        gradient.addColorStop(1, getColorSingle(analysis?.sections, 'tempo', index));
                        gradient.addColorStop(0, getColorSingle(analysis?.sections, 'tempo', index)+'66');
                        return gradient;
                    }

                    )

                },
                //backgroundColor: getColor(analysis?.sections, 'tempo'),
                borderRadius: 5,

            },
        ],


    };
    const optionExtra = {
        responsive: true,

        plugins: {

            title: {
                display: true,
                text: "Totals",
            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (context) {
                        var multistringText = [context.parsed.y];


                        return multistringText;
                    },

                }
            },
            legend: {
                display: false,

            },
        },
    };

    const dataExtra = {
        labels: ['Bars', 'Beats', 'Segments', 'Tatums'],
        datasets: [
            {
                label: "Total Found",
                data: [analysis?.bars?.length, analysis?.beats?.length, analysis?.segments?.length, analysis?.tatums?.length],
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, '#8d42f5');
                    gradient.addColorStop(1, '#71c1e3');
                    return gradient;
                },
                borderRadius: 5,

            },


        ],

    };
    const optionLoudness = {
        responsive: true,

        plugins: {

            title: {
                display: true,
                text: "Loudness (dB)",
            },

            legend: {
                display: false,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 16
                }
            },
        },
    };
    const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 0);
    const randomRGB = () => `rgb(${randomNum() + 100}, ${randomNum() + 50}, ${255}, 0.6)`;

    const dataDuration = {
        labels: analysis?.sections?.map((section, index) => index + 1),
        datasets: [
            {
                label: 'Section Duration',
                data: analysis?.sections?.map(section => section.duration),
                backgroundColor: analysis?.sections?.map(randomRGB),
                borderColor: '#16191a',
                borderWidth: 4,
                borderRadius: 5,

            },
        ],
    };
    const optionDuration = {
        plugins: {

            title: {
                display: true,
                text: "Duration",
            },

            legend: {
                display: false,

            },
        },
    }
    const dataLoudness = {
        labels: analysis?.sections?.map((section, index) => index + 1),
        datasets: [
            {
                label: "Loudness",
                data: analysis?.sections?.map(section => section.loudness),
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, '#8d42f5');
                    gradient.addColorStop(1, '#71c1e3');
                    return gradient;
                }, borderRadius: 5,

            },


        ],

    };
    const optionKey = {
        responsive: true,

        plugins: {

            title: {
                display: true,
                text: "Key (Pitch Class Notation)",

            },
            tooltip: {
                enabled: true,
                callbacks: {
                    label: function (context) {
                        var multistringText = [context.parsed.y];
                        multistringText.push("Confidence: " + analysis?.sections[context.parsed.x]?.key_confidence);

                        return multistringText;
                    },

                }
            },
            legend: {
                display: false,
                position: "bottom",
                labels: {
                    fontColor: "#333",
                    fontSize: 16
                }
            },
        },
    };

    const dataKey = {
        labels: analysis?.sections?.map((section, index) => index + 1),
        datasets: [
            {
                label: "Key",
                data: analysis?.sections?.map(section => section.key),
                backgroundColor: (context) => {
                    return analysis?.sections?.map((section, index) => {
                        const ctx = context.chart.ctx;
                        const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                        gradient.addColorStop(1, getColorSingle(analysis?.sections, 'key', index));
                        gradient.addColorStop(0, getColorSingle(analysis?.sections, 'key', index)+'66');
                        return gradient;
                    }

                    )

                }, borderRadius: 5,

            },


        ],

    };
    const optionsRadar = {
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            r: {
                angleLines: {
                    color: '#3b3b3b'
                },
                grid: {
                    color: '#3b3b3b'
                },
                ticks: {
                    callback: function () { return "" },
                    backdropColor: "rgba(0, 0, 0, 0)"
                }
            }
        }
    }

    const dataRadar = {
        labels: ['Acousticness', 'Danceability', 'Energy', 'Instrumentalness', 'Liveness', 'Speechiness', 'Valence'],
        datasets: [
            {
                data: [features?.acousticness, features?.danceability, features?.energy, features?.instrumentalness, features?.liveness, features?.speechiness, features?.valence],
                backgroundColor: 'rgba(113, 193, 227, 0.6)',
                borderColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, '#8d42f5');
                    gradient.addColorStop(1, '#71c1e3');

                    return gradient;
                }, borderWidth: 2,

            },
        ],
    };
    return (<Dialog PaperProps={{ sx: { minWidth: '90vw' } }} onClose={handleClose} open={open} sx={{

        '& .MuiPaper-root': {
            backgroundColor: '#16191a',
            minWidth: '90vw',
            minHeight: '90vh'
        },

    }}>
        <DialogTitle variant="h4" ><Typography variant="h4" sx={{ color: '#71c1e3' }}>{track?.name}</Typography> <Typography variant="h6" sx={{ color: '#999999' }}>{track?.artists?.map((artist, index) => (index ? ', ' : '') + artist.name)}</Typography></DialogTitle>
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

            <Typography variant="h5" sx={{ color: '#BFBFBF' }}>Spotify Audio Analysis v{analysis?.meta?.analyzer_version}</Typography>
            <Box sx={{ margin: '10px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} lg={6} xl={2}>
                        <Typography sx={{ color: '#71c1e3' }} variant="h6">Track</Typography>
                        <TableContainer>
                            <Table size='small' aria-label="simple table">
                                <TableBody>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Samples</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{analysis?.track?.num_samples.toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Sample Rate</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{analysis?.track?.analysis_sample_rate.toLocaleString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Channels</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{analysis?.track?.analysis_channels}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Duration</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{msToTime(analysis?.track?.duration * 1000)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Fade in</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{msToTime2(analysis?.track?.end_of_fade_in * 1000)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Fade out</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{msToTime2((analysis?.track?.duration - analysis?.track?.start_of_fade_out) * 1000)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Loudness</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{analysis?.track?.loudness}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Tempo</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{analysis?.track?.tempo}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Tempo Confidence</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{analysis?.track?.tempo_confidence}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Time Signature</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{analysis?.track?.time_signature}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Time Signature Confidence</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{analysis?.track?.time_signature_confidence}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Key</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{getKey(analysis?.track?.key)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Key Confidence</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{analysis?.track?.key_confidence}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Mode</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{getMode(analysis?.track?.mode)}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Mode Confidence</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{analysis?.track?.mode_confidence}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>ENMFP Code String</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">
                                            <IconButton sx={{ color: '#999999' }} onClick={() => { copyToClipBoard(analysis?.track?.codestring) }}><ContentCopyIcon fontSize="small" /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>ENMFP Code Version</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{analysis?.track?.code_version}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>EchoPrint Code String</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">
                                            <IconButton sx={{ color: '#999999' }} onClick={() => { copyToClipBoard(analysis?.track?.echoprintstring) }}><ContentCopyIcon fontSize="small" /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>EchoPrint Version:</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{analysis?.track?.echoprint_version}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Synchstring</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">
                                            <IconButton sx={{ color: '#999999' }} onClick={() => { copyToClipBoard(analysis?.track?.syncstring) }}><ContentCopyIcon fontSize="small" /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Synch Version</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{analysis?.track?.synch_version}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Rythmstring</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">
                                            <IconButton sx={{ color: '#999999' }} onClick={() => { copyToClipBoard(analysis?.track?.syncstring) }}><ContentCopyIcon fontSize="small" /></IconButton>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Rhythmstring Version</TableCell>
                                        <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{analysis?.track?.rhythm_version}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6} xl={2}>
                        <Grid container spacing={0}>
                            <Typography sx={{ color: '#71c1e3' }} variant="h6">Details</Typography>

                            <Grid item xs={12}>
                                <div style={{ height: '400px' }}>
                                    <Radar data={dataRadar} options={optionsRadar} style={{ margin: '0px' }} />
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <TableContainer>
                                    <Table size='small' aria-label="simple table">
                                        <TableBody>
                                            <TableRow>
                                                <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Acousticness</TableCell>
                                                <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{features?.acousticness}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Danceability</TableCell>
                                                <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{features?.danceability}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Energy</TableCell>
                                                <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{features?.energy}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Instrumentalness</TableCell>
                                                <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{features?.instrumentalness}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Liveness</TableCell>
                                                <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{features?.liveness}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Speechiness</TableCell>
                                                <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{features?.speechiness}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Valence</TableCell>
                                                <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{features?.valence}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Popularity</TableCell>
                                                <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{track?.popularity}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Track Number</TableCell>
                                                <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{track?.track_number}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell sx={{ color: '#999999', borderBottom: 'none' }}>Album</TableCell>
                                                <TableCell sx={{ color: '#999999', borderBottom: 'none' }} align="right">{track?.album?.name}</TableCell>
                                            </TableRow>

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} lg={10} xl={8}>

                        <Typography sx={{ color: '#71c1e3' }} variant="h6">Sections</Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12} lg={12} xl={3}>
                                <div style={{ height: '350px' }}>

                                    <Doughnut options={optionDuration} data={dataDuration} />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12} xl={9}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={6} lg={6} xl={4}>
                                        <div style={{ height: '175px' }}>

                                            <Bar options={optionLoudness} data={dataLoudness} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6} xl={4}>
                                        <div style={{ height: '175px' }}>
                                            <Bar options={optionTempo} data={dataTempo} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6} xl={4}>
                                        <div style={{ height: '175px' }}>
                                            <Bar options={optionKey} data={dataKey} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={6} lg={6} xl={4}>
                                        <div style={{ height: '175px' }}>
                                            <Bar options={optionExtra} data={dataExtra} />
                                        </div>
                                    </Grid>

                                </Grid>
                            </Grid>
                            <Grid item xs={12} >

                                <TableContainer sx={{
                                    maxWidth: '100%', overflow: 'auto' /* Firefox */,
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
                                }} >
                                    <Table size='small' aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ color: '#999999' }}>Section</TableCell>
                                                <TableCell sx={{ color: '#999999' }}>Start</TableCell>
                                                <TableCell sx={{ color: '#999999' }}>Duration</TableCell>
                                                <TableCell sx={{ color: '#999999' }}>Confidence</TableCell>
                                                <TableCell sx={{ color: '#999999' }}>Loudness</TableCell>
                                                <TableCell sx={{ color: '#999999' }}>Tempo</TableCell>
                                                <TableCell sx={{ color: '#999999' }}>Tempo Confidence</TableCell>
                                                <TableCell sx={{ color: '#999999' }}>Key</TableCell>
                                                <TableCell sx={{ color: '#999999' }}>Key Confidence</TableCell>
                                                <TableCell sx={{ color: '#999999' }}>Mode</TableCell>
                                                <TableCell sx={{ color: '#999999' }}>Mode Confidence</TableCell>
                                                <TableCell sx={{ color: '#999999' }}>Time Signature</TableCell>
                                                <TableCell sx={{ color: '#999999' }}>Time Signature Confidence</TableCell>



                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {analysis?.sections?.map((section, index) => {
                                                return (<TableRow>
                                                    <TableCell sx={{ color: '#999999', borderBottom: "none", paddingTop: 0.8, paddingBottom: 0 }}>{index + 1}</TableCell>
                                                    <TableCell sx={{ color: '#999999', borderBottom: "none", paddingTop: 0.8, paddingBottom: 0 }}>{msToTime(section.start * 1000)}</TableCell>
                                                    <TableCell sx={{ color: '#999999', borderBottom: "none", paddingTop: 0.8, paddingBottom: 0 }}>{msToTime(section.duration * 1000)}</TableCell>
                                                    <TableCell sx={{ color: '#999999', borderBottom: "none", paddingTop: 0.8, paddingBottom: 0 }}>{section.confidence}</TableCell>
                                                    <TableCell sx={{ color: '#999999', borderBottom: "none", paddingTop: 0.8, paddingBottom: 0 }}>{section.loudness}</TableCell>
                                                    <TableCell sx={{ color: '#999999', borderBottom: "none", paddingTop: 0.8, paddingBottom: 0 }}>{section.tempo}</TableCell>
                                                    <TableCell sx={{ color: '#999999', borderBottom: "none", paddingTop: 0.8, paddingBottom: 0 }}>{section.tempo_confidence}</TableCell>
                                                    <TableCell sx={{ color: '#999999', borderBottom: "none", paddingTop: 0.8, paddingBottom: 0 }}>{getKey(section.key)}</TableCell>
                                                    <TableCell sx={{ color: '#999999', borderBottom: "none", paddingTop: 0.8, paddingBottom: 0 }}>{section.key_confidence}</TableCell>
                                                    <TableCell sx={{ color: '#999999', borderBottom: "none", paddingTop: 0.8, paddingBottom: 0 }}>{getMode(section.mode)}</TableCell>
                                                    <TableCell sx={{ color: '#999999', borderBottom: "none", paddingTop: 0.8, paddingBottom: 0 }}>{section.mode_confidence}</TableCell>
                                                    <TableCell sx={{ color: '#999999', borderBottom: "none", paddingTop: 0.8, paddingBottom: 0 }}>{section.time_signature}</TableCell>
                                                    <TableCell sx={{ color: '#999999', borderBottom: "none", paddingTop: 0.8, paddingBottom: 0 }}>{section.time_signature_confidence}</TableCell>



                                                </TableRow>
                                                )
                                            })}

                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>


        </DialogContent>
    </Dialog>);
}