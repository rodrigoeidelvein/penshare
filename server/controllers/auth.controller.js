const db = require('../models');
const User = db.users;

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_LOGIN_CLIENT_ID);

const Op = db.Sequelize.Op;

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

    User.upsert(user).then(data => {
        req.session.userId = user.id;
        req.session.save(() => {
            res.status(201);
            return res.send(data);
        });

    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Algum erro aconteceu ao criar o usuário"
        });
    });
}

exports.logout = async (req, res) => {
    await req.session.destroy();
    res.status(200);
    res.json({
        message: "Logged out successfully"
    });
}

exports.me = async (req, res) => {
    res.status(200);
    return res.json(req.user);
}