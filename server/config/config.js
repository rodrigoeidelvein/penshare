require('dotenv').config();
console.log(process.env.DATABASE_URL)
module.exports = {
    "development": {
        "use_env_variable": process.env.DATABASE_URL,
        "dialect": "postgres"
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
