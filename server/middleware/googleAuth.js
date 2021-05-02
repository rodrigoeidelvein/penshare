const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_LOGIN_CLIENT_ID);
const db = require('../../models');

module.exports = async (req, res, next) => {
    const {token} = req.cookies;

    try {
        const userData = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_LOGIN_CLIENT_ID
        });

        const user = await db.User.findByPk(userData.getPayload().sub)

        if (user) {
            req.user = user.dataValues;
            next();
        } else {
            req.status(401).send({
                error: 'Invalid request'
            });
        }
    } catch (e) {
        res.status(401).send({
            error: 'Invalid Request'
        });
    }
}
