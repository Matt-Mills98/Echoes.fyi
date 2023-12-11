
import { Box } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';


export default function Callback() {
    //const [gotAT, setGotAT] = React.useState(false);
    React.useEffect(() => { getAccessToken() }, []);


    const getAccessToken = async () =>{
        const clientId = "cb2281b91efd4dd2a548e71374e311ff";
        const params = new URLSearchParams(window.location.search);
        const code = params.get("code");
        const verifier = localStorage.getItem("verifier");
        console.log(verifier);

            const params2 = new URLSearchParams();
            params2.append("client_id", clientId);
            params2.append("grant_type", "authorization_code");
            params2.append("code", code);
            params2.append("redirect_uri", "https://echoes.fyi/callback");
            params2.append("code_verifier", verifier);
            console.log(code);

            const result = await fetch("https://accounts.spotify.com/api/token", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: params2
            });
        
            const { access_token, refresh_token } = await result.json();
            
            localStorage.setItem("accessToken", access_token);
            localStorage.setItem("refreshToken", refresh_token);
            //setGotAT(true);
            console.log(access_token);
            //document.location = 'http://localhost:3000/';
        
            
    }
    return (
        <Box>
                <CircularProgress ></CircularProgress>
        </Box>
    );

}