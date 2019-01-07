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
      return res.status(400).json({ status: status[400], error: errors.array()[0].msg });
    }

    const { questionId } = req.params;
    const { userId } = req;
    const { body } = req.body;

    const createdAt = moment().format();
    const getQuestionQuery = `SELECT * FROM questions WHERE id = '${questionId}'`;

    const addAnswerQuery = `INSERT INTO answers (user_id,question_id,answer_body,created_at) VALUES ('${userId}', '${questionId}','${body}','${createdAt}') RETURNING *`
    pool.query(getQuestionQuery)
      .then((result) => {

        if (result.rowCount === 0) {
          return res.status(404).json({ status: status[404], message: 'question can not be found' })
        }
        pool.query(addAnswerQuery)
          .then((result1) => {
            res.status(201).json({
              status: status[201],
              questionId: result1.rows[0].question_id,
              answerId: result1.rows[0].id,
              body: result1.rows[0].answer_body,
              createdAt: moment(result1.rows[0].created_at).fromNow(),
              message: 'Answer added successfully'
            })
          })
          .catch(() => res.status(500).json({ status: status[500], message: 'An internal error occured' }));
        return null;
      })
      .catch(() => res.status(500).json({ status: status[500], message: 'An internal error occured' }));
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
      return res.status(400).json({ status: status[400], error: errors.array()[0].msg });
    }

    const { questionId } = req.params;

    const getQuestionQuery = `SELECT * FROM questions WHERE id = '${questionId}'`;

    const getAnswersQuery = `SELECT * FROM answers WHERE question_id = '${questionId}'`;

    pool.query(getQuestionQuery)
      .then((result) => {
        if (result.rowCount < 1) {
          return res.status(404).json({ status: status[404], message: `Question with Id: ${questionId} can not be found` })
        }
        pool.query(getAnswersQuery)
          .then((result1) => {
            if (result1.rowCount < 1) {
              return res.status(404).json({ status: status[404], message: 'There are no answers for this question yet' })
            }
            return res.status(200).json({
              status: status[200],
              questionId: result1.rows[0].question_id,
              body: result1.rows[0].answer_body.trim(),
              createdAt: moment(result1.rows[0].created_at).fromNow()

            })
          })
          .catch(() => res.status(500).json({ status: status[500], message: 'An internal error occured' }));
        return null;
      })
      .catch(() => res.status(500).json({ status: status[500], message: 'An internal error occured' }));
    return null;


  }


  /**
       * Returns a Answers
       * @method oldUpdateAnswer
       * @memberof AnswerController
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */

  // static oldUpdateAnswer(req, res) {
  //   const errors = validateAuth.validationResult(req);
  //   if (!errors.isEmpty()) {
  //     return res.status(400).json({ errors: errors.array()[0].msg });
  //   }
  //   const { answerId } = req.params;
  //   const answerQuery = `SELECT * FROM answers WHERE id = '${answerId}'`;
  //   const updateAnswer = `UPDATE answers SET answer_body = '${req.body.body}' WHERE id = '${answerId}' RETURNING *`
  //   pool.query(answerQuery)
  //     .then((result) => {
  //       if (result.rowCount < 1) {
  //         return res.status(400).json({ status: status[400] })
  //       }
  //       if (result.rows[0].user_id !== req.userId) {
  //         return res.status(401).json({ status: status[401], message: 'You can not edit this answer' })
  //       }
  //       pool.query(updateAnswer)
  //         .then(result1 => res.status(201).json({ status: status[201], message: 'Updated Successfully', answer: result1.rows[0] }))
  //         .catch(() => res.status(500).json({ status: status[500], message: 'An internal error occured1' }));
  //       return null;
  //     })
  //     .catch(() => res.status(500).json({ status: status[500], message: 'An internal error occured2' }));
  //   return null;
  // }

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

    const { questionId } = req.params;
    const { answerId } = req.params;
    const questionQuery = `SELECT * FROM questions WHERE id = '${questionId}'`;
    const answerQuery = `SELECT * FROM answers WHERE id = '${answerId}' AND question_id = '${questionId}'`;
    const updateAnswer = `UPDATE answers SET preferred = 'true' WHERE id = '${answerId}' RETURNING *`
    const createdAt = moment().format();
    const checkPreferred = `SELECT * FROM preferred WHERE question_id = '${questionId}'`;
    const insertCorrectAnswer = `INSERT INTO preferred (question_id,answer_id,created_at) VALUES ('${questionId}','${answerId}','${createdAt}') RETURNING *`
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
            pool.query(checkPreferred)
              .then((preferredExist) => {
                if (preferredExist.rowCount < 1) {
                  pool.query(insertCorrectAnswer)
                    .then(pool.query(updateAnswer))
                    .then(() => res.status(201).json({ status: status[201], message: 'Answer has been marked as correct', body: result1.rows[0] }))
                    .catch(() => res.status(500).json({ message: 'An internal error occured1' }));
                  return null;

                }

                return res.status(401).json({ status: status[401], message: 'You have already preferred a question' })

              })

          })
          .catch(() => res.status(500).json({ message: 'An internal error occured2' }));
        return null;
      })
      .catch(() => res.status(500).json({ message: 'An internal error occured 3' }));
    return null;
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
      return res.status(400).json({ status: status[400], error: errors.array()[0].msg });
    }

    const { questionId } = req.params;
    const { answerId } = req.params;
    const questionQuery = `SELECT * FROM questions WHERE id = '${questionId}'`;
    const answerQuery = `SELECT * FROM answers WHERE id = '${answerId}' AND question_id = '${questionId}'`;
    const createdAt = moment().format();
    // const updatePreferredAnswer = `UPDATE answers SET preferred = 'check' WHERE id = '${answerId}' RETURNING *`
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


            if (result.rows[0].user_id === req.userId && result1.rows[0].user_id !== req.userId) {
              // mark as correct
              pool.query(insertCorrectAnswer)
                .then(() => res.status(201).json({ status: status[201], message: 'Answer has been marked as correct', body: result1.rows[0] }))
                .catch(() => res.status(500).json({ status: status[500], message: 'An internal error occured' }))
              return null
            }

            const user = result1.rows[0].user_id;
            if (req.userId !== user) {

              return res.status(401).json({ status: status[401], message: 'You can not update this answer' })
            }



            if (result1.rows[0].user_id === req.userId && req.body.body !== undefined && req.body.body !== '') {
              // update answer if user asked it and has filled body field

              pool.query(updateAnswer)
                .then(result2 => res.status(201).json({ status: status[201], message: 'Updated Successfully', answer: result2.rows[0] }))
                .catch(() => res.status(500).json({ status: status[500], message: 'An internal error occured' }));
              return null;
            }

            return null;
          })
          .catch(() => res.status(500).json({ status: status[500], message: 'An internal error occured' }));
        return null;

      })
      .catch(() => res.status(500).json({ status: status[500], message: 'An internal error occured' }));
    return null;

  }
  /**
       * Returns a Answers
       * @method usersAnswer
       * @memberof AnswerController
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */

  static userAnswers(req, res) {
    const { userId } = req;
    const usersAnswerQuery = `SELECT answers.id, answers.question_id, questions.question_title, answers.answer_body, answers.created_at FROM answers INNER JOIN questions ON answers.question_id=questions.id WHERE answers.user_id='${userId}' ORDER BY id DESC`
    pool.query(usersAnswerQuery)
      .then((result) => {
        if (result.rowCount < 1) {
          return res.status(200).json({
            status: status[404],
            data: 'You have not asked any question yet'
          })
        }
        return res.status(200).json({
          status: status[200],
          data: result.rows
        })
      })
      .catch(() => res.status(500).json({ status: status[500], message: 'An internal error occured' }));
    return null;

  }



}

export default AnswerController;
