
export default function refreshToken() {
    const expires = parseInt(localStorage.getItem('expires'));
    const current = new Date().getTime();
    if (current >= expires) {
        return true
    }
    else {
     
        return false
    }




}