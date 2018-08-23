import moment from 'moment';
import { validationResult } from 'express-validator/check';
import data from '../data';
import validateAuth from '../helpers/validationHelpers/authHelper';
import pool from '../helpers/dbHelper'
/**
 * @exports
 * @class QuestionController
 */
class QuestionController {

  /**
       * Returns a list of Questions
       * @method allQuestions
       * @memberof QuestionController
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */

  static allQuestions(req, res) {
    const allQuestions = 'SELECT * FROM questions ORDER BY id ASC';

    pool.query(allQuestions)
      .then((result) => {
        if (result.rowCount === 0) {
          res.status(200).json({ message: 'No question has been added' });
        } res.status(200).json({ message: result })
      })
      .catch(() => { res.status(500).json({ message: 'An error occured while processing this request' }) })
    return null;
  }

  /**
       * Returns a Question
       * @method getQuestion
       * @memberof QuestionController
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */

  static getQuestion(req, res) {

    const questionId = QuestionController.questionId(req);
    pool.query(`SELECT * FROM questions WHERE id = '${questionId}`)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(404).json({ message: 'Question do not exist' });
        }

        return res.status(200).json({ Title: result.rows[0].question_title, Body: result.rows[0].question_body, Preferred_Answer: preferredAnswer })
      })
      .catch(() => { res.status(400).json({ message: 'The question ID must be a number' }); });
    return null;


  }


  /**
       * Returns a Question
       * @method postQuestions
       * @desc remove userId from req.body, it should be gotten from the middleware
       * @memberof QuestionController
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */
  static postQuestions(req, res) {
    QuestionController.validatePostQuestion();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors });
    }

    const { questionTitle, questionBody } = req.body;
    const userId = QuestionController.userId();
    const createdAt = moment().format('YYYY-MM-DD');
    const postQuery = `INSERT INTO questions (user_id,question_title,question_body,created_at) VALUES ('${userId}', ${questionTitle}','${questionBody}','${createdAt}') RETURNING *`
    pool.query(postQuery)
      .then((result) => {
        
        return res.status(201).json({
          id: result.rows[0].id,
          Title: result.rows[0].question_title,
          Body: result.rows[0].question_body,
          CreatedAt: result.row[0].createdAt,
          message: 'Your question has been added successfully'

        })
      })
      .catch(() => {
        res.status(500).json({ message: 'An internal error occured' })
      })
      return null;

    
  }




  static validatePostQuestion() {
    const newLocal = validateAuth.postQuestion;
    return newLocal;
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
    const questionId = QuestionController.questionId(req);

    const allQuestions = data.questions;
    const findQuestion = allQuestions.findIndex(quest => quest.id === parseInt(questionId, 10));
    if (findQuestion === -1) {
      return res.status(404).json({ message: 'Question doesn\'t exist' });
    }
    allQuestions.splice(findQuestion, 1);

    return res.status(200).json({ message: 'Question has been deleted!' });


  }



  static getUserId(req) {
    return req.userId;
  }


  static questionId(req) {
    return req.params.questionId;
  }
  static answerId(req) {
    return req.params.answerId;
  }

  static getPreferredAnswer(req) {
    const questionid = QuestionController.questionId(req);


    const findQuestion = data.preferredAnswers.findIndex(question => question.questionId === parseInt(questionid, 10));

    if (findQuestion === -1) {
      return null;
    }
    const preferAnswerDb = data.preferredAnswers[findQuestion];

    const preferredId = preferAnswerDb.answerId;
    return preferredId;

  }
}

export default QuestionController;
