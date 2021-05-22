import { __awaiter } from "tslib";
import * as passport from 'passport';
import GoogleStrategy from '../services/strategies/Google';
import { User } from '../models/user';
class Passport {
    mountPackage(_express) {
        _express = _express.use(passport.initialize());
        _express = _express.use(passport.session());
        passport.serializeUser((user, done) => {
            done(null, user.id);
        });
        passport.deserializeUser((id, done) => __awaiter(this, void 0, void 0, function* () {
            const user = yield User.findByPk(id);
            done(undefined, user);
        }));
        this.mountStrategies();
        return _express;
    }
    mountStrategies() {
        try {
            GoogleStrategy.init(passport);
        }
        catch (e) {
            console.error(e);
        }
    }
}
