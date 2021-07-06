const googleAuth = require("../middleware/googleAuth");

module.exports = app => {
    const userController = require("../controllers/users.controller");
    const router = require("express").Router();

    router.get("/", googleAuth, userController.findByEmail);

    app.use("/api/user/", router);
}