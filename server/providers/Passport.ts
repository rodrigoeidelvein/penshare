import {Application, NextFunction, Request, Response} from "express";
import * as passport from 'passport';
import {User} from "../models/user";

import GoogleStrategy from '../services/strategies/Google';

class Passport {
    public mountPackage (express: Application): Application {
        express = express.use(passport.initialize());
        express = express.use(passport.session());

        passport.serializeUser<User, number>((user, done) => {
            done(undefined, user.id)
        });

        passport.deserializeUser(async (id: number, done) => {
            const user = await User.findByPk(id);

            done(undefined, user);
        })

        this.mountStrategies();

        return express;
    }

    public mountStrategies(): void {
        try {
            GoogleStrategy.init(passport);
        } catch (err) {
            console.error(err);
        }
    }
}

export default new Passport;
