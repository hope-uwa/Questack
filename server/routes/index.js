import UserController from '../controllers/userController';
import QuestionController from '../controllers/questionController';
import AnswerController from '../controllers/answersController';
import verifyToken from '../controllers/middleware/verifyToken';
import tableMigrations from '../helpers/table_schema/tableMigration';
import validateAuth from '../helpers/validationHelpers';
import CommentController from '../controllers/commentController';
import VoteController from '../controllers/voteController';

const routes = (app) => {
  app.get('/', (req, res) => {
    res.send('Welcome to Questack!');
  });

  app.post('/api/v1/auth/signup', validateAuth.signUp, UserController.signUp);

  app.post('/api/v1/auth/login', validateAuth.login, UserController.login);

  app.get('/api/v1/questions', QuestionController.allQuestions);

  app.get('/api/v1/questions/:questionId', validateAuth.getQuestion, QuestionController.getQuestion);

  app.post('/api/v1/questions', verifyToken, validateAuth.postQuestion, QuestionController.postQuestions);

  app.delete('/api/v1/questions/:questionId', verifyToken, validateAuth.getQuestion, QuestionController.deleteQuestion);

  app.post('/api/v1/questions/:questionId/answers', verifyToken, validateAuth.postAnswer, AnswerController.postAnswers);

  app.get('/api/v1/questions/:questionId/answers', validateAuth.getAnswers, AnswerController.getAnswers);

  app.put('/api/v1/questions/:questionId/answers/:answerId', verifyToken, validateAuth.specialUpdate, AnswerController.updateAnswer)

  app.put('/api/v1/questions/:questionId/answers/:answerId/correct', verifyToken, validateAuth.getAnswer, AnswerController.acceptedAnswer)

  app.get('/api/v1/users/questions', verifyToken, QuestionController.userQuestions);

  app.post('/api/v1/questions/:questionId/answers/:answerId/comments', verifyToken, validateAuth.postComments, CommentController.postComment)

  app.get('/api/v1/questions/:questionId/answers/:answerId', verifyToken, validateAuth.getAnswer, CommentController.getComment)

  app.post('/api/v1/questions/:questionId/answers/:answerId/voteup', verifyToken, validateAuth.getAnswer, VoteController.voteUp);

  app.post('/api/v1/questions/:questionId/answers/:answerId/votedown', verifyToken, validateAuth.getAnswer, VoteController.voteDown);

  app.get('/api/v1/user', UserController.user);

  app.get('/upmigration', tableMigrations.createTables);

  app.get('/downmigration', tableMigrations.dropTables);



  app.get('/*', (req, res) => res.status(404).json({
    status: '404 -Not Found',
    message: 'This route does not exist'
  }));

}

export default routes;
