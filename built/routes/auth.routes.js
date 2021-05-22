var googleAuth = require('../middleware/googleAuth');
module.exports = function (app) {
    var auth = require('../controllers/auth.controller');
    var router = require('express').Router();
    // Login
    router.post('/', auth.login);
    router.delete('/', auth.logout);
    router.get('/me', googleAuth, auth.me);
    app.use('/api/auth/', router);
};
