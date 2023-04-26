const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Activity', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: {
                    args: [[1, 2, 3, 4, 5]],
                    msg: "Must be a number between 1 and 5"
                }
            }
        },
        duration: {
            type: DataTypes.FLOAT,
            validate: {
                min: 0,
            }
        },
        season: {
            type: DataTypes.ENUM,
            values: ['spring', 'summer', 'autumn', 'winter'],
            allowNull: false,
        },
    },
    {timestamps: false});
};