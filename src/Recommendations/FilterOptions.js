import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Collapse from '@mui/material/Collapse';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import UnfoldMoreDoubleIcon from '@mui/icons-material/UnfoldMoreDouble';
import UnfoldLessDoubleIcon from '@mui/icons-material/UnfoldLessDouble';


function getKey(mode) {
    if (mode == 0) {
        return 'C';
    }
    else if (mode == 1) {
        return 'C♯, D♭';
    }
    else if (mode == 2) {
        return 'D';
    }
    else if (mode == 3) {
        return 'D♯, E♭';
    }
    else if (mode == 4) {
        return 'E';
    }
    else if (mode == 5) {
        return 'F';
    }
    else if (mode == 6) {
        return 'F♯, G♭';
    }
    else if (mode == 7) {
        return 'G';
    }
    else if (mode == 8) {
        return 'G♯, A♭';
    }
    else if (mode == 9) {
        return 'A';
    }
    else if (mode == 10) {
        return 'A♯, B♭';
    }
    else if (mode == 11) {
        return 'B';
    }
    else {
        return '';
    }
}

function valuetext(value) {
    return `${value}%`;
}

function msToTime(duration) {
    var milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),

        minutes = (minutes < 10) ? minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ":" + seconds;
}

const minDistance = 10;
const minDistanceKey = 2;

