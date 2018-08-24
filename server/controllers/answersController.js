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
    
    const createdAt = moment();
    const getQuestionQuery = `SELECT * FROM question_id WHERE question_id = '${questionId}'`;

    const addAnswerQuery = `INSERT INTO answers (user_id,question_id,answer_body,created_at) VALUES ('${userId}', ${questionId}','${answerBody}','${createdAt}') RETURNING *`
    pool.query(getQuestionQuery)
      .then((result) => {
        if (result.rowCount === 0) {
          return res.status(404).json({ message: 'There is no question with that Question ID' })
        }
        pool.query(addAnswerQuery)
          .then(result1 => res.status(201).json({
            message: 'Answer added successfully',
            Answer: result1.row[0].answer_body
          }))
          .catch(() => res.status(500).json({ message: 'Internal error Occurred' }))
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

  static getAnswers(req, res) {
    const questionId = AnswerController.questionId(req);
    const allAnswers = data.answers;

    const findAnswer = allAnswers.filter(ans => ans.questionId == parseInt(questionId, 10));

    if (findAnswer.length !== 0) {
      return res.status(200).json({ answer: findAnswer })
    }
    return res.status(200).json({ answer: 'There is no answer given yet' })

  }

  /**
       * Returns a message
       * @method AddPreferredAnswer
       * @memberof AnswerController
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */

  static AddPreferredAnswer(req, res) {
    const qid = AnswerController.questionId(req);
    const aid = AnswerController.answerId(req);
    const preferredAnswer = data.preferredAnswers;
    const id = qid;

    const findOption = preferredAnswer.findIndex(answer => answer.questionId === parseInt(id, 10))
    if (findOption === -1) {
      return res.status(404).json({ message: 'The question is not found' })
    }

    preferredAnswer[findOption].answerId = aid;
    return res.status(201).json({ message: 'The preferred Answer has been choosen' });

  }


  static questionId(req) {
    return req.params.questionId;
  }

  static answerId(req) {
    return req.params.answerId;
  }

  

}

export default AnswerController;
