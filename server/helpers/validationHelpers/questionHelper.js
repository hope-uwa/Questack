const questionErrorReporter = (req) => {
  const error = [];
  if (req.body.title === undefined && req.body.body === undefined) {
    error[0] = 'Please fill in the required fields'
  }

  return error
}

export default questionErrorReporter;



