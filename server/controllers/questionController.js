import moment from 'moment';
import pool from '../helpers/dbHelper';
import validateAuth from '../helpers/validationHelpers';
import status from '../data/status.json'

/**
 * @exports
 * @class QuestionController
 */
class QuestionController {

  /**
       * Returns a list of Questions
       * @method allQuestions
       * @memberof QuestionController
       * @desc should query for all questions on db
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */

  static allQuestions(req, res) {
    const allQuestions = 'SELECT * FROM questions';


    pool.query(allQuestions)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(204).json({ status: status[204], data: 'No question has been added' });
        } return res.status(200).json({ status: status[200], data: result.rows })
      })
      .catch(() => { res.status(500).json({ status: status[500], message: 'An error occured while processing this request' }) })
    return null;
  }

  /**
       * Returns a Question
       * @method getQuestion
       * @memberof QuestionController
       * @desc
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */

  static getQuestion(req, res) {

    const errors = validateAuth.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    const questionId = req.params.questionId;
    const questionQuery = `SELECT * FROM questions WHERE id ='${questionId}'`
    const answerQuery = `SELECT * FROM answers WHERE question_id ='${questionId}'`


    pool.query(questionQuery)
      .then((result) => {
        if (result.rowCount < 1) {
          return res.status(404).json({ status: status[404], message: 'No question with this question Id' });
        }

        pool.query(answerQuery)
          .then((result1) => {
            if (result1.rowCount === 0) {
              return res.status(200).json({
                status: status[200],
                question: {
                  title: result.rows[0].question_title,
                  body: result.rows[0].question_body,
                  userId: result.rows[0].user_id,
                  dateCreated: result.rows[0].created_at
                },
                answers: 'No answer added yet'
              });
            }

            return res.status(200).json({
              status: status[200],
              question: {
                title: result.rows[0].question_title,
                body: result.rows[0].question_body,
                userId: result.rows[0].user_id,
                dateCreated: result.rows[0].created_at
              },
              answers: result1.rows
            })

          })
        return null

      })
      .catch(() => res.status(500).json({ message: 'Internal Error Occurred' }))
    return null
  }


  /**
       * Returns a Question
       * @method postQuestions
       * @desc validate Create Question Endpoint
       * @memberof QuestionController
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */
  static postQuestions(req, res) {

    const errors = validateAuth.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }


    const { questionTitle, questionBody } = req.body;
    const userId = req.userId;
    const createdAt = moment().format('YYYY-MM-DD');


    const postQuery = `INSERT INTO questions (user_id,question_title,question_body,created_at) VALUES ('${userId}', '${questionTitle}','${questionBody}','${createdAt}') returning *`;
    pool.query(postQuery)
      .then(result => res.status(201).json({
        status: status[201],
        message: 'Question Added Successfully',
        data: {
          title: result.rows[0].question_title,
          body: result.rows[0].question_body,
          userId: result.rows[0].user_id,
          createdAt: result.rows[0].created_at
        }

      }))
      .catch(() => res.status(500).json({ message: 'An internal error occured' }))
    return null;


  }


  /**
       * Returns a message
       * @method deleteQuestion
       * @memberof QuestionController
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */

  static deleteQuestion(req, res) {

    const errors = validateAuth.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    const questionId = req.params.questionId;
    const userId = req.userId;

    const findQuestion = `SELECT * FROM questions WHERE id ='${questionId}'`;
    const deleteQuestion = `DELETE FROM questions WHERE id = '${questionId}' `;
    pool.query(findQuestion)
      .then((result) => {
        if (result.rowCount === 0) {
          res.status(404).json({ status: status[404], message: 'Theres no question with that ID' })
        } else if (result.rows[0].user_id !== userId) {
          res.status(401).json({ status: status[401], message: 'You can not delete this question because you are not the author' })
        } else {
          pool.query(deleteQuestion)
            .then(() => {
              res.status(200).json({ status: status[200], message: 'The message has been deleted successfully' })
            })
            .catch(() => {
              res.status(500).json({ message: 'An internal error occured' });
              return null;
            })
        }
      })
    return null;
  }

  /**
       * Returns a message
       * @method userQuestion
       * @memberof QuestionController
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */

  static userQuestions(req, res) {
     const userId = req.userId;
    const allQuestions = `SELECT * FROM questions where user_id = ${userId}`;


    pool.query(allQuestions)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(204).json({ status: status[200], data: 'You have no question added' });
        } return res.status(200).json({ status: status[200], data: result.rows })
      })
      .catch(() => { res.status(500).json({ status: status[500], message: 'An error occured while processing this request' }) })
    return null;

  }





}

export default QuestionController;
