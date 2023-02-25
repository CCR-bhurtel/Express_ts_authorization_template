import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { UserType } from '../../Model/User';

const loadUser = (req: Request | any, res: Response) => {
    res.status(200).json({
        user: req?.user,
    });
};

export default loadUser;
