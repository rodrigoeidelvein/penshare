const googleAuth = require("../middleware/googleAuth");

module.exports = app => {
    const categoryController = require("../controllers/category.controller");
    const router = require("express").Router();

    router.post("/", googleAuth, categoryController.create);
    router.put("/:id", googleAuth, categoryController.update);
    router.get("/:id", categoryController.findById);
    router.get("/", categoryController.findByName);

    app.use("/api/category", router);
}