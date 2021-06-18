const {pad_suggestion: PadSuggestion, pad: Pad, user: User} = require("../models")

exports.create = async (suggestion) => {
    return PadSuggestion.create(suggestion);
}

exports.findById = async (id) => {
    return PadSuggestion.findByPk(id, {
        include: [{model: User}]
    });
}

exports.update = async (suggestion, idSuggestion) => {
    return PadSuggestion.update(suggestion, {where: {id: idSuggestion}})
}

exports.updateStatus = async (idSuggestion, status) => {
    const suggestion = await PadSuggestion.findByPk(idSuggestion);
    suggestion.status = status;
    suggestion.reviewed_at = new Date();
    await suggestion.save();
    return suggestion;
}

exports.findByStatus = async (idUser, status) => {
    const options = {
        ...(status && {where: {status}}),
        include: [{
            model: Pad,
            where: {idUser}
        }, {
            model: User
        }]
    }

    return PadSuggestion.findAll(options);
}

exports.delete = async (idUser, idSuggestion) => {
    const suggestion = await PadSuggestion.findByPk(idSuggestion, {
        include: [{
            model: Pad,
            where: {idUser}
        }]
    });

    return suggestion.destroy();
}

/**
 * Retorna as sugestões relacionadas ao dono do Pad.
 * idUser é referente ao dono do Pad.
 * @param idUser
 * @returns {Promise<PadSuggestion[]>}
 */
exports.findByPadOwner = async (idUser) => {
    return PadSuggestion.findAll({
        include: [{
            model: Pad,
            where: {idUser}
        }, {
            model: User
        }]
    });
}