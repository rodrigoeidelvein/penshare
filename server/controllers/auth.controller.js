const db = require('../models');
console.log(db)
const User = db.User;

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_LOGIN_CLIENT_ID);

exports.login = async (req, res) => {
    if (!req.body.token) {
        res.status(400).send({
            message: "Conteúdo não pode ser vazio."
        });
    }

    const {token} = req.body;

    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_LOGIN_CLIENT_ID
    });

    const {sub, name, given_name, email, picture} = ticket.getPayload();

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

exports.logout = async (req, res) => {
    res.status(200).json({
        message: "Logged out successfully"
    });
}

exports.me = async (req, res) => {
    return res.status(200).send(req.user);
}