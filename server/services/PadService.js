const {nanoid} = require('nanoid');
const Sequelize = require('sequelize');
const CategoryService = require("./CategoryService");
const CategoryPadService = require("./CategoryPadService");
const UserService = require("./UserService");

const {pad: Pad, like_pad: LikePad, user: User, category: Category} = require('../models');

exports.create = async (idUser) => {
    return Pad.create({id: nanoid(10), idUser});
}

exports.delete = async (idPad, idUser) => {
    const pad = await Pad.findByPk(idPad, {where: {idUser}})

    return pad.destroy();
}

exports.findAll = async () => {
    return Pad.findAll();
}

exports.findById = async (idPad) => {
    return Pad.findByPk(idPad, {
        include: {model: Category, through: {attributes: []}}
    });
}

exports.update = async (pad, idPad) => {
    await Pad.update(pad, {where: {id: idPad}})
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
        include: [
            User,
            LikePad,
            {model: Category, through: {attributes: []}}],
        attributes: {
            include: [[Sequelize.fn("COUNT", Sequelize.col("like_pads.id_user")), "likesCount"]]
        },
        group: ["pad.id", "user.id", "like_pads.id_user", "categories.id"]
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
        include: [
            User,
            LikePad,
            {model: Category, through: {attributes: []}}],
        group: ["pad.id", "user.id", "like_pads.id_user", "categories.id"]
    })
}

exports.findSharedWithUser = async (idUser) => {
    const userInstance = await UserService.findById(idUser)

    const sharedPads = await userInstance.getSharedPads();
    console.log(sharedPads)
    const sharedPadsWithDetails = sharedPads.map(async pad => {
        return await Pad.findByPk(pad.id, {
            order: [
                [Sequelize.col("likesCount")]
            ],
            attributes: {
                include: [[Sequelize.fn("COUNT", Sequelize.col("like_pads.id_user")), "likesCount"]]
            },
            include: [
                User,
                LikePad,
                {model: Category, through: {attributes: []}}],
            group: ["pad.id", "user.id", "like_pads.id_user", "categories.id"]
        })
    })

    return Promise.all(sharedPadsWithDetails)
}

exports.removeCategories = async (idPad) => {
    const padInstance = await Pad.findByPk(idPad);

    if (padInstance) {
        await padInstance.setCategories([]);
    }

    await CategoryPadService.cleanUp();

    return padInstance;
}

exports.addCategories = async (idPad, categories) => {
    const padInstance = await Pad.findByPk(idPad);

    for (let category of categories) {
        let categoryInstance = await CategoryService.findByName(category);

        if (!categoryInstance.length) {
            categoryInstance = await CategoryService.create({name: category});
        }

        await padInstance.addCategory(categoryInstance);
    }
}

exports.addMember = async (idPad, idUser) => {
    const padInstance = await Pad.findByPk(idPad);
    const userInstance = await UserService.findById(idUser);

    return await padInstance.addMember(userInstance);
}

exports.removeMember = async (idPad, idUser) => {
    const padInstance = await Pad.findByPk(idPad);
    const userInstance = await UserService.findById(idUser);

    return await padInstance.removeMember(userInstance);
}

exports.getMembers = async (idPad) => {
    const padInstance = await Pad.findByPk(idPad);
    return await padInstance.getMembers();
}