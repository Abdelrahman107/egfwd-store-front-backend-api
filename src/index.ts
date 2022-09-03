import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import routes from './routes';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import errorHandler from './middlewares/error.middleware';
import dbPool from './database/database';
import dotenv from 'dotenv';
const PORT = process.env.PORT || 3000;
const app: Application = express();
dotenv.config();

if (process.env.NODE_ENV === 'dev') app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);

app.get('/', (req: Request, res: Response) => {
  res.send('<article> <header><h1>Welcome to StoreFront API. </h1> <p>In order to use it: </p> <p>Read out the documentation in Readme.md and REQUIREMENETS.md </p> </article>');
});

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server app listening on port ${PORT}`);
});

export default app;
