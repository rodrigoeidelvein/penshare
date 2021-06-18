const SuggestionService = require("../services/SuggestionService");

exports.createSuggestion = async (req, res) => {
    const {user} = req;
    const idContributor = user.id;

    try {
        const createdSuggestion = await SuggestionService.create({...req.body, idContributor});

        res.status(201).send({suggestion: createdSuggestion});
    } catch (e) {
        console.error("Erro ao criar sugestão", e);
        res.status(500).send({message: "Erro ao criar sugestão"});
    }
}

exports.getSuggestion = async (req, res) => {
    const {id} = req.params;

    try {
        res.status(200).send(await SuggestionService.findById(id));
    } catch (e) {
        console.error("Erro ao buscar dados da sugestão", e);
        res.status(500).send({message: "Erro ao buscar dados da sugestão"});
    }
}

exports.getByPadOwner = async (req, res) => {
    const {idUser} = req.params;

    try {
        res.status(200).send(await SuggestionService.findByPadOwner(idUser))
    } catch (e) {
        console.error("Erro ao buscar sugestões do usuário", e);
        res.status(500).send({message: "Erro ao buscar sugestões do usuário"});
    }
}

exports.getSuggestionsByStatus = async (req, res) => {
    try {
        const status = req.query.status ? req.query.status : "";
        res.status(200).send(await SuggestionService.findByStatus(req.query.user, status))
    } catch (e) {
        console.error("Erro ao buscar sugestões do usuário", e);
        res.status(500).send({message: "Erro ao buscar sugestões do usuário"});
    }
}

exports.acceptSuggestion = async (req, res) => {
    try {
        res.json(await SuggestionService.updateStatus(req.params.id, "APPROVED", new Date()));
    } catch (e) {
        console.error("Erro ao aceitar sugestão", e);
        res.status(500).json({message: "Erro ao aceitar sugestão"});
    }
}

exports.rejectSuggestion = async (req, res) => {
    const {id} = req.params;

    try {
        res.json(await SuggestionService.updateStatus(id, "REJECTED"));
    } catch (e) {
        console.error("Erro ao rejeitar sugestão", e);
        res.status(500).json({message: "Erro ao rejeitar sugestão"});
    }
}

exports.deleteSuggestion = async (req, res) => {
    const {user} = req;

    try {
        await SuggestionService.delete(user.id, req.params.id)

        res.json({message: "Sugestão excluída com sucesso"});
    } catch (e) {
        console.error("Erro ao excluir sugestão", e);
        res.status(500).json({message: "Erro ao excluir sugestão"});
    }
}
