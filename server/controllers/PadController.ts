const db = require('../models')
const Sequelize = require('sequelize');
const {nanoid} = require('nanoid');

const {Pad, Like, PadAuthorization} = db;

class PadController {
    public async createPad(req, res) {
        const {user} = req;

        try {
            const createdPad = await Pad.create({
                id: nanoid(10),
                userId: user.id
            });

            PadAuthorization.create({
                id: nanoid(10),
                userId: user.id,
                sharedWith: user.id,
                padId: createdPad.id,
                roleId: 'autor'
            });

            res.status(201).send(createdPad);
        } catch (e) {
            console.error('Erro ao criar documento', e);
            res.sendStatus(500).send({message: "Erro ao criar documento"})
        }
    }

    public async getPadsByUserId(req, res) {
        const {user} = req;

        try {
            const padsByUser = await Pad.findAll({
                where: {
                    userId: user.id
                },
                include: ["author", {
                    model: Like,
                    attributes: ["userId"]
                }],
                attributes: {
                    include: [[Sequelize.fn("COUNT", Sequelize.col("Likes.id")), "likesCount"]]
                },
                group: ["Pad.id", "author.id", "Likes.id"]
            });

            for (const pad of padsByUser) {
                const isLiked = pad.Likes.some(x => x.userId === user.id);

                pad.setDataValue('liked', isLiked)
            }

            res.status(200).json(padsByUser);
        } catch (e) {
            console.log(e);
            console.log("Erro ao buscar documentos do usuário");
            res.status(500).send({message: "Erro ao buscar documentos do usuário"});
        }
    }

    public async getPad(req, res) {
        const {id: padId} = req.params;

        try {
        const pad = await Pad.findByPk(padId, {
            include: ["author", {
                model: Like,
                attributes: []
            }],
            attributes: {
                include: [[Sequelize.fn("COUNT", Sequelize.col("Likes.id")), "likesCount"]]
            },
            group: ["Pad.id", "author.id"]
        });

        // const {authorizations} = req.user;

        res.status(200).send({pad});
        } catch (e) {
            console.error(e);
            res.status(500).send({message: "Erro ao buscar pad"})
        }
    }

    public async updatePad(req, res) {
        const {id, content, rawContent, title} = req.body;

        try {
            await Pad.update({content, rawContent, title}, {
                where: {
                    id
                }
            });

            res.status(200).send({message: "ok"});
        } catch (e) {
            console.log(e);
            res.status(500).send({message: "Erro ao atualizar pad"});
        }
    }

    public async deletePad(req, res) {
        const {id: padId} = req.params;

        try {
            const pad = await Pad.findByPk(padId);
            if (!pad) {
                res.status(404).send({message: 'Pad não encontrado.'})
            }

            pad.destroy();
            res.status(200).send({message: 'Pad excluído com sucesso.'})
        } catch (e) {
            console.log(e);
            res.status(500).send({message: 'Erro ao excluir pad.'})
        }
    }

    public async mostPopularPads(req, res) {
        const {user} = req;

        try {
            const popularPads = await Pad.findAll({
                where: {
                    type: "PUBLIC"
                },
                order: [
                    [Sequelize.col('likesCount')]
                ],
                attributes: {
                    include: [[Sequelize.fn("COUNT", Sequelize.col("Likes.id")), "likesCount"]]
                },
                include: ["author", {
                    model: Like,
                    attributes: ['userId']
                }],
                group: ["Pad.id", "author.id", 'Likes.id']
            });


            for (const pad of popularPads) {
                const isLiked = pad.Likes.some(x => x.userId === user.id);

                pad.setDataValue('liked', isLiked)
            }

            if (popularPads.length) {
                res.status(200).send(popularPads);
            } else {
                res.status(200).send({message: "Nenhum documento foi criado publicamente.", pads: []});
            }
        } catch (e) {
            console.log(e);
            console.log("Erro ao buscar documentos mais populares");
            res.status(500).send({message: "Erro ao buscar pads mais populares"});
        }
    }

    public async getAuthorizationsForPad(req, res) {
        const {id: padId} = req.params;
        console.log(padId)
        try {
            const authorizedUsers = await PadAuthorization.findAll({
                where: {
                    padId
                },
                include: ['author']
            })

            console.log(authorizedUsers)

            res.status(200).send(authorizedUsers)
        } catch (e) {
            console.error("Erro ao buscar autorizações para o documento.");
        }
    }
}

export default PadController;