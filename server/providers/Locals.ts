import * as dotenv from 'dotenv';
import * as path from 'path';
import {Application} from "express";

class Locals {

    public static config(): any {
        dotenv.config({ path: path.join(__dirname, '../../.env') })

        const isDev = process.env.NODE_ENV !== 'production';
        const port = process.env.PORT || 5000;
        const url = process.env.APP_URL || `http://localhost:${port}`;
        const databaseUrl = process.env.DATABASE_URL;
        const googleClientId = process.env.GOOGLE_LOGIN_CLIENT_ID;
        const googleSecret = process.env.GOOGLE_CLIENT_SECRET;
        const enableSSL = process.env.DB_ENABLE_SSL || false;

        return {
            isDev,
            port,
            url,
            databaseUrl,
            googleClientId,
            googleSecret,
            enableSSL
        }
    }

    public static init (express: Application): Application {
        express.locals.app = this.config();

        return express;
    }
}

export default Locals;