const { category_pad: CategoryPad, pad: Pad } = require("../models");
const CategoryService = require("../services/CategoryService");
const PadService = require("../services/PadService");

exports.create = async (idCategory, idPad) => {
    return CategoryPad.create({ idCategory, idPad });
}

exports.delete = async (idCategory, idPad) => {
    const categoryPad = CategoryPad.findAll({ where: { idCategory, idPad }});

    return categoryPad.destroy();
}

exports.findByPadId = async (idPad) => {
    return CategoryPad.findAll({ where: { idPad }});
}

exports.findPadsByCategoryId = async (idCategory) => {
    return CategoryPad.findAll({ where: { idCategory }});
}

exports.addCategoryToPad = async (idPad, idCategory) => {
    const pad = await Pad.findByPk(idPad);
    const category = await CategoryService.findById(idCategory);

    pad.addCategory(category);

    return CategoryPad.findAll({ where: { idPad }});
}

exports.removeCategoryFromPad = async (idPad, idCategory) => {
    const pad = await Pad.findByPk(idPad);
    const category = await CategoryService.findById(idCategory);

    pad.removeCategory(category);

    return CategoryPad.findAll({ where: { idPad }});
}