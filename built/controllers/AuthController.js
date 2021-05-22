import { __awaiter } from "tslib";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_LOGIN_CLIENT_ID);
const db = require('../models');
const User = db.User;
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.body;
            if (!token) {
                res.status(400).send({
                    message: "Conteúdo não pode ser vazio."
                });
            }
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
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).json({
                message: "Logged out successfully"
            });
        });
    }
    me(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.status(200).send({ user: 'teste' });
        });
    }
}
export default AuthController;
