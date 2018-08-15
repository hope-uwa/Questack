import moment from 'moment';
import data from '../data';
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
    return res.status(200).json(data.questions);
  }

  /**
       * Returns a Question
       * @method postQuestions
       * @memberof QuestionController
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */
  static postQuestions(req, res) {
    // reminder: remove userId from req.body, it should be gotten from the middleware
    const { userId, questionTitle, questionBody } = req.body;
    const allQuestions = data.questions;
    const id = allQuestions[allQuestions.length - 1].id + 1;
    const createdAt = moment().format('YYYY-MM-DD');
    const updatedAt = moment().format('YYYY-MM-DD');

    const newQuestion = {
      id, userId, questionTitle, questionBody, createdAt, updatedAt
    }
    if (questionTitle !== '' && questionBody !== '') {
      allQuestions.push(newQuestion);

      return res.status(201).json({ message: 'Question added successfully', 'Question Title': newQuestion.questionTitle, 'Question body': newQuestion.questionBody });
    }
    return res.status(400).json({ message: 'An Empty field found, Please fill up all fields', error: 'Bad Request' })

  }



}

export default QuestionController;
