const googleAuth = require('../middleware/googleAuth');
const hasAuthorization = require('../middleware/hasAuthorization');

module.exports = app => {
    const padController = require('../controllers/pads.controller');
    const router = require('express').Router();

    router.get('/user/', googleAuth, padController.getPadsByUserId);
    router.get('/popular/', googleAuth, padController.mostPopularPads);
    router.get('/:id/', googleAuth, padController.getPad);
    router.put('/', googleAuth, padController.updatePad);
    router.post('/', googleAuth, padController.createPad);
    router.delete('/:id', googleAuth, padController.deletePad);

    // Turn pad public and private according to the request's body.
    router.put('/type/:id', googleAuth, padController.changeTypePad);

    router.get('/authorization/:id', googleAuth, padController.getAuthorizationsForPad);

    app.use('/api/pad/', router);
}