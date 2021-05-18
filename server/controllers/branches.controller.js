const db = require('../models');
const Sequelize = require('sequelize');

const {Branch} = db;

exports.getBranchesForPad = async (req, res) => {
    const {padId} = req.params;

    try {
        const branches = await Branch.findAll({ where: { padId}})

        console.log(branches);
        res.status(200).json(branches);
    } catch (e) {
        console.error(e);
        res.status(500).send({message: "Erro ao buscar versões do pad"});
    }


}