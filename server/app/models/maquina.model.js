'use strict'
module.exports = (sequelize, Sequelize) => {
  const Maquina = sequelize.define('maquina', {
    nombre: {
      type: Sequelize.STRING
    },
    terminalId: {
      type: Sequelize.INTEGER,
      defaulValue: 1
    }
  }, {
    tableName: 'maquinas',
    timestamps: false,
  });

  return Maquina;
}
