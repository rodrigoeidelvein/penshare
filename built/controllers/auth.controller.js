var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const db = require('../models');
const User = db.User;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_LOGIN_CLIENT_ID);
exports.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
    if (!req.body.token) {
        res.status(400).send({
            message: "Conteúdo não pode ser vazio."
        });
    }
    const { token } = req.body;
    const ticket = yield client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_LOGIN_CLIENT_ID
    });
    const { sub, name, given_name, email, picture } = ticket.getPayload();
    const user = {
        id: sub,
        firstName: given_name,
        fullName: name,
        email: email,
        photo: picture
    };
    const [userInstance] = yield User.upsert(user);
    return res.status(201).send(userInstance);
});
exports.logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.status(200).json({
        message: "Logged out successfully"
    });
});
exports.me = (req, res) => __awaiter(this, void 0, void 0, function* () {
    return res.status(200).send(req.user);
});
