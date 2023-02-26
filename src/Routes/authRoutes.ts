import passport from 'passport';
import express from 'express';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['public_profile', 'email'] }));

const authRoute = router;

export default authRoute;
