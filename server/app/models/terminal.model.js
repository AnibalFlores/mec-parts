'use strict'
module.exports = (sequelize, Sequelize) => {
    const Terminal = sequelize.define('terminal', {
        nombre: {
            type: Sequelize.STRING
        },
        estado: {
            type: Sequelize.STRING,
            validate: {
                isIn: [['Apagado','En Espera', 'PAP', 'Mecanizando']],
            }
        }
    }, {
        tableName: 'terminales',
        timestamps: true,
    });

    return Terminal;
}