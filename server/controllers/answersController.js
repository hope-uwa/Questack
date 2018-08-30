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
    const { body } = req.body;

    const createdAt = moment().format('YYYY-MM-DD');
    const getQuestionQuery = `SELECT * FROM questions WHERE id = '${questionId}'`;

    const addAnswerQuery = `INSERT INTO answers (user_id,question_id,answer_body,created_at) VALUES ('${userId}', '${questionId}','${body}','${createdAt}') RETURNING *`
    pool.query(getQuestionQuery)
      .then((result) => {

        if (result.rowCount === 0) {
          return res.status(404).json({ status: status[404], message: 'There is no question with that Question ID' })
        }
        pool.query(addAnswerQuery)
          .then((result1) => {
            res.status(201).json({
              status: status[201],
              questionId: result1.rows[0].question_id,
              answerId: result1.rows[0].id,
              body: result1.rows[0].answer_body,
              createdAt: result1.rows[0].created_at,
              message: 'Answer added successfully'
            })
          })
          .catch(() => res.status(500).json({ message: 'An internal error occured' }));
        return null;
      })
      .catch(() => res.status(500).json({ message: 'An internal error occured' }));
    return null;
  }


  /**
       * Returns an Answer
       * @method postAnswers
       * @memberof AnswerController
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */
  static getAnswers(req, res) {
    const errors = validateAuth.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }

    const questionId = req.params.questionId;

    const getQuestionQuery = `SELECT * FROM questions WHERE id = '${questionId}'`;

    const getAnswersQuery = `SELECT * FROM answers WHERE question_id = '${questionId}'`;

    pool.query(getQuestionQuery)
      .then((result) => {
        if (result.rowCount < 1) {
          return res.status(404).json({ status: status[404], message: 'There is no question with that question ID' })
        }
        pool.query(getAnswersQuery)
          .then((result1) => {
            if (result1.rowCount < 1) {
              return res.status(404).json({ status: status[404], message: 'There are no answers for this question yet' })
            }
            return res.status(200).json({
              status: status[200],
              questionId: result1.rows[0].question_id,
              body: result1.rows[0].answer_body,
              createdAt: result1.rows[0].created_at

            })
          })
          .catch(() => res.status(500).json({ message: 'An internal error occured' }));
        return null;
      })
      .catch(() => res.status(500).json({ message: 'An internal error occured' }));
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
    const updateAnswer = `UPDATE answers SET answer_body = '${req.body.body}' WHERE id = '${answerId}' RETURNING *`
    pool.query(answerQuery)
      .then((result) => {
        if (result.rowCount < 1) {
          return res.status(400).json({ status: 'Not FOund' })
        }
        if (result.rows[0].user_id !== req.userId) {
          return res.status(401).json({ status: status[401], message: 'You can not edit this answer' })
        }
        pool.query(updateAnswer)
          .then(result1 => res.status(201).json({ message: 'Updated Successfully', status: status[201], answer: result1.rows[0] }))
          .catch(() => res.status(500).json({ message: 'An internal error occured1' }));
        return null;
      })
      .catch(() => res.status(500).json({ message: 'An internal error occured2' }));
    return null;
  }

  /**
       * Returns a Answers
       * @method acceptedAnswer
       * @memberof AnswerController
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */

  static acceptedAnswer(req, res) {
    const errors = validateAuth.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }

    const questionId = req.params.questionId;
    const answerId = req.params.answerId;
    const questionQuery = `SELECT * FROM questions WHERE id = '${questionId}'`;
    const answerQuery = `SELECT * FROM answers WHERE id = '${answerId}' AND question_id = '${questionId}'`;
    const createdAt = moment().format('YYYY-MM-DD');
    const insertCorrectAnswer = `INSERT INTO preferred (question_id,answer_id,created_at) VALUES ('${questionId}','${answerId}','${createdAt}') RETURNING *`
    const updateCorrectAnswer = `UPDATE preferred SET answer_id = '${answerId}' WHERE question_id = ${questionId}`
    pool.query(questionQuery)
      .then((result) => {
        if (result.rowCount < 1) {
          return res.status(404).json({ status: status[404], message: `question with Id: ${questionId} can not be found` })
        }
        if (result.rows[0].user_id !== req.userId) {
          return res.status(401).json({ status: status[401], message: 'You can not mark answer as correct' })
        }
        pool.query(answerQuery)
          .then((result1) => {
            if (result1.rowCount < 1) {
              return res.status(404).json({ status: status[404], message: `Answer with Answer Id: ${answerId} can not be found` })
            }
            pool.query(insertCorrectAnswer)
              .then(() => res.status(201).json({ status: status[201], message: 'Answer has been marked as correct', body: result1.rows[0] }))
              .catch(() => res.status(500).json({ message: 'An internal error occured1' }));
            return null;
          })
          .catch(() => res.status(500).json({ message: 'An internal error occured2' }));
        return null;
      })
      .catch(() => res.status(500).json({ message: 'An internal error occured 3' }));
    return null;
  }


  static specialAnswer(req, res) {
    const errors = validateAuth.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }

    const questionId = req.params.questionId;
    const answerId = req.params.answerId;
    const questionQuery = `SELECT * FROM questions WHERE id = '${questionId}'`;
    const answerQuery = `SELECT * FROM answers WHERE id = '${answerId}' AND question_id = '${questionId}'`;
    const createdAt = moment().format('YYYY-MM-DD');
    const insertCorrectAnswer = `INSERT INTO preferred (question_id,answer_id,created_at) VALUES ('${questionId}','${answerId}','${createdAt}') RETURNING *`
    const updateAnswer = `UPDATE answers SET answer_body = '${req.body.body}' WHERE id = '${answerId}' RETURNING *`

    pool.query(questionQuery)
      .then((result) => {
        if (result.rowCount < 1) {
          return res.status(404).json({ status: status[404], message: `question with Id: ${questionId} can not be found` })
        }

        pool.query(answerQuery)
          .then((result1) => {

            if (result1.rowCount < 1) {
              return res.status(404).json({ status: status[404], message: `Answer with Answer Id: ${answerId} can not be found` })
            }
            

            if (result.rows[0].user_id === req.userId) {
              // mark as correct
              pool.query(insertCorrectAnswer)
                .then(() => res.status(201).json({ status: status[201], message: 'Answer has been marked as correct', body: result1.rows[0] }))
                .catch(() => res.status(500).json({ message: 'An internal error occured4' }))
              return null
            }
            
            const user = result1.rows[0].user_id;
            if (req.userId !== user ) {
              
             return res.status(401).json({ status: status[401], message: 'You can not update this answer' })
            }

            
            
            if (result1.row[0].user_id === req.userId && req.body.body !== undefined && req.body.body !== '') {
              // update answer if user asked it and has filled body field
              
              pool.query(updateAnswer)
                .then(result2 => res.status(201).json({ message: 'Updated Successfully', status: status[201], answer: result2.rows[0] }))
                .catch(() => res.status(500).json({ message: 'An internal error occured3' }));
              return null;
            }
            
            return null;
          })
          .catch(() => res.status(500).json({ message: 'An internal error occured2' }));
        return null;

      })
      .catch(() => res.status(500).json({ message: 'An internal error occured1' }));
    return null;

  }


}

export default AnswerController;
