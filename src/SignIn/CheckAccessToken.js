
export default function refreshToken() {
    const expires = parseInt(localStorage.getItem('expires'));
    const current = new Date().getTime();
    if (current >= expires) {
        console.log("Access Token Expired");
        return true
    }
    else {
        console.log(expires);
        console.log("Access Token Valid");
        return false
    }




}