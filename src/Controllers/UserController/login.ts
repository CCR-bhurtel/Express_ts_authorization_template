import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import User, { UserType, UserMethods, UserModel, userSchema } from '../../Model/User';
import AppError from '../../Utils/AppError';
import catchAsync from '../../Utils/catchAsync';
import createSendToken from '../../Utils/CreateSendToken';

interface loginType {
    email: string;
    password: string;
    confirmPassword: string;
}
const login = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password }: loginType = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Please fill in all the fields' });
    const user = await User.findOne({ email }).select(['+password']);
    if (!user) {
        return next(new AppError('No user found with given email, please signup', 400));
    }

    if (await user.comparePassword(password, user.password)) createSendToken(user, res);
    else {
        return next(new AppError('Incorrect credentials', 400));
    }
});

export default login;
