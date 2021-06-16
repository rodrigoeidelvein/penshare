const CategoryService = require("../services/CategoryService");

exports.create = async (req, res) => {
    try {
        const createdCategory = await CategoryService.create(req.body);

        res.status(201).json({ category: createdCategory });
    } catch (e) {
        console.error("Erro ao criar categoria", e);
        res.status(500).json({message: "Erro ao criar categoria"});
    }
}

exports.update = async (req, res) => {
    try {
        await CategoryService.update(req.body, req.params.id);

        res.status(200).json({ message: "ok" });
    } catch (e) {
        console.error("Erro ao atualizar categoria", e);
        res.status(500).json({message: "Erro ao atualizar categoria"});
    }
}

exports.findById = async (req, res) => {
    try {
        res.status(200).json(await CategoryService.findById(req.params.id));
    } catch (e) {
        console.error("Erro ao encontrar categoria", e);
        res.status(500).json({message: "Erro ao encontrar categoria"});
    }
}

exports.findByName = async (req, res) => {
    try {
        res.status(200).json(await CategoryService.findByName(req.query.name));
    } catch (e) {
        console.error("Erro ao encontrar categoria", e);
        res.status(500).json({message: "Erro ao encontrar categoria"});
    }
}