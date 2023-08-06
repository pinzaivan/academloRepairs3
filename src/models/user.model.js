const {DataTypes} = require('sequelize');
const {db} = require('./../database/config')


const User = db.define('users',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false,
    },
    role:{
        type: DataTypes.ENUM('Client','Employee'),
        allowNull:false

    },
    status:{
        type: DataTypes.ENUM('Avaliable','No avaliable'),
        defaultValue: 'Avaliable',
    }

});

module.exports = User;