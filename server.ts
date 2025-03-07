import 'rootpath';
import express, { Express } from 'express';
import cors from 'cors';
import { errorHandler } from './_middleware/error-handler';
import userController from './users/user.controller';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api routes
app.use('/users', userController);

// global error handler
app.use(errorHandler);

// start server
const port: number = process.env.NODE_ENV === 'production' ? (Number(process.env.PORT) || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));