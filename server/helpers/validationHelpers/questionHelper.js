const questionErrorReporter = (req) => {
  const error = [];
  if (req.body.title === undefined && req.body.body === undefined) {
    error[0] = 'Question title and content is required'
  }

  return error
}

export default questionErrorReporter;



