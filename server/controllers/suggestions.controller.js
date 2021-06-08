const SuggestionService = require("../services/SuggestionService");

exports.createSuggestion = async (req, res) => {
    try {
        const createdSuggestion = await SuggestionService.create(req.body);

        res.status(201).send({ suggestion: createdSuggestion });
    } catch (e) {
        console.error("Erro ao criar sugestão", e);
        res.status(500).send({ message: "Erro ao criar sugestão" });
    }
}

exports.getSuggestion = async (req, res) => {
    const { id } = req.params;

    try {
        res.status(200).send(await SuggestionService.findById(id));
    } catch (e) {
        console.error("Erro ao buscar dados da sugestão", e);
        res.status(500).send({ message: "Erro ao buscar dados da sugestão" });
    }
}

exports.getByPadOwner = async (req, res) => {
    const { idUser } = req.params;

    try {
        res.status(200).send(await SuggestionService.findByPadOwner(idUser))
    } catch (e) {
        console.error("Erro ao buscar sugestões do usuário", e);
        res.status(500).send({ message: "Erro ao buscar sugestões do usuário" });
    }
}
