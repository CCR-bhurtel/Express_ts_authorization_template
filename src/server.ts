'use strict';
import app from './app';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const PORT: string | number = process.env.PORT || 5000;

mongoose.set('strictQuery', false);
const connectToDB = async (): Promise<void> => {
    mongoose.connect(
        process.env.MONGODB_CONNECTION_STRING as string,
        {
            autoIndex: true,
        },
        () => {
            console.log('Mongodb connected');
        }
    );
};

connectToDB().then(() => {
    app.listen(PORT, () => {
        console.log(`App is running in port ${PORT}`);
    });
});

process.on('uncaughtException', () => process.exit(1));
process.on('unhandledRejection', () => process.exit(1));
