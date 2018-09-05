import express from 'express';
import authRouter from './auth';
import foodRouter from './food';
import orderRouter from './order';

const v1Router = express.Router();

v1Router.use(
  '/v1/',
  authRouter,
  foodRouter,
  orderRouter
);

export default v1Router;
