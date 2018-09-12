import { Router } from 'express';

const uiRoutes = Router();
const root = 'ui';

uiRoutes.get('/', (req, res) => {
  res.sendFile('index.html', { root })
})
uiRoutes.get('/profile', (req, res) => {
  res.sendFile('user-profile.html', { root })
})
uiRoutes.get('/questions/:id', (req, res) => {
  res.sendFile('question.html', { root })
})



export default uiRoutes;
