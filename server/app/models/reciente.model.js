/* La idea seria registrar todos los ingresos validos en
los terminales y luego hacer una stored procedure que a partir de
esta tabla haga un select distinct (sequelize no lo hace) de los usuarios por terminal ordenado
descendente por fecha y con un limit n que se lo pasamos como parametro
y que ademas purge este cada tanto para mantener solo esos n más recientes
distintos que usaron cada terminal
*/
'use strict'
module.exports = (sequelize, Sequelize) => {
  const Reciente = sequelize.define('reciente', {
    terminal: {// aca va el id del terminal
      type: Sequelize.INTEGER
    },
    operador: {// aca va el id del operador
      type: Sequelize.INTEGER
    },
    fecha: {// aca va la fecha del logueo
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  }, {
    tableName: 'recientes',
    timestamps: false,
  });

  return Reciente;
}