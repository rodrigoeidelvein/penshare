const db = require('../../models');

const { PadAuthorization } = db;

exports.toRead = async (req, res, next) => {
    const {id: padId} = req.params;
    const {id: userId} = req.user;

    try {
        const padAuthorization = await PadAuthorization.findOne({
            where: {
                padId,
                sharedWith: userId
            },
            include: ["role"]
        })
        if (!padAuthorization) {
            res.status(404).send({ message: "Pad não encontrado" });
        }

        req.user.authorizations = padAuthorization.role;
        next();
    } catch (e) {
        console.log(e);
        res.status(500).send({message: "Erro ao buscar autorização para o documento."});
    }
}