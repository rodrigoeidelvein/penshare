const { revision: Revision } = require('../models');

exports.create = async (idBranch, idUser) => {
    return Revision.create({ idBranch, idUser });
}