const db = require('../models')
const { nanoid } = require('nanoid');
const Pad = db.pads;
const User = db.users;

exports.createPad = async (req, res) => {
    const { user } = req;

    console.log(user)

    const createdPad = await Pad.create({
        id: nanoid(10),
        userId: user.id
    });

    console.log(JSON.stringify(createdPad, null, 4));
    res.status(201).send(createdPad);
}

exports.getPadsByUserId = async (req, res) => {
    const { user } = req;

    const padsByUser = await User.findByPk(user.id, { include: ["pads"] });
    res.status(200).json(padsByUser);
}

exports.getPad = async (req, res) => {
    const {id: padId} = req.params;

    const pad = await Pad.findByPk(padId, { include: ["author"] });

    res.status(200).send(pad);
}

exports.updatePad = async (req, res) => {
    const { id, content, rawContent, title } = req.body;

    try {
        await Pad.update({ content, rawContent, title  }, {
            where: {
                id
            }
        });

        res.status(200).send({ message: "ok" });
    } catch (e) {
        console.log(e);
        res.status(500).send({message: "Erro ao atualizar pad"});
    }
}

exports.deletePad = async (req, res) => {
    const { id: padId } = req.params;

    try {
        const pad = await Pad.findByPk(padId);
        console.log(pad)
        if (!pad) {
            res.status(404).send({ message: 'Pad não encontrado.' })
        }

        pad.destroy();
        res.status(200).send({ message: 'Pad excluído com sucesso.' })
    } catch (e) {
        console.log(e);
        res.status(500).send({ message: 'Erro ao excluir pad.' })
    }
}
