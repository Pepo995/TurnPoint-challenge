import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connection } from './config';
import router from './routes/index';
import cors from 'cors';
import { errorLogger, errorResponder, failSafeHandler } from './middlewares/error';

const app = express();
const port = process.env.PORT || '5000';

app.use(cors());

app.use('/api', express.json(), router, errorLogger, errorResponder, failSafeHandler);

connection
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
