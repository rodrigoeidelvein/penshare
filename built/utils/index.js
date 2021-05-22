var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const db = require('../models');
const Role = db.roles;
exports.createDefaultRoles = () => __awaiter(this, void 0, void 0, function* () {
    try {
        yield Role.create({
            id: 'autor',
            read: true,
            write: true,
            delete: true
        });
        yield Role.create({
            id: 'editor',
            read: true,
            write: true,
            delete: false
        });
        yield Role.create({
            id: 'leitor',
            read: true,
            write: false,
            delete: false
        });
    }
    catch (e) {
        console.error("Erro ao criar roles padrões");
    }
});
