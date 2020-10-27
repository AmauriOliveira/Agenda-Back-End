import express, { NextFunction, Response, Request } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import 'express-async-errors';

import routes from './routes';
import AppError from './errors/AppError';

import './database';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    response.status(err.statusCode).json({
      status: 'error',
      massege: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    massege: 'Internal server error',
  });
});

app.listen(process.env.PORT || 3333, () => console.log('API Online'));
