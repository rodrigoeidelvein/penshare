const googleAuth = require('../middleware/googleAuth');

module.exports = app => {
    const suggestionController = require("../controllers/suggestions.controller");
    const router = require("express").Router();

    router.post("/", googleAuth, suggestionController.createSuggestion);

    router.put("/accept/:id", googleAuth, suggestionController.acceptSuggestion);
    router.put("/reject/:id", googleAuth, suggestionController.rejectSuggestion);

    router.get("/:id", googleAuth, suggestionController.getSuggestion);
    router.get("/", googleAuth, suggestionController.getSuggestionsByStatus);
    router.get("/owner/:idUser", googleAuth, suggestionController.getByPadOwner);

    router.delete("/:id", googleAuth, suggestionController.deleteSuggestion);

    app.use("/api/suggestion", router);
}