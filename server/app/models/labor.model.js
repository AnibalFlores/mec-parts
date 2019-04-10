'use strict'
module.exports = (sequelize, Sequelize) => {
  const Labor = sequelize.define('labor', {
    nombre: {// aca iria el nombre de la operacion no hay asociacion ya que la labor es un log
      type: Sequelize.STRING
    },
    operador:{
      type: Sequelize.STRING
    },
    inicio: {// tambien este dato estaria en el timestamp pero este seria el usado por el sistema
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    final: {
      type: Sequelize.DATE
    },
    aptas: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    rechazos: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    terminadas: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    observacion: {
      type: Sequelize.TEXT
    }
  }, {
    tableName: 'labores',
    timestamps: true,
  });

  return Labor;
}
