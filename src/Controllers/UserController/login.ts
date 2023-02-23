import { NextFunction, Request, Response } from 'express';
import User, { UserType } from '../../Model/User';
import createSendToken from '../../Utils/CreateSendToken';

interface loginType {
    email: string;
    password: string;
    confirmPassword: string;
}
const login = async (req: Request, res: Response) => {
    const { email, password }: loginType = req.body;
    if (!email || !password) res.status(400).json({ message: 'Please fill in all the fields' });
    const user = await User.findOne({ email });
    createSendToken(user, res);
};

export default login;
