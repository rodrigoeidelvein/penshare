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
    "unitTest": {
        "use_env_variable": "postgres://postgres:admin@localhost:5432/test",
        "url": "postgres://postgres:admin@localhost:5432/test",
        "dialect": "postgres",
        define: {
            underscored: true,
            underscoredAll: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            freezeTableName: true
        },
        logging: false
    },
    "test": {
        "use_env_variable": process.env.DATABASE_URL,
        "dialect": "postgres",
        "url": process.env.DATABASE_URL,
        "dialectOptions": {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        define: {
            underscored: true,
            underscoredAll: true,
            createdAt: "created_at",
            updatedAt: "updated_at",
            freezeTableName: true
        }
    },
    "production": {
        "use_env_variable": process.env.DATABASE_URL,
        "dialect": "postgres",
        "url": process.env.DATABASE_URL,
        "dialectOptions": {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        define: {
            underscored: true,
            underscoredAll: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            freezeTableName: true
        }
    }
}
