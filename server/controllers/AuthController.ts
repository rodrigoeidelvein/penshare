import { Request, Response} from "express";
import {OAuth2Client} from "google-auth-library";
import {User} from "../models/User";
const client = new OAuth2Client(process.env.GOOGLE_LOGIN_CLIENT_ID);

class AuthController {
    public async login(req: Request, res: Response) {
        const {token} = req.body;

        if (!token) {
            res.status(400).send({
                message: "Conteúdo não pode ser vazio."
            });
        }

        const ticket = await client.verifyIdToken({
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
        }

        const [userInstance] = await User.upsert(user);

        return res.status(201).send(userInstance);
    }

    public async logout(req: Request, res: Response) {
        res.status(200).json({
            message: "Logged out successfully"
        });
    }

    public async me(req: Request, res: Response) {
        return res.status(200).send({user: 'teste'});
    }
}

export default AuthController;