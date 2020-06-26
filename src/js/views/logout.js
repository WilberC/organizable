export function logoutLinkClick() {
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('user_info');
    alert('Good By :3')
    window.location.href = './index.html'
}