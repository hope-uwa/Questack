import moment from 'moment';
import validateAuth from '../helpers/validationHelpers';
import pool from '../helpers/dbHelper'
import status from '../data/status.json'
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
          return res.status(404).json({ status: status[404], message: 'There is no question with that Question ID' })
        }
        pool.query(addAnswerQuery)
          .then((result1) => {
            res.status(201).json({
              status: status[201],
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
       * @method updateAnswer
       * @memberof AnswerController
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */

  static updateAnswer(req, res) {
    const errors = validateAuth.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    const answerId = req.params.answerId;
    const answerQuery = `SELECT * FROM answers WHERE id = '${answerId}'`;
    const updateAnswer = `UPDATE answers SET answer_body = '${req.body.answerBody}' WHERE id = ${answerId}`
    pool.query(answerQuery)
      .then((result) => {
        if (result.rowCount < 1) {
          return res.status(400).json({ status: 'Not FOund' })
        }
        if (result.row[0].user_id !== req.userId) {
          return res.status(401).json({ status: status[401], message: 'You can not edit this answer' })
        }
        pool.query(updateAnswer)
          .then(result1 => res.status(201).json({
            status: status[201],
            message: 'You have successfully updated the answer',
            answer: result1.row[0].answer_body
          }))
          .catch(() => res.status(500).json({ message: 'An internal error occured' }));
        return null;
      })
    return null;
  }

}

export default AnswerController;
