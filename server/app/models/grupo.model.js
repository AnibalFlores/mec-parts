'use strict'
module.exports = (sequelize, Sequelize) => {
    const Grupo = sequelize.define('grupo', {
        nombre: {
            type: Sequelize.STRING,
            parentId: {
                type: Sequelize.INTEGER,
                hierarchy: true
            }
        }
    },
        {
            tableName: 'grupos',
            timestamps: false,
        });

    return Grupo;
}
