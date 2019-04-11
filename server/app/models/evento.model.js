'use strict'
module.exports = (sequelize, Sequelize) => {
  const Evento = sequelize.define('evento', {
    nombre: {
      type: Sequelize.STRING
    },
    inicio: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    duracion: {
      type: Sequelize.TIME
    }
  }, {
    tableName: 'eventos',
    timestamps: false,
  });

  return Evento;
}
