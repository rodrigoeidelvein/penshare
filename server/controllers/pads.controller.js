const db = require('../models')
const {nanoid} = require('nanoid');
const Pad = db.pads;
const User = db.users;
const PadAuthorization = db.padAuthorizations;

exports.createPad = async (req, res) => {
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
        console.error('Erro ao criar documento');
        res.sendStatus(500).send({message: "Erro ao criar documento"})
    }
}

exports.getPadsByUserId = async (req, res) => {
    const {user} = req;

    const padsByUser = await Pad.findAll({
        where: {
            userId: user.id
        }
    });

    res.status(200).json(padsByUser);
}

exports.getPad = async (req, res) => {
    const {id: padId} = req.params;

    const pad = await Pad.findByPk(padId, {include: ["author"]});

    const {authorizations} = req.user;

    res.status(200).send({pad, authorizations});
}

exports.updatePad = async (req, res) => {
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

exports.deletePad = async (req, res) => {
    const {id: padId} = req.params;

    try {
        const pad = await Pad.findByPk(padId);
        console.log(pad)
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

exports.mostPopularPads = async (req, res) => {
    try {
        const popularPads = await Pad.findAll({
            where: {
                type: "PUBLIC"
            },
            order: [
                ['stars', 'DESC']
            ],
            include: ["author"]
        });

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
