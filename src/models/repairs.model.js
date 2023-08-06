const {DataTypes} = require('sequelize');
const {db} = require('./../database/config')

const Repair = db.define('repair',{
    id :{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    date :{
        type: DataTypes.DATE,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('Pending','Completed','Cancelled'),
        defaultValue: 'Pending'
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
})

module.exports = Repair;
