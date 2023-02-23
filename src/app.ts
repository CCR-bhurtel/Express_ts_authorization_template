import express from 'express';
import bodyParser from 'body-parser';

import cors from 'cors';
import userRoutes from './Routes/userRoutes';
import cookieSession from 'cookie-session';

const app = express();

app.use(express.json({}));
app.use(
    cookieSession({
        maxAge: 5 * 24 * 60 * 60,
        keys: [process.env.cookieKey as string],
    })
);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/api/users', userRoutes);

export default app;
