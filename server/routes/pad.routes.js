const googleAuth = require('../middleware/googleAuth');
const hasAuthorization = require('../middleware/hasAuthorization');

module.exports = app => {
    const padController = require("../controllers/pads.controller");
    const router = require("express").Router();

    router.get("/user/", googleAuth, padController.getPadsByUserId);
    router.get("/popular/", googleAuth, padController.mostPopularPads);
    router.get("/:id/", googleAuth, padController.getPad);
    router.get("/authorization/:id/", googleAuth, padController.getAuthorizationsForPad);
    router.get("/:id/categories/", padController.getCategories);

    router.put("/", googleAuth, padController.updatePad);

    router.post("/", googleAuth, padController.createPad);
    router.put("/:id/categories/:idCategory", googleAuth, padController.addCategory);

    // Receives a list of categories by name and add to the pad
    router.post("/:id/categories", googleAuth, padController.addCategories);

    router.delete("/:id/categories/:idCategory", googleAuth, padController.deleteCategory)
    router.delete("/:id", googleAuth, padController.deletePad);

    app.use("/api/pad/", router);
}