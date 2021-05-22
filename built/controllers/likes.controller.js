var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const db = require('../models');
const { Pad, Like } = db;
const getLikeCount = (padId) => __awaiter(this, void 0, void 0, function* () {
    const likes = yield Like.findAll({
        where: {
            padId
        }
    });
    return likes.length;
});
exports.handleLike = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const { user } = req;
    const padId = req.params.id;
    const pad = yield Pad.findByPk(padId);
    if (!pad) {
        return res.status(404).send({ message: "Pad não foi encontrado ou foi removido." });
    }
    const like = yield Like.findOne({
        where: {
            padId,
            userId: user.id
        }
    });
    if (!like) {
        yield Like.create({
            userId: user.id,
            padId: padId
        });
        const likeCount = yield getLikeCount(padId);
        return res.json({ liked: true, likeCount });
    }
    else {
        yield like.destroy();
        const likeCount = yield getLikeCount(padId);
        return res.send({ liked: false, likeCount });
    }
});
