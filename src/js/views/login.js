const btnLogin = document.getElementById('btn-login')

btnLogin.onclick = (e) => loginBtnClick(e)

function loginBtnClick(e) {
    let loginForm = new FormData(document.getElementById('login-form'))
    let loginCredentials = {
        "username": loginForm.get('username'),
        "password": loginForm.get('password')
    }
    e.preventDefault()
    loginRequest(loginCredentials).catch(e => console.log(e))
}
