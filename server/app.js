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
app.use('/', express.static(path.resolve(__dirname, '../frontend/')));

app.use('/docs', swagger.serve, swagger.setup(swaggerDocument));
app.use('/', uiRoutes)
routes(app);



app.listen(port, () => {

  console.log(`Server running on port ${port}`);
});

export default app;
