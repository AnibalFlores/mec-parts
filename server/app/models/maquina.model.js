'use strict'
module.exports = (sequelize, Sequelize) => {
  const Maquina = sequelize.define('maquina', {
    nombre: {
      type: Sequelize.STRING
    },
    tipo: {
      type: Sequelize.ENUM,
      values: ['Máquina', 'Operación'], // terminal de pruebas
      defaultValue: 'Máquina'
    },
    terminalId: {
      type: Sequelize.INTEGER,
      defaultValue: 1 // terminal de pruebas
    },
    pap: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    aterminar: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    activa: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
    subgrupo:{
      type: Sequelize.STRING,
      parentId: {
        type: Sequelize.INTEGER,
        hierarchy: true
    }
    }
  }, {
    tableName: 'maquinas',
    timestamps: false,
  });

  return Maquina;
}
