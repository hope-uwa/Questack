import moment from 'moment';
import pool from '../helpers/dbHelper';
import validateAuth from '../helpers/validationHelpers';
import status from '../data/status.json'
import questionErrorReporter from '../helpers/validationHelpers/questionHelper'

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

    const allQuestions = 'SELECT questions.id, questions.question_title, questions.question_body, questions.created_at, users.user_name FROM questions INNER JOIN users ON questions.user_id=users.id ORDER BY id DESC';

    pool.query(allQuestions)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(200).json({ status: status[200], message: 'No question has been added', data: result.rows });
        } return res.status(200).json({ status: status[200], message: result.rows })
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
      return res.status(400).json({ status: status[400], error: errors.array()[0].msg });
    }
    const { questionId } = req.params;
    // const questionQuery = `SELECT * FROM questions WHERE id ='${questionId}'`
    const answerQuery = `SELECT answers.id, answers.answer_body, answers.created_at, users.user_name FROM answers INNER JOIN users ON answers.user_id=users.id WHERE question_id ='${questionId}'`
    const questionQuery = `SELECT questions.id, questions.question_title, questions.question_body, questions.created_at, users.user_name FROM questions INNER JOIN users ON questions.user_id=users.id WHERE questions.id='${questionId}'   `;
    // const preferredAnswerQuery = `SELECT answers.id, answers.answer_body, answers.created_at, users.user_name FROM answers INNER JOIN users ON answers.user_id=users.id WHERE question_id ='${questionId}'`
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
                  username: result.rows[0].user_name,
                  dateCreated: moment(result.rows[0].created_at).fromNow(),
                  answers: 'No answer added yet'
                }

              });
            }

            return res.status(200).json({
              status: status[200],
              question: {
                title: result.rows[0].question_title,
                body: result.rows[0].question_body,
                username: result.rows[0].user_name,
                dateCreated: moment(result.rows[0].created_at).fromNow(),
                answers: result1.rows
              }

            })

          })
          .catch(() => res.status(500).json({ status: status[500], message: 'Internal Error Occurred' }))
        return null

      })
      .catch(() => res.status(500).json({ status: status[500], message: 'Internal Error Occurred' }))
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
    const err = questionErrorReporter(req);
    if (err.length !== 0) {
      return res.status(400).json({ status: status[400], error: err });
    }

    const errors = validateAuth.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: status[400], error: errors.array()[0].msg });
    }


    const { title, body } = req.body;
    const { userId } = req;
    const createdAt = moment().format();


    const postQuery = `INSERT INTO questions (user_id,question_title,question_body,created_at) VALUES ('${userId}', '${title}','${body}','${createdAt}') returning *`;
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
      .catch(() => res.status(500).json({ status: status[500], message: 'An internal error occured' }))
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
      return res.status(400).json({ status: status[400], error: errors.array()[0].msg });
    }
    const { questionId } = req.params;
    const { userId } = req;

    const findQuestion = `SELECT * FROM questions WHERE id ='${questionId}'`;
    const deleteQuestion = `DELETE FROM questions WHERE id = '${questionId}' `;
    const findAnswer = `SELECT * FROM answers WHERE id ='${questionId}'`;
    const deleteAnswer = `DELETE FROM answers WHERE id ='${questionId}'`;
    pool.query(findQuestion)
      .then((result) => {
        if (result.rowCount === 0) {
          res.status(404).json({ status: status[404], message: 'There is no question with that ID' })
        } else if (userId != result.rows[0].user_id) {
          // console.log(`user:${result.rows[0].user_id} ,user2:${userId}`)
          res.status(401).json({ status: status[401], message: 'You can not delete this question because you are not the author' })
        } else {
          pool.query(deleteQuestion)
            .then(() => pool.query(findAnswer).then((result1) => {
              if (result1.rowCount < 1) {
                res.status(200).json({ status: status[200], message: `The question with id: ${questionId} has been deleted successfully` })
              } else {
                pool.query(deleteAnswer)
                  .then(() => res.status(200).json({ status: status[200], message: `The question with id: ${questionId} has been deleted successfully` }))
              }
            }))
            .catch(() => {
              res.status(500).json({ status: status[500], message: 'An internal error occured' });
              return null;
            })
        }
      })
      .catch(() => res.status(500).json({ status: status[500], message: 'Internal Error Occurred' }))

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
    const { userId } = req;
    const allQuestions = `SELECT * FROM questions where user_id = ${userId}`;


    pool.query(allQuestions)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(200).json({ status: status[200], data: 'You have asked no question' });
        } return res.status(200).json({ status: status[200], data: result.rows })
      })
      .catch(() => { res.status(500).json({ status: status[500], message: 'An error occured while processing this request' }) })
    return null;

  }





}

export default QuestionController;
