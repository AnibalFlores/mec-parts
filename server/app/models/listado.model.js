'use strict'
module.exports = (sequelize, Sequelize) => {
  const Listado = sequelize.define('listado', {
    nombre: {
      type: Sequelize.STRING
    },
    activo: {
			type: Sequelize.BOOLEAN,
			defaultValue: true
		}
  }, {
    tableName: 'listados',
    timestamps: false,
  });

  return Listado;
}
