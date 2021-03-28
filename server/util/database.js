const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'admin', {
    host: 'localhost',
    dialect: 'postgres'
});

const connectDatabase = async () => {
    try {
        await sequelize.authenticate()
    } catch (error) {
        console.error('Não foi possível conectar ao banco de dados', error);
    }
}

connectDatabase();