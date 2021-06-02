require('dotenv').config();

module.exports = {
    "development": {
        "use_env_variable": process.env.DATABASE_URL,
        "url": process.env.DATABASE_URL,
        "dialect": "postgres",
        define: {
            underscored: true,
            underscoredAll: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            freezeTableName: true
        }
    },
    "test": {
        "use_env_variable": process.env.DATABASE_URL,
        "dialect": "postgres",
        "dialectOptions": {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    },
    "production": {
        "url": process.env.DATABASE_URL,
        "dialect": "postgres"
    }
}
