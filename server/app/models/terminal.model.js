'use strict'
module.exports = (sequelize, Sequelize) => {
    const Terminal = sequelize.define('terminal', {
        nombre: {
            type: Sequelize.STRING
        },
        estado: {
            type: Sequelize.STRING,
            defaultValue: 'Apagado',
            validate: {
                isIn: [['Apagado','En Espera', 'PAP', 'Mecanizando', 'Operando']],
            }
        },
        laboractual: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        iniciolabor:{// tomamos el inicio de labor y agregamos este dato aquí para el status
            type: Sequelize.DATE
        },
        inicioevento:{// tomamos el inicio del ultimo evento y agregamos este dato aquí para el status
            type: Sequelize.DATE
        },
        operarioactual: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        operarioname: {
            type: Sequelize.STRING,
            defaultValue: ''            
        },
        maquinaactual: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        maquinaname: {
            type: Sequelize.STRING,
            defaultValue: ''            
        },
        parteactual: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        partecodigo: {
            type: Sequelize.STRING,
            defaultValue: ''            
        },
        nroordenactual: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        esmaquina: {
            type: Sequelize.BOOLEAN,
            defaultValue: false            
        },
        espap: {
            type: Sequelize.BOOLEAN,
            defaultValue: false            
        },
        esaterminar: {
            type: Sequelize.BOOLEAN,
            defaultValue: false            
        }
    }, {
        tableName: 'terminales',
        timestamps: false,
    });

    return Terminal;
}