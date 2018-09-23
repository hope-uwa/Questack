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
      return res.status(400).json({ status: status[400], error: errors.array()[0].msg });
    }

    const { questionId } = req.params;
    const { answerId } = req.params;
    const { userId } = req;
    const { body } = req.body;

    const createdAt = moment().format();
    const getQuestionQuery = `SELECT * FROM questions WHERE id = '${questionId}'`;
    const getAnswerQuery = `SELECT * FROM answers WHERE id = '${questionId}'`;


    const addCommentQuery = `INSERT INTO comments (answer_id,user_id,comment_body,created_at) VALUES ('${answerId}', '${userId}','${body}','${createdAt}') RETURNING *`
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
                comment: result2.rows[0]
              }))
              .catch(() => res.status(500).json({ status: status[500], message: 'An internal error occured 2' }));
            return null;

          })

          .catch(() => res.status(500).json({ status: status[500], message: 'An internal error occured 1' }));
        return null;
      })
      .catch(err => res.status(500).json({ status: status[500], message: `${err}An internal error occured ` }));
    return null;
  }

  static getComment(req, res) {

    const errors = validateAuth.validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ status: status[400], error: errors.array()[0].msg });
    }
    const { answerId } = req.params;
    const answerQuery = `SELECT * FROM answers WHERE id ='${answerId}'`
    const commentQuery = `SELECT user_id,comment_body,created_at FROM comments WHERE answer_id ='${answerId}'`

    pool.query(answerQuery)
      .then((result) => {
        if (result.rowCount < 1) {
          return res.status(404).json({ status: status[404], message: 'No answer with this answer Id' });
        }

        pool.query(commentQuery)
          .then((result1) => {
            if (result1.rowCount === 0) {
              return res.status(200).json({
                status: status[200],
                answer: {

                  answer_body: result.rows[0].answer_body,
                  user_id: result.rows[0].user_id,
                  date_created: result.rows[0].created_at,
                  comments: 'No comments added yet'
                }

              });
            }

            return res.status(200).json({
              status: status[200],
              answer: {
                body: result.rows[0].answer_body,
                user_id: result.rows[0].user_id,
                date_created: result.rows[0].created_at,
                comments: result1.rows
              }

            })

          })
          .catch(() => res.status(500).json({ status: status[500], message: 'Internal Error Occurred' }))
        return null

      })
      .catch(() => res.status(500).json({ status: status[500], message: 'Internal Error Occurred' }))
    return null
  }




}

export default CommentController;
