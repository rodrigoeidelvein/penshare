import {Application} from "express";
import * as passport from 'passport';

import GoogleStrategy from '../services/strategies/Google';

import {User} from '../models/user'

class Passport {
    public mountPackage (_express: Application): Application {
        _express = _express.use(passport.initialize());
        _express = _express.use(passport.session());

        passport.serializeUser((user, done) => {
            done(null, user.id);
        });

        passport.deserializeUser(async (id: number, done) => {
           const user = await User.findByPk(id);

           done(undefined, user);
        });

        this.mountStrategies();

        return _express;
    }

    public mountStrategies(): void {
        try {
            GoogleStrategy.init(passport);
        } catch (e) {
            console.error(e);
        }
    }
}