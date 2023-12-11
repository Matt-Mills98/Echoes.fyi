
export default async function refreshToken() {
    const clientId = "76b9997e54d64867998b1a05ed376b2c";

    const refresh = localStorage.getItem('refreshToken');
    const url = 'https://accounts.spotify.com/api/token';

    const params2 = new URLSearchParams();
    params2.append("refresh_token", refresh);
    params2.append("grant_type", "refresh_token");
    params2.append("client_id", clientId);

    const payload = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params2
    }
    await fetch(url, payload).then(async (result) => {
        if (result.ok) {
            const response = await result.json();
            const expirationSeconds = response.expires_in;
            const expMS = expirationSeconds * 1000;
            const date = new Date().getTime() + expMS;
            localStorage.setItem('accessToken', response.access_token);
            localStorage.setItem('expires', date.toString());
            localStorage.setItem('refreshToken', response.refresh_token);
            window.location.reload();
            return response.access_token;
        }
        else {

        }
    });

}