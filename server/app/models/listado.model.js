'use strict'
module.exports = (sequelize, Sequelize) => {
  const Listado = sequelize.define('listado', {
    nombre: {
      type: Sequelize.STRING
    }
  }, {
    tableName: 'listados',
    timestamps: false,
  });

  return Listado;
}
