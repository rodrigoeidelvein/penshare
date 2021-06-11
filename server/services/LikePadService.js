const { like_pad: LikePad } = require('../models');

exports.create = async (idPad, idUser) => {
    return LikePad.create({ idPad, idUser });
}

exports.findAll = async (idPad) => {
    return LikePad.findAll({ where: { idPad }});
}

exports.getLikeAmount = async (idPad) => {
    const likes = await this.findAll(idPad);

    return likes.length;
}

exports.likePad = async (idPad, idUser) => {
    const like = await LikePad.findOne({
        where: {
            idPad,
            idUser
        }
    });

    if (!like) {
        await this.create(idPad, idUser);

        const likeCount = await this.getLikeAmount(idPad);

        return { liked: true, likeCount }
    } else {
        await like.destroy();
        const likeCount = await this.getLikeAmount(idPad);
        return { liked: false, likeCount }
    }
}

