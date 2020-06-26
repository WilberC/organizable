function loginRequest(loginCredentials) {
    fetch('http://127.0.0.1:3000/login', {
        method: 'POST',
        body: JSON.stringify(loginCredentials),
        headers: {'Content-Type': 'application/json'},
    }).then((response) => {
        if (!response.ok) {
            return response.json().then((error) => alert(error['errors']['message']))
        }
        return response.json()
    }).then((data => {
        window.localStorage.setItem('token', data['token']);
        delete data['token']
        window.localStorage.setItem('user_info', JSON.stringify(data));
        window.location.href = './my-boards.html'
    }))
}