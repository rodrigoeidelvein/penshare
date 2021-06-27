const { user: User } = require("../models");
const { Op } = require("sequelize")

exports.findByEmail = async (email) => {
    return await User.findAll({
        limit: 5,
        where: {
            email: {
                [Op.like]: `${email}%`
            }
        }
    })
}