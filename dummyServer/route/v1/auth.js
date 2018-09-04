import express from 'express';
import AuthController from '../../controller/auth';
import UserValidation from '../../helpers/userValidation';

const authRouter = express.Router();

authRouter.post(
  '/auth/signup',
  UserValidation.validateSignUpData,
  UserValidation.verifyUserExist,
  AuthController.createUser
);

export default authRouter;
