import data from '../data';

/**
 * @exports
 * @class QuestionController
 */
class QuestionController {

  /**
     * Returns a list of Questions
     * @method allQuestions
     * @memberof Meals
     * @param {object} req
     * @param {object} res
     * @returns {(function|object)} Function next() or JSON object
     */

  static allQuestions(req, res) {
    return res.status(200).json(data.questions );
  }

}

export default QuestionController;
