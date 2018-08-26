import moment from 'moment';
import validateAuth from '../helpers/validationHelpers';
import pool from '../helpers/dbHelper'
/**
 * @exports
 * @class AnswerController
 */
class AnswerController {

  /**
       * Returns an Answer
       * @method postAnswers
       * @memberof AnswerController
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */
  static postAnswers(req, res) {
    const errors = validateAuth.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }

    const questionId = req.params.questionId;
    const userId = req.userId;
    const { answerBody } = req.body;

    const createdAt = moment().format('YYYY-MM-DD');
    const getQuestionQuery = `SELECT * FROM questions WHERE id = '${questionId}'`;

    const addAnswerQuery = `INSERT INTO answers (user_id,question_id,answer_body,created_at) VALUES ('${userId}', '${questionId}','${answerBody}','${createdAt}') RETURNING *`
    pool.query(getQuestionQuery)
      .then((result) => {

        if (result.rowCount === 0) {
          return res.status(404).json({ status: 'Not FOund', message: 'There is no question with that Question ID' })
        }
        pool.query(addAnswerQuery)
          .then((result1) => {
            res.status(201).json({
              status: 'Successful',
              message: 'Answer added successfully',
              Answer: result1.rows[0]
            })
          })
          .catch(() => res.status(500).json({ message: 'An internal error occured' }));
        return null;
      })
    return null;
  }

  

  static getUserId(req) {
    return req.userId;
  }

  /**
           * Returns a Answers
           * @method getAnswers
           * @memberof AnswerController
           * @param {object} req
           * @param {object} res
           * @returns {(function|object)} Function next() or JSON object
           */





}

export default AnswerController;
