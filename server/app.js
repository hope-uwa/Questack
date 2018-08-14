import express from 'express';

import bodyParser from 'body-parser';

import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 4000;
routes(app);


app.listen(port, () => {

//  console.log(`Server running on port ${port}`);
});

export default app;
