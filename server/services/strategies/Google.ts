import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import {User} from "../../models/user";
import Locals from "../../providers/Locals";

class Google {
    public static init (passport: any): any {
        const originURL: string = Locals.config().isDev ? 'http://localhost:3000' : 'https://penshare-stage.herokuapp.com'
        console.log('dentro do google passport')
        passport.use(new GoogleStrategy({
            clientID: process.env.GOOGLE_LOGIN_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: `${originURL}/auth/google/callback`,
            passReqTocallback: true
        }, async (req, accessToken, refreshToken, profile, cb) => {
            console.log(profile)
            const user: [User, boolean] = await User.findOrCreate({
                where: {
                    idGoogle: profile.id
                }
            })

            return cb(null, user);
        }))
    }
}

export default Google;