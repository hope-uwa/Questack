import moment from 'moment';
import validateAuth from '../helpers/validationHelpers';
import pool from '../helpers/dbHelper'
import status from '../data/status.json'
/**
 * @exports
 * @class AnswerController
 */
class VoteController {

  /**
       * Returns an Answer
       * @method voteUp
       * @memberof VoteController
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */
  static voteUp(req, res) {
    const errors = validateAuth.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    const answerId = req.params.answerId;
    const questionId = req.params.questionId;
    const userId = req.userId;
    const questionQuery = `SELECT * FROM questions WHERE id = '${questionId}'`;
    const vote = 'up'
    const voteQuery = `SELECT * FROM votes WHERE answer_id = '${answerId}'`
    const answerQuery = `SELECT * FROM answers WHERE id = '${answerId}'`
    const addVote = `INSERT INTO votes (answer_id,user_id,vote) values ('${answerId}','${userId}','${vote}') `
    pool.query(questionQuery)
      .then((result) => {
        if (result.rowCount < 1) {
          return res.status(404).json({ status: status[404], message: 'There is no question with that Question Id' })
        }
        pool.query(answerQuery)
          .then((result1) => {
            if (result1.rowCount < 1) {
              return res.status(404).json({ status: status[404], message: 'There is no answer with that Answer Id' })
            }
            pool.query(voteQuery)
              .then((result2) => {
                if (result2.rowCount !== 0 && result2.rows[0].user_id === userId) {
                  return res.status(200).json({ message: 'You have voted before', vote: result2.rows[0].vote })
                }
                pool.query(addVote)
                  .then(() => res.status(201).json({ status: status[201], message: 'You have successfully voted Up' }))
                  .catch(() => res.status(500).json({ message: 'An internal error occured 4' }))
                return null;

              })
              .catch(() => res.status(500).json({ message: 'An internal error occured 3' }))
            return null;
          })
          .catch(() => res.status(500).json({ message: 'An internal error occured 2' }))
        return null;
      })
      .catch(() => res.status(500).json({ message: 'An internal error occured 1' }))
    return null;


  }

  static voteDown(req, res) {
    const errors = validateAuth.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    const answerId = req.params.answerId;
    const questionId = req.params.questionId;
    const userId = req.userId;
    const questionQuery = `SELECT * FROM questions WHERE id = '${questionId}'`;
    const vote = 'down'
    const voteQuery = `SELECT * FROM votes WHERE answer_id = '${answerId}'`
    const answerQuery = `SELECT * FROM answers WHERE id = '${answerId}'`
    const addVote = `INSERT INTO votes (answer_id,user_id,vote) values ('${answerId}','${userId}','${vote}') `
    pool.query(questionQuery)
      .then((result) => {
        if (result.rowCount < 1) {
          return res.status(404).json({ status: status[404], message: 'There is no question with that Question Id' })
        }
        pool.query(answerQuery)
          .then((result1) => {
            if (result1.rowCount < 1) {
              return res.status(404).json({ status: status[404], message: 'There is no answer with that Answer Id' })
            }
            pool.query(voteQuery)
              .then((result2) => {
                if (result2.rowCount !== 0 && result2.rows[0].user_id === userId) {
                  return res.status(200).json({ message: 'You have voted before', vote: result2.rows[0].vote })
                }
                pool.query(addVote)
                  .then(() => res.status(201).json({ status: status[201], message: 'You have successfully voted Up' }))
                  .catch(() => res.status(500).json({ message: 'An internal error occured 4' }))
                return null;

              })
              .catch(() => res.status(500).json({ message: 'An internal error occured 3' }))
            return null;
          })
          .catch(() => res.status(500).json({ message: 'An internal error occured 2' }))
        return null;
      })
      .catch(() => res.status(500).json({ message: 'An internal error occured 1' }))
    return null;


  }
}
export default VoteController;