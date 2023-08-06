const {Sequelize} = require("sequelize")

const db = new Sequelize({
    dialect: 'postgres',
    database: 'dbrepairs1',
    username: 'postgres',
    password: 'root',
    host: 'localhost',
    port: '5432',
    logging : false,

});

module.exports = {db}