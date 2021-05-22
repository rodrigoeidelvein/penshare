const googleAuth = require('../middleware/googleAuth');
module.exports = app => {
    const likeController = require('../controllers/LikeController');
    const router = require('express').Router();
    router.post('/:id/like', googleAuth, likeController.handleLike);
    app.use('/api/pad/', router);
};
