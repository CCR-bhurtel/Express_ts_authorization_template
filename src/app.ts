import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

import cors from 'cors';
import userRoutes from './Routes/userRoutes';
import cookieSession from 'cookie-session';
import path from 'path';
import ErrorControllerDev from './Controllers/ErrorControllers/DevErrorController';
import ErrorControllerProd from './Controllers/ErrorControllers/ProdErrorController';
import authRoute from './Routes/authRoutes';

const app = express();

app.use(express.json({}));
app.use(
    cookieSession({
        maxAge: 5 * 24 * 60 * 60,
        keys: [process.env.cookieKey as string],
    })
);

app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/auth', authRoute);
app.use('/api/users', userRoutes);
app.use('/api/company')
app.get('/', (req: Request, res: Response) => {
    res.render('dashboard.pug');
});
if (process.env.NODE_ENV === 'development') {
    app.use(new ErrorControllerDev().controller);
} else {
    app.use(new ErrorControllerProd().controller);
}
export default app;
