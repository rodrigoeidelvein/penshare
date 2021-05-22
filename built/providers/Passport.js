import { __awaiter } from "tslib";
import * as passport from 'passport';
import { User } from "../models/user";
import GoogleStrategy from '../services/strategies/Google';
class Passport {
    mountPackage(express) {
        express = express.use(passport.initialize());
        express = express.use(passport.session());
        passport.serializeUser((user, done) => {
            done(undefined, user.id);
        });
        passport.deserializeUser((id, done) => __awaiter(this, void 0, void 0, function* () {
            const user = yield User.findById(id);
            done(undefined, user);
        }));
        this.mountStrategies();
        return express;
    }
    mountStrategies() {
        try {
            GoogleStrategy.init(passport);
        }
        catch (err) {
            console.error(err);
        }
    }
}
export default new Passport;
