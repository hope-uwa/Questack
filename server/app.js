import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import swagger from 'swagger-ui-express';

import bodyParser from 'body-parser';

import routes from './routes';

import uiRoutes from './routes/ui';

const swaggerDocument = require('../swagger.json');

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 4000;
// Static files
app.use('/', express.static(path.resolve(__dirname, '../ui/')));

app.use('/docs', swagger.serve, swagger.setup(swaggerDocument));
app.get('/ind', function (req, res) {
  res.sendFile(path.join(__dirname + 'ui/index.html'));
});
app.use('/', uiRoutes)
routes(app);
// frontroute(app);


app.listen(port, () => {

  console.log(`Server running on port ${port}`);
});

export default app;
