const { category: Category } = require("../models");

exports.create = async (category) => {
    return Category.create(category);
}

exports.findById = async (id) => {
    return Category.findByPk(id);
}

exports.findAll = async () => {
    return Category.findAll();
}

exports.findByName = async (name) => {
    const conditions = name ? { where: { name }} : {};

    return Category.findAll(conditions);
}

exports.update = async (category, idCategory) => {
    return Category.update(category, { where: { id: idCategory } });
}
