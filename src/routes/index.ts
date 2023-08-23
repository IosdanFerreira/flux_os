import { Router } from 'express';
import { userController } from '../useCases/CreateUser';

const routes = Router();

routes.post(
    '/signUp',
    userController.signUpValidation,
    userController.signUp
);

export {routes};