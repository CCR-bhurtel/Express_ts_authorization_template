import { NextFunction, Response } from 'express';
import { UserType } from '../Model/User';
import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';

const createSendToken = (user: any, res: Response): void => {
    try {
        const token: string = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_EXPIRES_IN as string,
        });
        const time: number = parseInt(process.env.JWT_COOKIE_EXPIRES_IN as string);
        const cookieOptions = {
            expires: new Date(Date.now() + time * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };
        if (process.env.NODE_ENV === 'production') cookieOptions.httpOnly = true;

        res.cookie('Authorization', token, cookieOptions);
        res.status(200).json({ ...user._doc, token });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
};

export default createSendToken;
