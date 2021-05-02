const db = require('../../models');
const Role = db.roles;

exports.createDefaultRoles = async () => {
    try {
        await Role.create({
            id: 'autor',
            read: true,
            write: true,
            delete: true
        })

        await Role.create({
            id: 'editor',
            read: true,
            write: true,
            delete: false
        })

        await Role.create({
            id: 'leitor',
            read: true,
            write: false,
            delete: false
        })
    } catch (e) {
        console.error("Erro ao criar roles padrões")
    }
}