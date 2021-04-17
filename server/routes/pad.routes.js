const googleAuth = require('../middleware/googleAuth');

module.exports = app => {
    const padController = require('../controllers/pads.controller');
    const router = require('express').Router();


    router.get('/user/', googleAuth, padController.getPadsByUserId);
    router.get('/:id/', googleAuth, padController.getPad);
    router.put('/', googleAuth, padController.updatePad);
    router.post('/', googleAuth, padController.createPad);
    router.delete('/:id', googleAuth, padController.deletePad);

    app.use('/api/pad/', router);
}