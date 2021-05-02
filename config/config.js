require('dotenv').config();

module.exports = {
    "development": {
        "url": process.env.DATABASE_URL,
        "password": "admin",
        "user": "postgres",
        "dialect": "postgres"
    },
    "test": {
        "url": process.env.DATABASE_URL,
        "dialect": "postgres"
    },
    "production": {
        "url": process.env.DATABASE_URL,
        "dialect": "postgres"
    }
}
