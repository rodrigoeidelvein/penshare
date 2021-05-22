const googleAuth = require('../middleware/googleAuth');
export default () => app => {
    const auth = require('../controllers/auth.controller');
    const router = require('express').Router();
    // Login
    router.post('/', auth.login);
    router.delete('/', auth.logout);
    router.get('/me', googleAuth, auth.me);
    app.use('/api/auth/', router);
};
