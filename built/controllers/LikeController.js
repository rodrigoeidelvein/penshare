import { __awaiter } from "tslib";
const db = require('../models');
const { Pad, Like } = db;
class LikeController {
    getLikeCount(padId) {
        return __awaiter(this, void 0, void 0, function* () {
            const likes = yield Like.findAll({
                where: {
                    padId
                }
            });
            return likes.length;
        });
    }
    handleLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const likeCount = yield this.getLikeCount(padId);
                return res.json({ liked: true, likeCount });
            }
            else {
                yield like.destroy();
                const likeCount = yield this.getLikeCount(padId);
                return res.send({ liked: false, likeCount });
            }
        });
    }
}
export default LikeController;
