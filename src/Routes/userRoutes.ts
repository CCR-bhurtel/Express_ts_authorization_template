import express, { NextFunction, Request, Response } from 'express';

import login from '../Controllers/UserController/login';
import authCheck from '../Middlewares/authCheck';
import signup from '../Controllers/UserController/signup';

const userRoutes = express.Router();

userRoutes.post('/signup', signup);

userRoutes.post('/login', login);

userRoutes.get('/', authCheck);

export default userRoutes;
