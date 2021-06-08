module.exports = app => {
    const suggestionController = require("../controllers/suggestions.controller");
    const router = require("express").Router();

    router.post("/", suggestionController.createSuggestion);
    router.get("/:id", suggestionController.getSuggestion);
    router.get("/owner/:idUser", suggestionController.getByPadOwner);

    app.use("/api/suggestion", router);
}