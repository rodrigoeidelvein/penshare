const UserService = require("../services/UserService");

exports.findByEmail = async (req, res) => {
    try {
        res.status(200).send(await UserService.findByEmail(req.query.email));
    } catch (e) {
        res.status(500).send({message: "Erro ao atualizar pad"});
    }
}