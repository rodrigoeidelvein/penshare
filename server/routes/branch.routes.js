const googleAuth = require('../middleware/googleAuth');

module.exports = app => {
    const branchController = require('../controllers/branches.controller');
    const router = require('express').Router();

    // Retorna as versões (branches) de um pad
    router.get('/:padId/', googleAuth, branchController.getBranchesForPad);

    app.use('/api/branch/', router);
}