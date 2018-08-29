import moment from 'moment';
import validateAuth from '../helpers/validationHelpers';
import pool from '../helpers/dbHelper'
import status from '../data/status.json'
/**
 * @exports
 * @class AnswerController
 */
class CommentController {

  /**
       * Returns an Answer
       * @method postComment
       * @memberof CommentController
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */
  static postComment(req, res) {
    const errors = validateAuth.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }

    const questionId = req.params.questionId;
    const answerId = req.params.questionId;
    const userId = req.userId;
    const { comment } = req.body;

    const createdAt = moment().format('YYYY-MM-DD');
    const getQuestionQuery = `SELECT * FROM questions WHERE id = '${questionId}'`;
    const getAnswerQuery = `SELECT * FROM answers WHERE id = '${questionId}'`;


    const addCommentQuery = `INSERT INTO comments (answer_id,user_id,comment,created_at) VALUES ('${answerId}', '${userId}','${comment}','${createdAt}') RETURNING *`
    pool.query(getQuestionQuery)
      .then((result) => {

        if (result.rowCount === 0) {
          return res.status(404).json({ status: status[404], message: 'There is no question with that Question ID' })
        }
        pool.query(getAnswerQuery)
          .then((result1) => {
            if (result1.rowCount < 1) {
              return res.status(404).json({ status: status[404], message: 'There is no answer with that Answer ID' })
            }

            pool.query(addCommentQuery)
              .then(result2 => res.status(201).json({
                status: status[201],
                message: 'Comment added successfully',
                Answer: result2.rows[0]
              }))
              .catch(() => res.status(500).json({ message: 'An internal error occured' }));
            return null;

          })

          .catch(() => res.status(500).json({ message: 'An internal error occured' }));
        return null;
      })
    return null;
  }





}

export default CommentController;
