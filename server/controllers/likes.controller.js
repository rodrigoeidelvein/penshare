const db = require('../models');

const Pad = db.pads;
const Like = db.likes;

const getLikeCount = async (padId) => {
    const likes = await Like.findAll({
        where: {
            padId
        }
    });

    console.log(likes.length)
    return likes.length;
}

exports.handleLike = async (req, res) => {
    const { user } = req;

    const padId = req.params.id;
    const pad = await Pad.findByPk(padId);

    if (!pad) {
        return res.status(404).send({ message: "Pad não foi encontrado ou foi removido." });
    }

    const like = await Like.findOne({
        where: {
            padId,
            userId: user.id
        }
    });

    if (!like) {
        await Like.create({
            userId: user.id,
            padId: padId
        });

        const likeCount = await getLikeCount(padId);

        return res.json({ liked: true, likeCount });
    } else {
        await like.destroy();
        const likeCount = await getLikeCount(padId);
        return res.send({ liked: false, likeCount });
    }
}