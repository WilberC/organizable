const btnSignUp = document.getElementById('btn-sign-up')

btnSignUp.onclick = (e) => {
    let signUpForm = new FormData(document.getElementById('sign-up-form'))
    let signUpData = {
        "user": {
            "username": signUpForm.get('username'),
            "email": signUpForm.get('email'),
            "first_name": signUpForm.get('first_name'),
            "last_name": signUpForm.get('last_name'),
            "password": signUpForm.get('password')
        }
    }
    let signUpLoginData = {
        "username": signUpForm.get('username'),
        "password": signUpForm.get('password')
    }
    signUpBtnClick(e, signUpData, signUpLoginData)
}

function signUpBtnClick(e, signUpData, signUpLoginData) {
    e.preventDefault()
    fetch('http://127.0.0.1:3000/users', {
        method: 'POST',
        body: JSON.stringify(signUpData),
        headers: {'Content-Type': 'application/json'},
    }).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => alert(error['errors']['message']))
        }
        return response.json()
    }).then((data => {
        // console.log('----------')
        // console.log(data)
        // console.log('----------')
        loginRequest(signUpLoginData)
    })).catch(e => console.log(e))
}