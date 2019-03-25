'use strict'
module.exports = (sequelize, Sequelize) => {
    const MaquinaListado = sequelize.define('maquinalistado', {
    // nada aca para que use solo las 2 columnas como pks
    },{
        tableName: 'maquinas_listados',
        timestamps: false,
      });

  return MaquinaListado;
}

