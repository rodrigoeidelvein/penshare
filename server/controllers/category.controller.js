const CategoryService = require("../services/CategoryService");
const CategoryPadService = require("../services/CategoryPadService");

exports.create = async (req, res) => {
    try {
        res.status(201).json(await CategoryService.create(req.body));
    } catch (e) {
        console.error("Erro ao criar categoria", e);
        res.status(500).json({message: "Erro ao criar categoria"});
    }
}

exports.update = async (req, res) => {
    try {
        res.status(200).json(await CategoryService.update(req.body, req.params.id));
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

exports.findAll = async (req, res) => {
    try {
        res.status(200).json(await CategoryService.findAll());
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

exports.findPadsByCategoryId = async (req, res) => {
    try {
        res.status(200).json(await CategoryPadService.findPadsByCategoryId(req.params.id));
    } catch (e) {
        console.error("Erro ao encontrar categoria", e);
        res.status(500).json({message: "Erro ao encontrar categoria"});
    }
}