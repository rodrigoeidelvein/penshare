const db = require("../models")
const PadService = require("../services/PadService");
const BranchService = require("../services/BranchService");
const CategoryPadService = require("../services/CategoryPadService");

const {
    revision: Revision,
} = db;

exports.createPad = async (req, res) => {
    const {user} = req;

    try {
        const createdPad = await PadService.create(user.id);

        const createdBranch = await BranchService.create(createdPad.id, createdPad.userId);

        await Revision.create(createdBranch.id, createdBranch.userId);

        res.status(201).send({ pad: createdPad, branch: createdBranch });
    } catch (e) {
        console.error("Erro ao criar documento", e);
        res.sendStatus(500).send({message: "Erro ao criar documento"})
    }
}

exports.getPadsByUserId = async (req, res) => {
    const {user} = req;

    try {
        const padsByUser = await PadService.findAllByUser(user.id);

        for (const pad of padsByUser) {
            const isLiked = pad.like_pads.some(x => x.idUser === user.id);

            pad.setDataValue("liked", isLiked)
        }

        res.status(200).json(padsByUser);
    } catch (e) {
        console.log(e);
        console.log("Erro ao buscar documentos do usuário");
        res.status(500).send({message: "Erro ao buscar documentos do usuário"});
    }
}

exports.getPad = async (req, res) => {
    const {id: idPad} = req.params;
    const {user} = req;
    const pad = await PadService.findById(idPad);

    const isOwner = pad.idUser === user.id

    res.status(200).send({pad, isOwner});
}

exports.updatePad = async (req, res) => {
    try {
        const idPad = req.body.id;

        res.status(200).send(await PadService.update(req.body, idPad));
    } catch (e) {
        console.log(e);
        res.status(500).send({message: "Erro ao atualizar pad"});
    }
}

exports.deletePad = async (req, res) => {
    const {id: idPad} = req.params;
    const {user: idUser} = req;

    try {
        await PadService.delete(idPad, idUser);

        res.status(200).send({message: 'Pad excluído com sucesso.'});
    } catch (e) {
        console.log(e);
        res.status(500).send({message: 'Erro ao excluir pad.'});
    }
}

exports.mostPopularPads = async (req, res) => {
    const {user} = req;

    try {
        const popularPads = await PadService.findMostPopular();

        for (const pad of popularPads) {
            const isLiked = pad.like_pads.some(x => x.idUser === user.id);

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

exports.getPadsShareWithUser = async (req, res) => {
    try {
        const { user } = req;

        const sharedPads = await PadService.findSharedWithUser(user.id);

        if (sharedPads.length) {
            res.status(200).send(sharedPads);
        } else {
            res.status(200).send({message: "Nenhum documento compartilhado com o usuário.", pads: []});
        }
    } catch (e) {
        console.log("Erro ao buscar documentos mais populares", e);
        res.status(500).send({message: "Erro ao buscar pads mais populares"});
    }
}

exports.getAuthorizationsForPad = async (req, res) => {
    const {id: padId} = req.params;

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

exports.getCategories = async (req, res) => {
    try {
        res.json(await CategoryPadService.findByPadId(req.params.id));
    } catch (e) {
        console.error("Erro ao buscar categorias do documento.", e);
        res.status(500).send({message: "Erro ao buscar categories do documento."});
    }
}

exports.getPadsByCategory = async (req, res) => {
    try {
        res.json(await CategoryPadService.findByPadId(req.params.id));
    } catch (e) {
        console.error("Erro ao buscar documentos por categoria.", e);
        res.status(500).send({message: "Erro ao buscar documentos por categoria."});
    }
}

exports.addCategory = async (req, res) => {
    try {
        res.json(await CategoryPadService.addCategoryToPad(req.params.id, req.params.idCategory));
    } catch (e) {
        console.error("Erro ao adicionar categoria", e);
        res.status(500).send({message: "Erro ao adicionar categoria"});
    }
}

exports.addCategories = async (req, res) => {
    console.log(req.body.categories)
    try {
        const { id: idPad } = req.params;
        await PadService.removeCategories(idPad);
        await PadService.addCategories(idPad, req.body.categories);
    } catch (e) {
        console.error("Erro ao adicionar categorias.", e);
        res.status(500).send({message: "Erro ao adicionar categorias"});
    }
}

exports.deleteCategory = async (req, res) => {
    try {
        res.json(await CategoryPadService.removeCategoryFromPad(req.params.id, req.params.idCategory));
    } catch (e) {
        console.error("Erro ao excluir categoria do documento.", e);
        res.status(500).send({message: "Erro ao excluir categoria do documento."});
    }
}

exports.changeTypePad = async (req, res) => {
    const { id: idPad } = req.params;
    const { type } = req.body;

    try {
        const pad = await PadService.findById(idPad);
        res.status(200).send(await PadService.update({...pad, type}, idPad));
    } catch (e) {
        console.error("Erro ao alterar o status do documento.", e);
        res.status(500).send({message: "Erro ao alterar o status do documento."});
    }
}

exports.getMembers = async (req, res) => {
    try {
        res.json(await PadService.getMembers(req.params.id));
    } catch (e) {
        console.error("Erro ao buscar membros do documento.", e);
        res.status(500).send({message: "Erro ao buscar membros do documento."});
    }
}

exports.addMember = async (req, res) => {
    const { idPad, idUser } = req.params;

    try {
        res.json(await PadService.addMember(idPad, idUser));
    } catch (e) {
        console.error("Erro ao buscar membros do documento.", e);
        res.status(500).send({message: "Erro ao buscar membros do documento."});
    }
}

exports.removeMember = async (req, res) => {
    const { idPad, idUser } = req.params;

    try {
        res.json(await PadService.removeMember(idPad, idUser));
    } catch (e) {
        console.error("Erro ao buscar membros do documento.", e);
        res.status(500).send({message: "Erro ao buscar membros do documento."});
    }
}