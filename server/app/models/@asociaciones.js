'use strict'
module.exports = (db, sequelize, Sequelize) => {

  // importo las entidades a asociar una por una (esto tambien crea las tablas vacias)

  db.listado = require('../models/listado.model')(sequelize, Sequelize);
  db.parte = require('../models/parte.model')(sequelize, Sequelize);
  db.terminal = require('../models/terminal.model')(sequelize, Sequelize);
  db.operario = require('../models/operario.model')(sequelize, Sequelize);
  db.usuario = require('../models/usuario.model')(sequelize, Sequelize);
  db.maquina = require('../models/maquina.model')(sequelize, Sequelize);
  db.labor = require('../models/labor.model')(sequelize, Sequelize);
  db.evento = require('../models/evento.model')(sequelize, Sequelize);
  db.reciente = require('../models/reciente.model')(sequelize, Sequelize);
  

  // Aca definimos lo importante y complicado las asociaciones en la DB

  // Una terminal tiene registro de varias maquinas en tabla maquinas tendremos una fk terminalId
  db.terminal.hasMany(db.maquina, {
    as: 'maquinas'
  });
  db.maquina.belongsTo(db.terminal, {
    as: 'terminal'
  });

  // Una operario tiene registro de varias labores en tabla labores tendremos una fk operadorId
  db.operario.hasMany(db.labor, {
    as: 'labores'
  });
  db.labor.belongsTo(db.operario, {
    as: 'operario'
  });

  // Una labor tiene registro de varios eventos en tabla eventos tendremos una fk laborId
  db.labor.hasMany(db.evento, {
    as: 'eventos'
  });
  db.evento.belongsTo(db.labor, {
    as: 'labor'
  });

   // Una lista tiene registro de varias partes en tabla partes tendremos una fk listaId
   db.listado.hasMany(db.parte, {
    as: 'partes'
  });
  db.parte.belongsTo(db.listado, {
    as: 'listado'
  });

  // Aca hacemos asociaciones n:m entre las maquinas y los listados de partes
  // la ventaja es que todos las maquinas / operaciones recibiran un listado de codigos reducido 
  // por medio de una tabla join maquinas_listados para guardar multiples codigos de partes por maquina
  // y tener una busqueda incremental más optima

  db.maquina.belongsToMany(db.listado, {
      as: 'listados',
      through: 'maquinas_listados',
      timestamps: false,
      foreignKey: 'id',
      otherKey: 'listadoId'
  });
  db.listado.belongsToMany(db.maquina, {
      as: 'maquinas',
      through: 'maquinas_listados',
      timestamps: false,
      foreignKey: 'listadoId',
      otherKey: 'id'
  });



  return db; // devolvemos la db con las asociaciones aplicadas
}
