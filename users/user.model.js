const { DataType, DataTypes } = require('sequelize');

module.exports = models;

function model(sequelize) {
    const attributes = {
        email: {type: DataTypes.STRING, allowNull: false },
        passwordHash: {type: DataTypes.STRING, allowNull: false },
        title: {type: DataTypes.STRING, allowNull: false },
        firstName: {type: DataTypes.STRING, allowNull: false },
        lastName: {type: DataTypes.STRING, allowNull: false },
        role: {type: DataTypes.STRING, allowNull: false },
    };

    const options = {
        defaultScope: {
            //exclude password hash by defualt
            attributes : {exclude: ['passwordHash'] }
        },
        scopes: {
            //include hash with this scope
            withHash: { attributes: {}, }
        }
    };
    return sequelize.define('User', attributes, options); 
}