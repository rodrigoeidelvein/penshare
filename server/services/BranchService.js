const {nanoid} = require("nanoid");
const { branch: Branch } = require('../models');

exports.create = async (idPad, idUser) => {
    return Branch.create({ id: nanoid(20), idPad, idUser });
}