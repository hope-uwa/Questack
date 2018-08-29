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

    check('questionTitle', 'Question title is required')
      .exists(),
    check('questionBody', 'Question Body is required')
      .exists(),
    check('questionTitle', 'Question title can not be empty').not().isEmpty(),
    check('questionBody', 'Question body can not be empty').not().isEmpty()

  ],
  getQuestion: [

    param('questionId', 'Question Id must be a number').isInt()
  ],
  postAnswer: [

    check('answerBody', 'Answer Body is required')
      .exists(),
    check('answerBody', 'Answer body can not be empty').not().isEmpty(),
    param('questionId', 'Question ID must be an integer').isInt()


  ],
  getAnswer: [

    param('questionId', 'Id must be integer').isInt(),
    param('answerId', 'Id must be integer').isInt()
  ],
  updateAnswer: [
    check('answerBody', 'Answer Body is required')
      .exists(),
    check('answerBody', 'Answer body can not be empty').not().isEmpty(),
    param('answerId', 'Id must be integer').isInt(),
    param('questionId','Id must be an integar').isInt()
  ],
  postComments: [
    param('answerId', 'Id must be integer').isInt(),
    param('questionId','Id must be an integar').isInt(),
    check('comment', 'Comment Body is required')
      .exists(),
    check('comment', 'Comment body can not be empty').not().isEmpty()
  ]
  validationResult
};

export default validateAuth;
