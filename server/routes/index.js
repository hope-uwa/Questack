import QuestionController from '../controllers/questionController';

const routes = (app) => {
  app.get('/', (req, res) => {
    res.send('Hello');
  });
  app.get('/api/v1/questions', QuestionController.allQuestions);

 app.post('/api/v1/questions', QuestionController.postQuestions)
}

export default routes;
