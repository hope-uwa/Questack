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
    if (questionTitle !== '' && questionBody !== '' && questionTitle !== undefined && questionBody !== undefined) {
      allQuestions.push(newQuestion);

      return res.status(201).json({ message: 'Question added successfully', 'Question Title': newQuestion.questionTitle, 'Question body': newQuestion.questionBody });
    }
    return res.status(400).json({ message: 'An Empty field found, Please fill up all fields', error: 'Bad Request' })

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
    const questionId = QuestionController.newMethod(req);
    const allQuestions = data.questions;
    const findQuestion = allQuestions.findIndex(quest => quest.id === parseInt(questionId, 10))
    if (findQuestion === -1) {
      return res.status(404).json({ message: 'Question not found' });
    }
    const allAnswers = data.answers;
    // sort for hte answers to the question
    const findAnswer = allAnswers.filter(ans => ans.questionId === parseInt(questionId, 10));
    const displayAnswer = ['There is no response yet'];
    if (findAnswer.length !== 0) { displayAnswer[0] = findAnswer }
    return res.status(200).json({ 'Question Title': allQuestions[findQuestion].questionTitle, 'Question Body': allQuestions[findQuestion].questionBody, 'All answers': findAnswer })

  }

  /**
       * Returns an Answer
       * @method postAnswers
       * @memberof QuestionController
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */
  static postAnswers(req, res) {
    // reminder: remove userId from req.body, it should be gotten from the middleware
    const questionId = QuestionController.newMethod(req);
    // check if question exist
    const allQuestions = data.questions;
    const findQuestion = allQuestions.findIndex(quest => quest.id === parseInt(questionId, 10))
    if (findQuestion === -1) {
      return res.status(404).json({ message: 'Question not found' });
    }
    // add answer
    const { userId, answerBody } = req.body;
    const allAnswers = data.answers;
    const id = allAnswers[allAnswers.length - 1].id + 1;
    const createdAt = moment();
    const updatedAt = moment();

    const newAnswer = {
      id, userId, questionId, answerBody, createdAt, updatedAt
    }
    if (answerBody !== '' && answerBody !== undefined) {
      allAnswers.push(newAnswer);

      return res.status(201).json({ message: 'Answer added successfully', content: newAnswer });
    }
    return res.status(400).json({ message: 'An Empty field found, Please fill up all fields', error: 'Bad Request' })

  }

  /**
       * Returns a Answers
       * @method getAnswers
       * @memberof QuestionController
       * @param {object} req
       * @param {object} res
       * @returns {(function|object)} Function next() or JSON object
       */

  static getAnswers(req, res) {
    const questionId = QuestionController.newMethod(req);
    const allAnswers = data.answers;
    // sort for hte answers to the question
    const findAnswer = allAnswers.filter(ans => ans.questionId == parseInt(questionId, 10));
    const displayAnswer = ['There is no response yet'];
    if (findAnswer.length !== 0) { displayAnswer[0] = findAnswer }
    return res.status(200).json(displayAnswer[0])

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
    const questionId = QuestionController.newMethod(req);

    const allQuestions = data.questions;
    const findQuestion = allQuestions.findIndex(quest => quest.id === parseInt(questionId, 10));
    if (findQuestion === -1) {
      return res.status(404).json({ message: 'Question doesn\'t exist' });
    }
    allQuestions.splice(findQuestion, 1);

    return res.status(200).json({ message: 'Question has been deleted!' });


  }





  static newMethod(req) {
    return req.params.questionId;
  }
}

export default QuestionController;
