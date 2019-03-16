'use strict'
module.exports = (sequelize, Sequelize) => {
  const Parte = sequelize.define('parte', {
    codigo: {
      type: Sequelize.STRING,
      allownull: false
    },
    activa: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    }
  }, {
    indexes: [
      // Creamos un indice unico para el codigo mecpart + el listado
      {
        unique: true,
        fields: ['codigo', 'listadoId']
      }
    ],
    tableName: 'partes',
    timestamps: false,
  });

  return Parte;
}
