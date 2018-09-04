import express from 'express';
import authRouter from './auth';
import foodRouter from './food';

const v1Router = express.Router();

v1Router.use(
  '/v1/',
  authRouter,
  foodRouter
);

export default v1Router;
