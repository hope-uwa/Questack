const signupForm = document.getElementById('signup-form');
const signUrl = '/api/v1/auth/signup';
const signupBtn = document.getElementById('signupBtn');


signupForm.addEventListener('submit', signup);

function signup(event) {
    event.preventDefault();
    signupBtn.disabled = true;
    signupBtn.innerHTML = 'Creating your account..';
    let username = document.getElementById('username1').value;
    let email = document.getElementById('email1').value;
    let password = document.getElementById('password1').value;
    //add conditonal statements here
    console.log(username)
    console.log(email)
    console.log(password)
    fetch(signUrl, {
        method: 'POST',
        body: JSON.stringify({ username: username, email: email, password: password }),
        headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
        response.json().then((message) => {
            if (response.status !== 201) {
                alert('Could not signup User');
                signupBtn.disabled = false;
                signupBtn.innerHTML = 'Signup'
                return null;
            }
            localStorage.setItem('ascii-mt-token', message.token);
            localStorage.setItem('ascii-mt-username', message.userName);
            console.log(message.userName)

            window.setTimeout(() => { window.location.href = '/profile'; }, 1000);
            return null;


        })
    })
        .catch((err) => {
            console.log(err)
        })



}