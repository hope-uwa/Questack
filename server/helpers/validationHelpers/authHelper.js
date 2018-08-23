import {
  check, param, header, validationResult
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
    check('Username', 'Username is required and should be a minimum of 4 characters')
      .isLength({ min: 4 })
      .custom((value) => {
        if (trimWhiteSpaces(value).length < 3) {
          throw new Error('First name should be a minimum of 3 characters');
        } else {
          return value;
        }
      }),
    check('email', 'email is required')
      .exists(),
    check('email', 'please, enter a valid email')
      .isEmail(),
    check('password', 'password should be a minimum of 6 chracters')
      .isLength({ min: 6 })
      .custom((value, { req }) => {
        if (trimWhiteSpaces(value).length < 6) {
          throw new Error('First name should be a minimum of 6 characters');
        }
        if (value !== req.body.confirmPassword) {
          throw new Error("Password doesn't match");
        } else {
          return value;
        }
      })
  ],

  postQuestion: [

    check('questionTitle', 'Question title is required')
      .exists(),
    check('questionBody', 'Question Body is required')
      .exists(),
    check('questionTitle', 'Question title can not be empty').isEmpty(),
    check('questionBody', 'Question body can not be empty').isEmpty()

  ],
  getQuestion: [

    param('questionId', 'Id must be integer').isInt()
  ],
  postAnswer: [

    check('answerBody', 'Answer Body is required')
      .exists(),
    check('answerBody', 'Answer body can not be empty').isEmpty(),
    param('questionId', 'Question ID must be an integer').isInt()

  ],
  getAnswer: [

    param('questionId', 'Id must be integer').isInt(),
    param('answerId', 'Id must be integer').isInt()
  ]

};

export default validateAuth;
