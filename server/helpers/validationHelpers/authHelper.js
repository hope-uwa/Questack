const ErrorReporter = (req) => {
  const error = [];

  if (req.body.username === '' || req.body.username === undefined) {

    error[0] = 'Username is required';
  }
  if (req.body.email === '' || req.body.email === undefined) {
    error[1] = 'Email is required'
  }
  if (req.body.password === '' || req.body.password === undefined) {
    error[2] = 'Password is required'
  }
  return error

}

export default ErrorReporter;


