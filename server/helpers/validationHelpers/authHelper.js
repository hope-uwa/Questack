const ErrorReporter = (req) => {
  const error = [];

  if (req.body.username === '' || req.body.username === undefined) {

   const usernameError= 'Username is required';
    error.push(usernameError)
  }
  if (req.body.email === '' || req.body.email === undefined) {
    const emailError = 'Email is required'
    error.push(emailError)
  }
  if (req.body.password === '' || req.body.password === undefined) {
    const passwordError = 'Password is required'
    error.push(passwordError)
  }
  return error

}

export default ErrorReporter;


