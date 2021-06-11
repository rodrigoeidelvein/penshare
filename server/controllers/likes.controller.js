const db = require('../models');

const LikePadService = require('../services/LikePadService');

exports.handleLike = async (req, res) => {
    const { id: idUser } = req.user;

    const idPad = req.params.id;
    res.send( await LikePadService.likePad(idPad, idUser));
}