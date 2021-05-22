var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_LOGIN_CLIENT_ID);
const db = require('../models');
module.exports = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const { token } = req.cookies;
    try {
        const userData = yield client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_LOGIN_CLIENT_ID
        });
        const user = yield db.User.findByPk(userData.getPayload().sub);
        if (user) {
            req.user = user.dataValues;
            next();
        }
        else {
            req.status(401).send({
                error: 'Invalid request'
            });
        }
    }
    catch (e) {
        res.status(401).send({
            error: 'Invalid Request'
        });
    }
});
