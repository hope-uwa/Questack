const loginForm = document.getElementById('login-form');
const loginUrl = 'api/v1/auth/login';
const loginBtn = document.getElementById('loginBtn');


loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  loginBtn.disabled = true;
  loginBtn.innerHTML = 'Login in Progress..';
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  // add conditonal statements here

  console.log(email)
  console.log(password)
  fetch(loginUrl, {
    method: 'POST',
    body: JSON.stringify({ email: email, password: password }),
    headers: { 'Content-Type': 'application/json' }
  }).then((response) => {
    response.json().then((message) => {
      if (response.status !== 200) {
        alert('Could not login User');
        loginBtn.disabled = false;
        loginBtn.innerHTML = 'Login'
        return
      }
      localStorage.setItem('ascii-mt-token', message.token);
      localStorage.setItem('ascii-mt-username', message.name);
      localStorage.setItem('ascii-mt-createdat', message.createdAt);
      console.log(message.token)
      window.setTimeout(() => { window.location.href = '/profile'; }, 1000);
      return null;


    })
  })
    .catch((err) => {
      console.log(err)
    })



})
