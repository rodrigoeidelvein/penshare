const {nanoid} = require('nanoid');
const Sequelize = require('sequelize');

const {pad: Pad, like_pad: LikePad, user: User} = require('../models');

exports.create = async (idUser) => {
    return Pad.create({id: nanoid(10), idUser});
}

exports.delete = async (idPad, idUser) => {
    const pad = await Pad.findByPk(idPad, { where: { idUser }})

    return pad.destroy();
}

exports.findAll = async () => {
    return Pad.findAll();
}

exports.findById = async (idPad) => {
    return Pad.findByPk(idPad);
}

exports.update = async (pad, idPad) => {
    await Pad.update(pad, { where: { id: idPad}})
    return await Pad.findByPk(idPad);
}

/**
 * Retorna os pads do usuário, junto com o número de likes dos pads.
 * @param idUser
 * @returns {Promise<Pad>}
 */
exports.findAllByUser = async (idUser) => {
    return Pad.findAll({
        where: {
            idUser
        },
        include: [User, LikePad],
        attributes: {
            include: [[Sequelize.fn("COUNT", Sequelize.col("like_pads.id_user")), "likesCount"]]
        },
        group: ["pad.id", "user.id", "like_pads.id_user"]
    });
}


/**
 * Encontra os pads mais populares e retorna ordenado pelo número de likes.
 * @returns {Promise<*>}
 */
exports.findMostPopular = async () => {
    return Pad.findAll({
        where: {
            type: "PUBLIC"
        },
        order: [
            [Sequelize.col("likesCount")]
        ],
        attributes: {
            include: [[Sequelize.fn("COUNT", Sequelize.col("like_pads.id_user")), "likesCount"]]
        },
        include: [User, LikePad],
        group: ["pad.id", "user.id", "like_pads.id_user"]
    })
}