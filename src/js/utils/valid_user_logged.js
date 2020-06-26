window.onload = () => {
    if (!window.localStorage.getItem('token')) {
        window.location.href = './index.html'
    }
}