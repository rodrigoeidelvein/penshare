import { __awaiter } from "tslib";
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { User } from "../../models/user";
import Locals from "../../providers/Locals";
class Google {
    static init(passport) {
        const originURL = Locals.config().isDev ? 'http://localhost:3000' : 'https://penshare-stage.herokuapp.com';
        console.log('dentro do google passport');
        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_LOGIN_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${originURL}/auth/google/callback`,
            passReqTocallback: true
        }, (req, accessToken, refreshToken, profile, cb) => __awaiter(this, void 0, void 0, function* () {
            console.log(profile);
            const user = yield User.findOrCreate({
                idGoogle: profile.id
            });
            return cb(null, user);
        })));
    }
}
export default Google;
