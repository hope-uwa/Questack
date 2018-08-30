import {
  check, param, validationResult
} from 'express-validator/check';

const trimWhiteSpaces = (input) => {
  const trimedString = input.replace(/^\s+|\s+$/g, '');
  return trimedString;
};


const validateAuth = {

  login: [
    check('email', 'email is required')
      .exists(),
    check('email', 'please, enter a valid email')
      .isEmail(),
    check('password', 'password is required')
      .exists()
  ],
  signUp: [
    check('username', 'Username is required and should be a minimum of 4 characters')
      .isLength({ min: 4 })
      .custom((value) => {
        if (trimWhiteSpaces(value).length < 4) {
          throw new Error('Username should be a minimum of 4 characters');
        } else {
          return value;
        }
      }),
    check('email', 'email is required')
      .exists(),
    check('email', 'please, enter a valid email')
      .isEmail(),
    check('password', 'password is required').exists(),
    check('password', 'password should be a minimum of 6 chracters')
      .isLength({ min: 6 })
      .custom((value) => {
        if (trimWhiteSpaces(value).length < 6) {
          throw new Error('First name should be a minimum of 6 characters');
        }

        return value;

      })
  ],



  postQuestion: [

    check('title', 'Title of question is required')
      .exists(),
    check('body', 'Body for question  is required')
      .exists(),
    check('title', 'The title of the question can not be empty').not().isEmpty(),
    check('body', 'The Content of the question can not be empty').not().isEmpty()

  ],
  getQuestion: [

    param('questionId', 'Question Id must be an integer').isInt()
  ],
  postAnswer: [

    check('body', 'Answer is required')
      .exists(),
    check('body', 'Content of answer can not be empty').not().isEmpty(),
    param('questionId', 'Question Id must be an integer').isInt()


  ],
  getAnswers: [
    param('questionId', 'Question Id must be integer').isInt()
  ],
  getAnswer: [

    param('questionId', 'Question Id must be an integer').isInt(),
    param('answerId', 'Answer Id must be an integer').isInt()
  ],
  updateAnswer: [
    check('body', 'Content of answer is required')
      .exists(),
    check('body', 'Content of answer can not be empty').not().isEmpty(),
    param('answerId', ' Answer Id must be an integer').isInt(),
    param('questionId', 'Question Id must be an integar').isInt()
  ],
  specialUpdate: [
    param('answerId', ' Answer Id must be integer').isInt(),
    param('questionId', 'Question Id must be an integar').isInt()
  ],
  postComments: [
    param('answerId', 'Answer Id must be integer').isInt(),
    param('questionId', 'Question Id must be an integar').isInt(),
    check('body', 'Comment content is required')
      .exists(),
    check('body', 'Comment content can not be empty').not().isEmpty()
  ],
  validationResult
};

export default validateAuth;
