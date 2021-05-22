const db = require('../models');

const {Pad, Like} = db;

class LikeController {
    private async getLikeCount(padId: string): Promise<number> {
        const likes = await Like.findAll({
            where: {
                padId
            }
        });

        return likes.length;
    }

    public async handleLike(req, res) {
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

            const likeCount = await this.getLikeCount(padId);

            return res.json({ liked: true, likeCount });
        } else {
            await like.destroy();
            const likeCount = await this.getLikeCount(padId);
            return res.send({ liked: false, likeCount });
        }
    }
}

export default LikeController;