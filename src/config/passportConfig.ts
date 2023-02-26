import passport from 'passport';
import googleOauth from 'passport-google-oauth20';
import User from '../Model/User';

passport.use(
    new googleOauth.Strategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbackURL: 'http://localhost:3000/api/auth/googleredirect',
        },
        async (accessToken, refreshToken, profile, done) => {
            const user = await User.findOne({ googleId: profile.id });
        }
    )
);
