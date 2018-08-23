import QuestionController from '../controllers/dummyController/questionController';
import AnswerController from '../controllers/dummyController/answersController';
import UserController from '../controllers/userController';

const routes = (app) => {
  app.get('/', (req, res) => {
    res.send('Welcome to Questack!');
  });

  app.post('api/v1/auth/signup', UserController.signup );

  app.post('api/v1/auth/login', UserController.login);

  app.get('/api/v1/questions', QuestionController.allQuestions);

  app.post('/api/v1/questions', QuestionController.postQuestions);

  app.get('/api/v1/questions/:questionId', QuestionController.getQuestion);

  app.post('/api/v1/questions/:questionId/answers', AnswerController.postAnswers);

  app.get('/api/v1/questions/:questionId/answers', AnswerController.getAnswers);

  app.delete('/api/v1/questions/:questionId', QuestionController.deleteQuestion);

  app.put('/api/v1/questions/:questionId/answers/:answerId/preferred', AnswerController.AddPreferredAnswer);
  
}

export default routes;
