import mongoose, { Model, Schema, HydratedDocument, Mongoose } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserType {
    _id: string;
    username: string;
    email?: string;
    password: string;
    confirmPassword?: string;
}

interface UserMethods {
    comparePassword: (original: string, given: string) => boolean;
}

interface UserModel extends Model<UserType, {}, UserMethods> {
    comparePassword: (providedPassword: string) => boolean;
}

const userSchema = new Schema<UserType, UserModel, UserMethods>({
    username: {
        type: String,
        required: [true, 'Please provide valid username'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'This email has been used'],
    },
    password: { type: String, required: [true, 'please provide password'] },
    confirmPassword: {
        type: String,
        required: [true, 'password Confirm is required'],
        validate: {
            validator: function (val: string) {
                return this.password === val;
            },
            message: 'Password and confirmpassword must be same',
        },
    },
});

userSchema.method('comparePassword', async function (original: string, given: string) {
    return await bcrypt.compare(original, given);
});

userSchema.pre('save', async function (next) {
    const password = await bcrypt.hash(this.password, 15);
    this.password = password;
    this.confirmPassword = undefined;
    next();
});

const User = mongoose.model('User', userSchema);

export default User;
