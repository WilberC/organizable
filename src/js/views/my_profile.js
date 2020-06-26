import {logoutLinkClick} from "./logout.js";

const btnEditProfile = document.getElementById('btn-edit-profile')
const btnCancelUpdateProfile = document.getElementById('btn-cancel-update-profile')
const btnDeleteProfile = document.getElementById('btn-delete-profile')
const btnUpdateProfile = document.getElementById('btn-update-profile')
let token_user = window.localStorage.getItem('token')
let user_info_data = JSON.parse(window.localStorage.getItem('user_info'))
const fieldsProfile = ['username', 'email', 'firstName', 'lastName']
const userURL = `http://127.0.0.1:3000/users/${user_info_data['id']}`

console.log('----------------------')
console.log(token_user)
console.log('----------------------')
console.log(user_info_data)
console.log('----------------------')

window.onload = function () {
    fieldsProfile.forEach((item) => document.getElementById(item).value = user_info_data[item])
}

btnEditProfile.onclick = () => changeDivGroupState()
btnCancelUpdateProfile.onclick = () => changeDivGroupState()

function changeDivGroupState() {
    document.getElementById('group-edit').classList.toggle('hide')
    document.getElementById('group-save').classList.toggle('hide')
    fieldsProfile.forEach((item) => {
        let isReadOnly = document.getElementById(item).readOnly
        document.getElementById(item).readOnly = !isReadOnly
    })
}

btnDeleteProfile.onclick = function () {
    if (confirm("Are you sure that do you want to delete your account?")) {
        fetch(userURL, {
            method: 'DELETE',
            headers: {'Authorization': `Token token=${token_user}`, 'Content-Type': 'application/json'},
        }).then(() => logoutLinkClick())
    }
}

btnUpdateProfile.onclick = function () {
    if (confirm("Are you sure that do you want to update your profile?")) {
        let profileForm = new FormData(document.getElementById('my-profile-form'))
        let profileData = {
            "user": {
                "username": profileForm.get('username'),
                "email": profileForm.get('email'),
                "first_name": profileForm.get('first_name'),
                "last_name": profileForm.get('last_name')
            }
        }
        fetch(userURL, {
            method: 'PATCH',
            headers: {'Authorization': `Token token=${token_user}`, 'Content-Type': 'application/json'},
            body: JSON.stringify(profileData)
        }).then((response) => {
            if (!response.ok) {
                return response.json().then((error) => alert(error['errors']['message']))
            }
            return response.json()
        }).then((data => {
            window.localStorage.setItem('user_info', JSON.stringify(data))
            fieldsProfile.forEach((item) => document.getElementById(item).value = data[item])
            changeDivGroupState()
            alert('Your user profile was uploaded successfully :)')
        })).catch(e => console.log(e))
    }
}