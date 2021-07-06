const PadService = require("../services/PadService");

module.exports = async (req, res, next) => {
    const {id: padId} = req.params;
    const {id: userId} = req.user;

    try {
        const padInstance = await PadService.findById(padId);

        if (padInstance.idUser === userId) {
            return next();
        }

        const userIsMember = await padInstance.hasMember(userId);

        if (userIsMember) {
            return next();
        }

        res.status(403).send({
            error: 'Invalid Request'
        });
    } catch (e) {
        console.error("Erro ao buscar permissões para o usuário", e);
        res.status(403).send({
            error: "Erro ao buscar dados do usuário"
        });
    }
}