export default function MinimumDistanceSlider(props) {

    const {setSearchParams} = props;

    const [showAll, setShowAll] = React.useState(false);

    const [valueMAc, setValueMAc] = React.useState([0, 100]);
    const [valueAc, setValueAc] = React.useState(0);
    const [showAcousticness, setShowAcousticness] = React.useState(false);
    const [useMAc, setUseMAc] = React.useState(false);
    const [useAc, setUseAc] = React.useState(false);

    const [valueMDa, setValueMDa] = React.useState([0, 100]);
    const [valueDa, setValueDa] = React.useState(0);
    const [showDanceability, setShowDanceability] = React.useState(false);
    const [useMDa, setUseMDa] = React.useState(false);
    const [useDa, setUseDa] = React.useState(false);

    const [valueMDu, setValueMDu] = React.useState(600);
    const [valueDu, setValueDu] = React.useState(0);
    const [showDuration, setShowDuration] = React.useState(false);
    const [useMDu, setUseMDu] = React.useState(false);
    const [useDu, setUseDu] = React.useState(false);

    const [valueMEn, setValueMEn] = React.useState([0, 100]);
    const [valueEn, setValueEn] = React.useState(0);
    const [showEnergy, setShowEnergy] = React.useState(false);
    const [useMEn, setUseMEn] = React.useState(false);
    const [useEn, setUseEn] = React.useState(false);

    const [valueMIn, setValueMIn] = React.useState([0, 100]);
    const [valueIn, setValueIn] = React.useState(0);
    const [showInstrumentalness, setShowInstrumentalness] = React.useState(false);
    const [useMIn, setUseMIn] = React.useState(false);
    const [useIn, setUseIn] = React.useState(false);

    const [valueMKe, setValueMKe] = React.useState([0, 11]);
    const [valueKe, setValueKe] = React.useState(0);
    const [showKey, setShowKey] = React.useState(false);
    const [useMKe, setUseMKe] = React.useState(false);
    const [useKe, setUseKe] = React.useState(false);

    const [valueMLi, setValueMLi] = React.useState([0, 100]);
    const [valueLi, setValueLi] = React.useState(0);
    const [showLiveness, setShowLiveness] = React.useState(false);
    const [useMLi, setUseMLi] = React.useState(false);
    const [useLi, setUseLi] = React.useState(false);

    const [valueMLo, setValueMLo] = React.useState([-60, 0]);
    const [valueLo, setValueLo] = React.useState(-30);
    const [showLoudness, setShowLoudness] = React.useState(false);
    const [useMLo, setUseMLo] = React.useState(false);
    const [useLo, setUseLo] = React.useState(false);

    const [valueMo, setValueMo] = React.useState(0);
    const [showMode, setShowMode] = React.useState(false);
    const [useMo, setUseMo] = React.useState(false);

    const [valueMPo, setValueMPo] = React.useState([0, 100]);
    const [valuePo, setValuePo] = React.useState(0);
    const [showPopularity, setShowPopularity] = React.useState(false);
    const [useMPo, setUseMPo] = React.useState(false);
    const [usePo, setUsePo] = React.useState(false);

    const [valueMSp, setValueMSp] = React.useState([0, 100]);
    const [valueSp, setValueSp] = React.useState(0);
    const [showSpeechiness, setShowSpeechiness] = React.useState(false);
    const [useMSp, setUseMSp] = React.useState(false);
    const [useSp, setUseSp] = React.useState(false);

    const [valueMTe, setValueMTe] = React.useState([0, 250]);
    const [valueTe, setValueTe] = React.useState(0);
    const [showTempo, setShowTempo] = React.useState(false);
    const [useMTe, setUseMTe] = React.useState(false);
    const [useTe, setUseTe] = React.useState(false);

    const [valueMTS, setValueMTS] = React.useState([3, 7]);
    const [valueTS, setValueTS] = React.useState(3);
    const [showTimeSig, setShowTimeSig] = React.useState(false);
    const [useMTS, setUseMTS] = React.useState(false);
    const [useTS, setUseTS] = React.useState(false);

    const [valueMVa, setValueMVa] = React.useState([0, 100]);
    const [valueVa, setValueVa] = React.useState(0);
    const [showValence, setShowValence] = React.useState(false);
    const [useMVa, setUseMVa] = React.useState(false);
    const [useVa, setUseVa] = React.useState(false);

    React.useEffect(() => { formRequestParams() }, [valueMAc,valueAc,valueMDa,valueDa,valueMDu,valueDu,valueMEn,valueEn,valueMIn,valueIn,valueMKe,valueKe,valueMLi,valueLi,valueMLo,valueLo,valueMo, valueMPo, valuePo,valueMSp,valueSp,valueMTe,valueTe,valueMTS,valueTS,valueMVa,valueVa])


    const formRequestParams = () => {
        let paramString = '';
        if(useMAc){
            paramString += '&min_acousticness=' + (valueMAc[0]/100);
            paramString += '&max_acousticness=' + (valueMAc[1]/100);

        }
        if(useAc){
            paramString += '&target_acousticness=' + (valueAc/100);
        }
        if(useMDa){
            paramString += '&min_danceability=' + (valueMDa[0]/100);
            paramString += '&max_danceability=' + (valueMDa[1]/100);

        }
        if(useDa){
            paramString += '&target_danceability=' + (valueDa/100);
        }
        if(useMDu){
            paramString += '&max_duration=' + (valueMDu*1000);

        }
        if(useDu){
            paramString += '&min_duration=' + (valueDu*1000);
        }
        if(useMEn){
            paramString += '&min_energy=' + (valueMEn[0]/100);
            paramString += '&max_energy=' + (valueMEn[1]/100);

        }
        if(useEn){
            paramString += '&target_energy=' + (valueEn/100);
        }
        if(useMIn){
            paramString += '&min_instrumentalness=' + (valueMIn[0]/100);
            paramString += '&max_instrumentalness=' + (valueMIn[1]/100);

        }
        if(useIn){
            paramString += '&target_instrumentalness=' + (valueIn/100);
        }
        if(useMKe){
            paramString += '&min_key=' + valueMKe[0];
            paramString += '&max_key=' + valueMKe[1];

        }
        if(useKe){
            paramString += '&target_key=' + valueKe;
        }
        if(useMLi){
            paramString += '&min_liveness=' + (valueMLi[0]/100);
            paramString += '&max_liveness=' + (valueMLi[1]/100);

        }
        if(useLi){
            paramString += '&target_liveness=' + (valueLi/100);
        }
        if(useMLo){
            paramString += '&min_loudness=' +valueMLo[0];
            paramString += '&max_loudness=' + valueMLo[1];

        }
        if(useLo){
            paramString += '&target_loudness=' + valueLo;
        }
        if(useMo){
            valueMo?(paramString += '&target_mode=' + 1):(paramString += '&target_mode=' + 0)
        }
        if(useMPo){
            paramString += '&min_popularity=' + valueMPo[0];
            paramString += '&max_popularity=' + valueMPo[1];

        }
        if(usePo){
            paramString += '&target_popularity=' + valuePo;
        }
        if(useMSp){
            paramString += '&min_speechiness=' + (valueMSp[0]/100);
            paramString += '&max_speechiness=' + (valueMSp[1]/100);

        }
        if(useSp){
            paramString += '&target_speechiness=' + (valueSp/100);
        }
        if(useMTe){
            paramString += '&min_tempo=' + valueMTe[0];
            paramString += '&max_tempo=' + valueMTe[1];

        }
        if(useTe){
            paramString += '&target_tempo=' + valueTe;
        }
        if(useMTS){
            paramString += '&min_time_signature=' + valueMTS[0];
            paramString += '&max_time_signature=' + valueMTS[1];

        }
        if(useTS){
            paramString += '&target_time_signature=' + valueTS;
        }
        if(useMVa){
            paramString += '&min_valence=' + (valueMVa[0]/100);
            paramString += '&max_valence=' + (valueMVa[1]/100);

        }
        if(useVa){
            paramString += '&target_valence=' + (valueVa/100);
        }
        setSearchParams(paramString);
    }


    const toggleAll = () => {
        setShowAcousticness(!showAll);
        setShowDanceability(!showAll);
        setShowDuration(!showAll);
        setShowEnergy(!showAll);
        setShowInstrumentalness(!showAll);
        setShowKey(!showAll);
        setShowLiveness(!showAll);
        setShowLoudness(!showAll);
        setShowMode(!showAll);
        setShowPopularity(!showAll);
        setShowSpeechiness(!showAll);
        setShowTempo(!showAll);
        setShowTimeSig(!showAll);
        setShowValence(!showAll);
        setShowAll(!showAll);
    }

    //Acousticness Functions:
    const handleAc = (event, newValue) => {
        if (newValue <= valueMAc[1] && newValue >= valueMAc[0])
            setValueAc(newValue);
    };

    const handleMAc = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValueMAc([Math.min(newValue[0], valueMAc[1] - minDistance), valueMAc[1]]);
        } else {
            setValueMAc([valueMAc[0], Math.max(newValue[1], valueMAc[0] + minDistance)]);
        }
        if (valueAc > valueMAc[1])
            setValueAc(valueMAc[1] - 1);
        if (valueAc < valueMAc[0])
            setValueAc(valueMAc[0] + 1);
    };

    const toggleAcousticness = () => {
        setShowAcousticness(!showAcousticness);
    }
    const toggleUseMAc = (event) => {
        setUseMAc(event.target.checked);
    }
    const toggleUseAc = (event) => {
        setUseAc(event.target.checked);
    }

    //Danceability Functions
    const handleDa = (event, newValue) => {
        if (newValue <= valueMDa[1] && newValue >= valueMDa[0])
            setValueDa(newValue);
    };

    const handleMDa = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValueMDa([Math.min(newValue[0], valueMDa[1] - minDistance), valueMDa[1]]);
        } else {
            setValueMDa([valueMDa[0], Math.max(newValue[1], valueMDa[0] + minDistance)]);
        }
        if (valueDa > valueMDa[1])
            setValueDa(valueMDa[1] - 1);
        if (valueDa < valueMDa[0])
            setValueDa(valueMDa[0] + 1);
    };

    const toggleDanceability = () => {
        setShowDanceability(!showDanceability);
    }
    const toggleUseMDa = (event) => {
        setUseMDa(event.target.checked);
    }
    const toggleUseDa = (event) => {
        setUseDa(event.target.checked);
    }

    //Duration Functions
    const handleDu = (event, newValue) => {
        if (newValue <= valueMDu)
            setValueDu(newValue);
    };

    const handleMDu = (event, newValue) => {
        if (newValue >= valueDu)
            setValueMDu(newValue);
    };

    const toggleDuration = () => {
        setShowDuration(!showDuration);
    }
    const toggleUseMDu = (event) => {
        setUseMDu(event.target.checked);
    }
    const toggleUseDu = (event) => {
        setUseDu(event.target.checked);
    }

    //Energy Functions
    const handleEn = (event, newValue) => {
        if (newValue <= valueMEn[1] && newValue >= valueMEn[0])
            setValueEn(newValue);
    };

    const handleMEn = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValueMEn([Math.min(newValue[0], valueMEn[1] - minDistance), valueMEn[1]]);
        } else {
            setValueMEn([valueMEn[0], Math.max(newValue[1], valueMEn[0] + minDistance)]);
        }
        if (valueEn > valueMEn[1])
            setValueEn(valueMEn[1] - 1);
        if (valueEn < valueMEn[0])
            setValueEn(valueMEn[0] + 1);
    };

    const toggleEnergy = () => {
        setShowEnergy(!showEnergy);
    }
    const toggleUseMEn = (event) => {
        setUseMEn(event.target.checked);
    }
    const toggleUseEn = (event) => {
        setUseEn(event.target.checked);
    }

    //Instrumentalness Functions
    const handleIn = (event, newValue) => {
        if (newValue <= valueMIn[1] && newValue >= valueMIn[0])
            setValueIn(newValue);
    };

    const handleMIn = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValueMIn([Math.min(newValue[0], valueMIn[1] - minDistance), valueMIn[1]]);
        } else {
            setValueMIn([valueMIn[0], Math.max(newValue[1], valueMIn[0] + minDistance)]);
        }
        if (valueIn > valueMIn[1])
            setValueIn(valueMIn[1] - 1);
        if (valueIn < valueMIn[0])
            setValueIn(valueMIn[0] + 1);
    };

    const toggleInstrumentalness = () => {
        setShowInstrumentalness(!showInstrumentalness);
    }
    const toggleUseMIn = (event) => {
        setUseMIn(event.target.checked);
    }
    const toggleUseIn = (event) => {
        setUseIn(event.target.checked);
    }

    //Key Functions
    const handleKe = (event, newValue) => {
        if (newValue <= valueMKe[1] && newValue >= valueMKe[0])
            setValueKe(newValue);
    };

    const handleMKe = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValueMKe([Math.min(newValue[0], valueMKe[1] - minDistanceKey), valueMKe[1]]);
        } else {
            setValueMKe([valueMKe[0], Math.max(newValue[1], valueMKe[0] + minDistanceKey)]);
        }
        if (valueKe > valueMKe[1])
            setValueKe(valueMKe[1] - 1);
        if (valueKe < valueMKe[0])
            setValueKe(valueMKe[0] + 1);
    };

    const toggleKey = () => {
        setShowKey(!showKey);
    }
    const toggleUseMKe = (event) => {
        setUseMKe(event.target.checked);
    }
    const toggleUseKe = (event) => {
        setUseKe(event.target.checked);
    }
    //Liveness Functions
    const handleLi = (event, newValue) => {
        if (newValue <= valueMLi[1] && newValue >= valueMLi[0])
            setValueLi(newValue);
    };

    const handleMLi = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValueMLi([Math.min(newValue[0], valueMLi[1] - minDistance), valueMLi[1]]);
        } else {
            setValueMLi([valueMLi[0], Math.max(newValue[1], valueMLi[0] + minDistance)]);
        }
        if (valueLi > valueMLi[1])
            setValueLi(valueMLi[1] - 1);
        if (valueLi < valueMLi[0])
            setValueLi(valueMLi[0] + 1);
    };

    const toggleLiveness = () => {
        setShowLiveness(!showLiveness);
    }
    const toggleUseMLi = (event) => {
        setUseMLi(event.target.checked);
    }
    const toggleUseLi = (event) => {
        setUseLi(event.target.checked);
    }
    //Loudness Functions
    const handleLo = (event, newValue) => {
        if (newValue <= valueMLo[1] && newValue >= valueMLo[0])
            setValueLo(newValue);
    };

    const handleMLo = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValueMLo([Math.min(newValue[0], valueMLo[1] - minDistance), valueMLo[1]]);
        } else {
            setValueMLo([valueMLo[0], Math.max(newValue[1], valueMLo[0] + minDistance)]);
        }
        if (valueLo > valueMLo[1])
            setValueLo(valueMLo[1] - 1);
        if (valueLo < valueMLo[0])
            setValueLo(valueMLo[0] + 1);
    };

    const toggleLoudness = () => {
        setShowLoudness(!showLoudness);
    }
    const toggleUseMLo = (event) => {
        setUseMLo(event.target.checked);
    }
    const toggleUseLo = (event) => {
        setUseLo(event.target.checked);
    }

    //Mode Functions
    const handleMo = (event, newValue) => {
        setValueMo(event.target.checked);
    };

    const toggleUseMo = (event) => {
        setUseMo(event.target.checked);
    }
    //Popularity Functions
    const handlePo = (event, newValue) => {
        if (newValue <= valueMPo[1] && newValue >= valueMPo[0])
            setValuePo(newValue);
    };

    const handleMPo = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValueMPo([Math.min(newValue[0], valueMPo[1] - minDistance), valueMPo[1]]);
        } else {
            setValueMPo([valueMPo[0], Math.max(newValue[1], valueMPo[0] + minDistance)]);
        }
        if (valuePo > valueMPo[1])
            setValuePo(valueMPo[1] - 1);
        if (valuePo < valueMPo[0])
            setValuePo(valueMPo[0] + 1);
    };

    const togglePopularity = () => {
        setShowPopularity(!showPopularity);
    }
    const toggleUseMPo = (event) => {
        setUseMPo(event.target.checked);
    }
    const toggleUsePo = (event) => {
        setUsePo(event.target.checked);
    }
    //Speechiness Functions
    const handleSp = (event, newValue) => {
        if (newValue <= valueMSp[1] && newValue >= valueMSp[0])
            setValueSp(newValue);
    };

    const handleMSp = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValueMSp([Math.min(newValue[0], valueMSp[1] - minDistance), valueMSp[1]]);
        } else {
            setValueMSp([valueMSp[0], Math.max(newValue[1], valueMSp[0] + minDistance)]);
        }
        if (valueSp > valueMSp[1])
            setValueSp(valueMSp[1] - 1);
        if (valueSp < valueMSp[0])
            setValueSp(valueMSp[0] + 1);
    };

    const toggleSpeechiness = () => {
        setShowSpeechiness(!showSpeechiness);
    }
    const toggleUseMSp = (event) => {
        setUseMSp(event.target.checked);
    }
    const toggleUseSp = (event) => {
        setUseSp(event.target.checked);
    }
    //Tempo Functions
    const handleTe = (event, newValue) => {
        if (newValue <= valueMTe[1] && newValue >= valueMTe[0])
            setValueTe(newValue);
    };

    const handleMTe = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValueMTe([Math.min(newValue[0], valueMTe[1] - minDistance), valueMTe[1]]);
        } else {
            setValueMTe([valueMTe[0], Math.max(newValue[1], valueMTe[0] + minDistance)]);
        }
        if (valueTe > valueMTe[1])
            setValueTe(valueMTe[1] - 1);
        if (valueTe < valueMTe[0])
            setValueTe(valueMTe[0] + 1);
    };

    const toggleTempo = () => {
        setShowTempo(!showTempo);
    }
    const toggleUseMTe = (event) => {
        setUseMTe(event.target.checked);
    }
    const toggleUseTe = (event) => {
        setUseTe(event.target.checked);
    }
    //Time Signature Functions
    const handleTS = (event, newValue) => {
        if (newValue <= valueMTS[1] && newValue >= valueMTS[0])
            setValueTS(newValue);
    };

    const handleMTS = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValueMTS([Math.min(newValue[0], valueMTS[1] - minDistance), valueMTS[1]]);
        } else {
            setValueMTS([valueMTS[0], Math.max(newValue[1], valueMTS[0] + minDistance)]);
        }
        if (valueTS > valueMTS[1])
            setValueTS(valueMTS[1] - 1);
        if (valueTS < valueMTS[0])
            setValueTS(valueMTS[0] + 1);
    };

    const toggleTimeSig = () => {
        setShowTimeSig(!showTimeSig);
    }
    const toggleUseMTS = (event) => {
        setUseMTS(event.target.checked);
    }
    const toggleUseTS = (event) => {
        setUseTS(event.target.checked);
    }

    //Valence Functions
    const handleVa = (event, newValue) => {
        if (newValue <= valueMVa[1] && newValue >= valueMVa[0])
            setValueVa(newValue);
    };

    const handleMVa = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) {
            return;
        }

        if (activeThumb === 0) {
            setValueMVa([Math.min(newValue[0], valueMVa[1] - minDistance), valueMVa[1]]);
        } else {
            setValueMVa([valueMVa[0], Math.max(newValue[1], valueMVa[0] + minDistance)]);
        }
        if (valueVa > valueMVa[1])
            setValueVa(valueMVa[1] - 1);
        if (valueVa < valueMVa[0])
            setValueVa(valueMVa[0] + 1);
    };

    const toggleValence = () => {
        setShowValence(!showValence);
    }
    const toggleUseMVa = (event) => {
        setUseMVa(event.target.checked);
    }
    const toggleUseVa = (event) => {
        setUseVa(event.target.checked);
    }
    return (
        <Card sx={{ maxWidth: '100%', bgcolor: '#16191a' }}>
            <Box sx={{ padding: '15px' }}>
                <Stack direction="row" spacing={1} justifyContent='space-between'>
                    <Grid container direction="row" alignItems="center">

                        <Box >
                            <Typography sx={{ color: '#71c1e3' }} variant="h6" onClick={toggleAll}>Advanced Filters</Typography>
                        </Box>
                       
                    </Grid>
                    <Stack direction="row" justifyContent={"flex-end"} spacing={1}>
                        <Box>

                            {showAll ? (<IconButton onClick={toggleAll}>
                                <UnfoldLessDoubleIcon sx={{ color: '#71c1e3' }} />
                            </IconButton>) : (<IconButton onClick={toggleAll}>
                                <UnfoldMoreDoubleIcon sx={{ color: '#71c1e3' }} />
                            </IconButton>)}
                        </Box>
                    </Stack>
                </Stack>

                <Box sx={{ margin: '10px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12 / 2} md={12/4} xl={12/7}>
                            <Grid container direction="row" alignItems="center">

                                <Typography sx={{ color: '#999999' }} variant="h6" onClick={toggleAcousticness}>Acousticness</Typography>
                                {showAcousticness ?
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleAcousticness}>
                                        <KeyboardArrowDownIcon sx={{ color: '#999999' }} />
                                    </IconButton>
                                    ) :
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleAcousticness}>
                                        <KeyboardArrowUpIcon sx={{ color: '#999999' }} />
                                    </IconButton >)}
                            </Grid>
                            <Box sx={{ margin: '10px' }}>
                                <Collapse in={showAcousticness}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>

                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useMAc} onChange={toggleUseMAc} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Min/Max Acousticness'} />
                                            </FormGroup>
                                            <Slider
                                                sx={{ color: '#71c1e3' }}
                                                size="small"
                                                getAriaLabel={() => 'Min/Max Acousticness'}
                                                value={valueMAc}
                                                onChange={handleMAc}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={valuetext}
                                                disableSwap
                                                disabled={!useMAc}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useAc} onChange={toggleUseAc} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Target Acousticness'} />
                                            </FormGroup>                                                <Slider
                                                size="small"
                                                sx={{ color: '#71c1e3' }}
                                                value={typeof valueAc === 'number' ? valueAc : 0}
                                                onChange={handleAc}
                                                aria-labelledby="input-slider"
                                                valueLabelDisplay="auto"
                                                disabled={!useAc}

                                            />
                                        </Grid>
                                    </Grid>
                                </Collapse>
                            </Box>
                        </Grid>
                        <Grid item xs={12 / 2} md={12/4} xl={12/7}>
                            <Grid container direction="row" alignItems="center">

                                <Typography sx={{ color: '#999999' }} variant="h6" onClick={toggleDanceability}>Danceability</Typography>
                                {showDanceability ?
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleDanceability}>
                                        <KeyboardArrowDownIcon sx={{ color: '#999999' }} />
                                    </IconButton>
                                    ) :
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleDanceability}>
                                        <KeyboardArrowUpIcon sx={{ color: '#999999' }} />
                                    </IconButton >)}
                            </Grid>
                            <Box sx={{ margin: '10px' }}>
                                <Collapse in={showDanceability}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>

                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useMDa} onChange={toggleUseMDa} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Min/Max Danceability'} />
                                            </FormGroup>
                                            <Slider
                                                sx={{ color: '#71c1e3' }}
                                                size="small"
                                                getAriaLabel={() => 'Min/Max Danceability'}
                                                value={valueMDa}
                                                onChange={handleMDa}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={valuetext}
                                                disableSwap
                                                disabled={!useMDa}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useDa} onChange={toggleUseDa} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Target Danceability'} />
                                            </FormGroup>
                                            <Slider
                                                size="small"
                                                sx={{ color: '#71c1e3' }}
                                                value={typeof valueDa === 'number' ? valueDa : 0}
                                                onChange={handleDa}
                                                aria-labelledby="input-slider"
                                                valueLabelDisplay="auto"
                                                disabled={!useDa}

                                            />
                                        </Grid>
                                    </Grid>
                                </Collapse>
                            </Box>
                        </Grid>
                        <Grid item xs={12 / 2} md={12/4} xl={12/7}>
                            <Grid container direction="row" alignItems="center">

                                <Typography sx={{ color: '#999999' }} variant="h6" onClick={toggleDuration}>Duration</Typography>
                                {showDuration ?
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleDuration}>
                                        <KeyboardArrowDownIcon sx={{ color: '#999999' }} />
                                    </IconButton>
                                    ) :
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleDuration}>
                                        <KeyboardArrowUpIcon sx={{ color: '#999999' }} />
                                    </IconButton >)}
                            </Grid>
                            <Box sx={{ margin: '10px' }}>
                                <Collapse in={showDuration}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>

                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useMDu} onChange={toggleUseMDu} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Max Duration'} />
                                            </FormGroup>
                                            <Slider
                                                sx={{ color: '#71c1e3' }}
                                                size="small"
                                                getAriaLabel={() => 'Max Duration'}
                                                value={valueMDu}
                                                onChange={handleMDu}
                                                valueLabelFormat={value => <div>{msToTime(value*1000)}</div>}
                                                valueLabelDisplay="auto"
                                                disableSwap
                                                disabled={!useMDu}
                                                min={0} max={600}

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useDu} onChange={toggleUseDu} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Min Duration'} />
                                            </FormGroup>
                                            <Slider
                                                size="small"
                                                sx={{ color: '#71c1e3' }}
                                                value={typeof valueDu === 'number' ? valueDu : 0}
                                                onChange={handleDu}
                                                valueLabelFormat={value => <div>{msToTime(value*1000)}</div>}
                                                aria-labelledby="input-slider"
                                                valueLabelDisplay="auto"
                                                disabled={!useDu}
                                                min={0} max={600}

                                            />
                                        </Grid>
                                    </Grid>
                                </Collapse>
                            </Box>
                        </Grid>
                        <Grid item xs={12 / 2} md={12/4} xl={12/7}>
                            <Grid container direction="row" alignItems="center">

                                <Typography sx={{ color: '#999999' }} variant="h6" onClick={toggleEnergy}>Energy</Typography>
                                {showEnergy ?
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleEnergy}>
                                        <KeyboardArrowDownIcon sx={{ color: '#999999' }} />
                                    </IconButton>
                                    ) :
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleEnergy}>
                                        <KeyboardArrowUpIcon sx={{ color: '#999999' }} />
                                    </IconButton >)}
                            </Grid>
                            <Box sx={{ margin: '10px' }}>
                                <Collapse in={showEnergy}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>

                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useMEn} onChange={toggleUseMEn} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Min/Max Energy'} />
                                            </FormGroup>
                                            <Slider
                                                sx={{ color: '#71c1e3' }}
                                                size="small"
                                                getAriaLabel={() => 'Min/Max Energy'}
                                                value={valueMEn}
                                                onChange={handleMEn}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={valuetext}
                                                disableSwap
                                                disabled={!useMEn}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useEn} onChange={toggleUseEn} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Target Energy'} />
                                            </FormGroup>
                                            <Slider
                                                size="small"
                                                sx={{ color: '#71c1e3' }}
                                                value={typeof valueEn === 'number' ? valueEn : 0}
                                                onChange={handleEn}
                                                aria-labelledby="input-slider"
                                                valueLabelDisplay="auto"
                                                disabled={!useEn}

                                            />
                                        </Grid>
                                    </Grid>
                                </Collapse>
                            </Box>
                        </Grid>
                        <Grid item xs={12 / 2} md={12/4} xl={12/7}>
                            <Grid container direction="row" alignItems="center">

                                <Typography sx={{ color: '#999999' }} variant="h6" onClick={toggleInstrumentalness}>Instrumentalness</Typography>
                                {showInstrumentalness ?
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleInstrumentalness}>
                                        <KeyboardArrowDownIcon sx={{ color: '#999999' }} />
                                    </IconButton>
                                    ) :
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleInstrumentalness}>
                                        <KeyboardArrowUpIcon sx={{ color: '#999999' }} />
                                    </IconButton >)}
                            </Grid>
                            <Box sx={{ margin: '10px' }}>
                                <Collapse in={showInstrumentalness}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>

                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useMIn} onChange={toggleUseMIn} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Min/Max Instrumentalness'} />
                                            </FormGroup>
                                            <Slider
                                                sx={{ color: '#71c1e3' }}
                                                size="small"
                                                getAriaLabel={() => 'Min/Max Instrumentalness'}
                                                value={valueMIn}
                                                onChange={handleMIn}
                                                valueLabelDisplay="auto"
                                                getAriaValueText={valuetext}
                                                disableSwap
                                                disabled={!useMIn}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useIn} onChange={toggleUseIn} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Target Instrumentalness'} />
                                            </FormGroup>
                                            <Slider
                                                size="small"
                                                sx={{ color: '#71c1e3' }}
                                                value={typeof valueIn === 'number' ? valueIn : 0}
                                                onChange={handleIn}
                                                aria-labelledby="input-slider"
                                                valueLabelDisplay="auto"
                                                disabled={!useIn}

                                            />
                                        </Grid>
                                    </Grid>
                                </Collapse>
                            </Box>
                        </Grid>
                        <Grid item xs={12 / 2} md={12/4} xl={12/7}>
                            <Grid container direction="row" alignItems="center">

                                <Typography sx={{ color: '#999999' }} variant="h6" onClick={toggleKey}>Key</Typography>
                                {showKey ?
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleKey}>
                                        <KeyboardArrowDownIcon sx={{ color: '#999999' }} />
                                    </IconButton>
                                    ) :
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleKey}>
                                        <KeyboardArrowUpIcon sx={{ color: '#999999' }} />
                                    </IconButton >)}
                            </Grid>
                            <Box sx={{ margin: '10px' }}>
                                <Collapse in={showKey}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>

                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useMKe} onChange={toggleUseMKe} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Min/Max Key'} />
                                            </FormGroup>
                                            <Slider
                                                sx={{ color: '#71c1e3' }}
                                                size="small"
                                                getAriaLabel={() => 'Min/Max Key'}
                                                value={valueMKe}
                                                valueLabelFormat={value => <div>{getKey(value)}</div>}
                                                onChange={handleMKe}
                                                valueLabelDisplay="auto"
                                                disableSwap
                                                disabled={!useMKe}
                                                min={0} max={11}

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useKe} onChange={toggleUseKe} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Target Key'} />
                                            </FormGroup>
                                            <Slider
                                                size="small"
                                                sx={{ color: '#71c1e3' }}
                                                value={valueKe}
                                                valueLabelFormat={getKey(valueKe)}
                                                onChange={handleKe}
                                                aria-labelledby="input-slider"
                                                valueLabelDisplay="auto"
                                                disabled={!useKe}
                                                min={0} max={11}

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useMo} onChange={toggleUseMo} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Mode'} />
                                            </FormGroup>
                                            <FormGroup>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography sx={{ color: '#999999' }}>Minor</Typography>
                                                    <Switch style={{ color: "#71c1e3", }} checked={valueMo} onChange={handleMo} disabled={!useMo} />
                                                    <Typography sx={{ color: '#999999' }}>Major</Typography>
                                                </Stack>
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                </Collapse>
                            </Box>
                        </Grid>
                        <Grid item xs={12 / 2} md={12/4} xl={12/7}>
                            <Grid container direction="row" alignItems="center">

                                <Typography sx={{ color: '#999999' }} variant="h6" onClick={toggleLiveness}>Liveness</Typography>
                                {showLiveness ?
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleLiveness}>
                                        <KeyboardArrowDownIcon sx={{ color: '#999999' }} />
                                    </IconButton>
                                    ) :
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleLiveness}>
                                        <KeyboardArrowUpIcon sx={{ color: '#999999' }} />
                                    </IconButton >)}
                            </Grid>
                            <Box sx={{ margin: '10px' }}>
                                <Collapse in={showLiveness}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>

                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useMLi} onChange={toggleUseMLi} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Min/Max Liveness'} />
                                            </FormGroup>
                                            <Slider
                                                sx={{ color: '#71c1e3' }}
                                                size="small"
                                                getAriaLabel={() => 'Min/Max Liveness'}
                                                value={valueMLi}
                                                onChange={handleMLi}
                                                valueLabelDisplay="auto"
                                                disableSwap
                                                disabled={!useMLi}

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useLi} onChange={toggleUseLi} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Target Liveness'} />
                                            </FormGroup>
                                            <Slider
                                                size="small"
                                                sx={{ color: '#71c1e3' }}
                                                value={valueLi}
                                                onChange={handleLi}
                                                aria-labelledby="input-slider"
                                                valueLabelDisplay="auto"
                                                disabled={!useLi}

                                            />
                                        </Grid>
                                    </Grid>
                                </Collapse>
                            </Box>
                        </Grid>
                        <Grid item xs={12 / 2} md={12/4} xl={12/7}>
                            <Grid container direction="row" alignItems="center">

                                <Typography sx={{ color: '#999999' }} variant="h6" onClick={toggleLoudness}>Loudness</Typography>
                                {showLoudness ?
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleLoudness}>
                                        <KeyboardArrowDownIcon sx={{ color: '#999999' }} />
                                    </IconButton>
                                    ) :
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleLoudness}>
                                        <KeyboardArrowUpIcon sx={{ color: '#999999' }} />
                                    </IconButton >)}
                            </Grid>
                            <Box sx={{ margin: '10px' }}>
                                <Collapse in={showLoudness}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>

                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useMLo} onChange={toggleUseMLo} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Min/Max Loudness'} />
                                            </FormGroup>
                                            <Slider
                                                sx={{ color: '#71c1e3' }}
                                                size="small"
                                                getAriaLabel={() => 'Min/Max Loudness'}
                                                value={valueMLo}
                                                onChange={handleMLo}
                                                valueLabelDisplay="auto"
                                                disableSwap
                                                disabled={!useMLo}
                                                min={-60} max={0}

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useLo} onChange={toggleUseLo} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Target Loudness'} />
                                            </FormGroup>
                                            <Slider
                                                size="small"
                                                sx={{ color: '#71c1e3' }}
                                                value={valueLo}
                                                onChange={handleLo}
                                                aria-labelledby="input-slider"
                                                valueLabelDisplay="auto"
                                                disabled={!useLo}
                                                min={-60} max={0}

                                            />
                                        </Grid>
                                    </Grid>
                                </Collapse>
                            </Box>
                        </Grid>
                        <Grid item xs={12 / 2} md={12/4} xl={12/7}>
                            <Grid container direction="row" alignItems="center">

                                <Typography sx={{ color: '#999999' }} variant="h6" onClick={togglePopularity}>Popularity</Typography>
                                {showPopularity ?
                                    (<IconButton sx={{ color: '#999999' }} onClick={togglePopularity}>
                                        <KeyboardArrowDownIcon sx={{ color: '#999999' }} />
                                    </IconButton>
                                    ) :
                                    (<IconButton sx={{ color: '#999999' }} onClick={togglePopularity}>
                                        <KeyboardArrowUpIcon sx={{ color: '#999999' }} />
                                    </IconButton >)}
                            </Grid>
                            <Box sx={{ margin: '10px' }}>
                                <Collapse in={showPopularity}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>

                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useMPo} onChange={toggleUseMPo} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Min/Max Popularity'} />
                                            </FormGroup>
                                            <Slider
                                                sx={{ color: '#71c1e3' }}
                                                size="small"
                                                getAriaLabel={() => 'Min/Max Popularity'}
                                                value={valueMPo}
                                                onChange={handleMPo}
                                                valueLabelDisplay="auto"
                                                disableSwap
                                                disabled={!useMPo}

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={usePo} onChange={toggleUsePo} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Target Popularity'} />
                                            </FormGroup>
                                            <Slider
                                                size="small"
                                                sx={{ color: '#71c1e3' }}
                                                value={valuePo}
                                                onChange={handlePo}
                                                aria-labelledby="input-slider"
                                                valueLabelDisplay="auto"
                                                disabled={!usePo}

                                            />
                                        </Grid>
                                    </Grid>
                                </Collapse>
                            </Box>
                        </Grid>
                        <Grid item xs={12 / 2} md={12/4} xl={12/7}>
                            <Grid container direction="row" alignItems="center">

                                <Typography sx={{ color: '#999999' }} variant="h6" onClick={toggleSpeechiness}>Speechiness</Typography>
                                {showSpeechiness ?
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleSpeechiness}>
                                        <KeyboardArrowDownIcon sx={{ color: '#999999' }} />
                                    </IconButton>
                                    ) :
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleSpeechiness}>
                                        <KeyboardArrowUpIcon sx={{ color: '#999999' }} />
                                    </IconButton >)}
                            </Grid>
                            <Box sx={{ margin: '10px' }}>
                                <Collapse in={showSpeechiness}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>

                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useMSp} onChange={toggleUseMSp} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Min/Max Speechiness'} />
                                            </FormGroup>
                                            <Slider
                                                sx={{ color: '#71c1e3' }}
                                                size="small"
                                                getAriaLabel={() => 'Min/Max Speechiness'}
                                                value={valueMSp}
                                                onChange={handleMSp}
                                                valueLabelDisplay="auto"
                                                disableSwap
                                                disabled={!useMSp}

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useSp} onChange={toggleUseSp} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Target Speechiness'} />
                                            </FormGroup>
                                            <Slider
                                                size="small"
                                                sx={{ color: '#71c1e3' }}
                                                value={valueSp}
                                                onChange={handleSp}
                                                aria-labelledby="input-slider"
                                                valueLabelDisplay="auto"
                                                disabled={!useSp}

                                            />
                                        </Grid>
                                    </Grid>
                                </Collapse>
                            </Box>
                        </Grid>
                        <Grid item xs={12 / 2} md={12/4} xl={12/7}>
                            <Grid container direction="row" alignItems="center">

                                <Typography sx={{ color: '#999999' }} variant="h6" onClick={toggleTempo}>Tempo</Typography>
                                {showTempo ?
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleTempo}>
                                        <KeyboardArrowDownIcon sx={{ color: '#999999' }} />
                                    </IconButton>
                                    ) :
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleTempo}>
                                        <KeyboardArrowUpIcon sx={{ color: '#999999' }} />
                                    </IconButton >)}
                            </Grid>
                            <Box sx={{ margin: '10px' }}>
                                <Collapse in={showTempo}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>

                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useMTe} onChange={toggleUseMTe} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Min/Max Tempo'} />
                                            </FormGroup>
                                            <Slider
                                                sx={{ color: '#71c1e3' }}
                                                size="small"
                                                getAriaLabel={() => 'Min/Max Tempo'}
                                                value={valueMTe}
                                                onChange={handleMTe}
                                                valueLabelDisplay="auto"
                                                disableSwap
                                                disabled={!useMTe}
                                                min={0} max={250}

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useTe} onChange={toggleUseTe} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Target Tempo'} />
                                            </FormGroup>
                                            <Slider
                                                size="small"
                                                sx={{ color: '#71c1e3' }}
                                                value={valueTe}
                                                onChange={handleTe}
                                                aria-labelledby="input-slider"
                                                valueLabelDisplay="auto"
                                                disabled={!useTe}
                                                min={0} max={250}

                                            />
                                        </Grid>
                                    </Grid>
                                </Collapse>
                            </Box>
                        </Grid>
                        <Grid item xs={12 / 2} md={12/4} xl={12/7}>
                            <Grid container direction="row" alignItems="center">

                                <Typography sx={{ color: '#999999' }} variant="h6" onClick={toggleTimeSig}>Time Signature</Typography>
                                {showTimeSig ?
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleTimeSig}>
                                        <KeyboardArrowDownIcon sx={{ color: '#999999' }} />
                                    </IconButton>
                                    ) :
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleTimeSig}>
                                        <KeyboardArrowUpIcon sx={{ color: '#999999' }} />
                                    </IconButton >)}
                            </Grid>
                            <Box sx={{ margin: '10px' }}>
                                <Collapse in={showTimeSig}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>

                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useMTS} onChange={toggleUseMTS} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Min/Max Time Signature'} />
                                            </FormGroup>
                                            <Slider
                                                sx={{ color: '#71c1e3' }}
                                                size="small"
                                                getAriaLabel={() => 'Min/Max Time Signature'}
                                                value={valueMTS}
                                                onChange={handleMTS}
                                                valueLabelDisplay="auto"
                                                disableSwap
                                                disabled={!useMTS}
                                                min={3} max={7}

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useTS} onChange={toggleUseTS} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Target Time Signature'} />
                                            </FormGroup>
                                            <Slider
                                                size="small"
                                                sx={{ color: '#71c1e3' }}
                                                value={valueTS}
                                                onChange={handleTS}
                                                aria-labelledby="input-slider"
                                                valueLabelDisplay="auto"
                                                disabled={!useTS}
                                                min={3} max={7}

                                            />
                                        </Grid>
                                    </Grid>
                                </Collapse>
                            </Box>
                        </Grid>
                        <Grid item xs={12 / 2} md={12/4} xl={12/7}>
                            <Grid container direction="row" alignItems="center">
                                <Typography sx={{ color: '#999999' }} variant="h6" onClick={toggleValence}>Valence</Typography>
                                {showValence ?
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleValence}>
                                        <KeyboardArrowDownIcon sx={{ color: '#999999' }} />
                                    </IconButton>
                                    ) :
                                    (<IconButton sx={{ color: '#999999' }} onClick={toggleValence}>
                                        <KeyboardArrowUpIcon sx={{ color: '#999999' }} />
                                    </IconButton >)}
                            </Grid>
                            <Box sx={{ margin: '10px' }}>
                                <Collapse in={showValence}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>

                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useMVa} onChange={toggleUseMVa} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Min/Max Valence'} />
                                            </FormGroup>
                                            <Slider
                                                sx={{ color: '#71c1e3' }}
                                                size="small"
                                                getAriaLabel={() => 'Min/Max Valence'}
                                                value={valueMVa}
                                                onChange={handleMVa}
                                                valueLabelDisplay="auto"
                                                disableSwap
                                                disabled={!useMVa}

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormGroup>
                                                <FormControlLabel sx={{ color: '#999999' }}
                                                    control={<Checkbox defaultChecked={false} checked={useVa} onChange={toggleUseVa} style={{
                                                        color: "#71c1e3",

                                                    }} />} label={'Target Valence'} />
                                            </FormGroup>
                                            <Slider
                                                size="small"
                                                sx={{ color: '#71c1e3' }}
                                                value={valueVa}
                                                onChange={handleVa}
                                                aria-labelledby="input-slider"
                                                valueLabelDisplay="auto"
                                                disabled={!useVa}

                                            />
                                        </Grid>
                                    </Grid>
                                </Collapse>
                            </Box>
                        </Grid>

                    </Grid>
                </Box>
            </Box>
        </Card >
    );
}