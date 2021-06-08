const {pad_suggestion: PadSuggestion, pad: Pad} = require("../models")

exports.create = async (suggestion) => {
    return PadSuggestion.create(suggestion);
}

exports.findById = async (id) => {
    return PadSuggestion.findByPk(id);
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
            where: { idUser }
        }]
    });
}