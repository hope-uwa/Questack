import QuestionController from '../controllers/questionController';

const routes = (app) =>{
    app.get('api/v1/questions', QuestionController.allQuestions);
}

export default routes