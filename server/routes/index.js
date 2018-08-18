import QuestionController from '../controllers/questionController';

const routes = (app) => {
  // app.get('/', (req, res) => {
  //   res.send('Welcome to Questack!');
  // });
  app.get('/api/v1/questions', QuestionController.allQuestions);

  app.post('/api/v1/questions', QuestionController.postQuestions);

  app.get('/api/v1/questions/:questionId', QuestionController.getQuestion);

  app.post('/api/v1/questions/:questionId/answers', QuestionController.postAnswers);

  app.get('/api/v1/questions/:questionId/answers', QuestionController.getAnswers);

  app.delete('/api/v1/questions/:questionId', QuestionController.deleteQuestion);

  app.put('/api/v1/questions/:questionId/answers/:answerId/preferred', QuestionController.AddPreferredAnswer);
}

export default routes;
