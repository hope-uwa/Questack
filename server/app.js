import path from 'path';
import dotenv from 'dotenv';
import express from 'express';
import swagger from 'swagger-ui-express';
import cors from 'cors'

import bodyParser from 'body-parser';

import routes from './routes';

import uiRoutes from './routes/ui';

dotenv.config();

const swaggerDocument = require('../swagger.json');



const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5002;
// Static files
app.use('/', express.static(path.resolve(__dirname, '../frontend/')));

app.use('/docs', swagger.serve, swagger.setup(swaggerDocument));
app.use('/', uiRoutes)
routes(app);



app.listen(port, () => {

  console.log(`You are on ${process.env.NODE_ENV}, and server is running on port ${port}`);
});

export default app;
