'use strict'
module.exports = (db, sequelize, Sequelize) => {

  // importo las entidades a asociar una por una (esto tambien crea las tablas vacias)

  db.estacion = require('../models/estacion.model')(sequelize, Sequelize);
  db.parte = require('../models/parte.model')(sequelize, Sequelize);
  db.terminal = require('../models/terminal.model')(sequelize, Sequelize);
  db.operario = require('../models/operario.model')(sequelize, Sequelize);
  db.usuario = require('../models/usuario.model')(sequelize, Sequelize);
  db.maquina = require('../models/maquina.model')(sequelize, Sequelize);
  db.operacion = require('../models/operacion.model')(sequelize, Sequelize);
  db.labor = require('../models/labor.model')(sequelize, Sequelize);
  db.evento = require('../models/evento.model')(sequelize, Sequelize);
  db.reciente = require('../models/reciente.model')(sequelize, Sequelize);

  // Aca definimos lo importante y complicado las asociaciones en la DB

  // Una estacion tiene registro de varios terminales en tabla terminales tendremos una fk estacionId
  db.estacion.hasMany(db.terminal, {
    as: 'terminales'
  });
  db.terminal.belongsTo(db.estacion, {
    as: 'estacion'
  });

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

  // Aca hacemos asociaciones n:m entre los terminales y las partes
  // la ventaja es que todos los terminales recibiran un listado de codigos reducido 
  // por medio de una tabla join terminales_partes para guardar multiples codigos de partes por terminal
  // y tener una busqueda incremental más optima

  db.terminal.belongsToMany(db.parte, {
      as: 'partes',
      through: 'terminales_partes',
      timestamps: false,
      foreignKey: 'id',
      otherKey: 'parteId'
  });
  db.parte.belongsToMany(db.terminal, {
      as: 'terminales',
      through: 'terminales_partes',
      timestamps: false,
      foreignKey: 'parteId',
      otherKey: 'id'
  });

  return db; // devolvemos la db con las asociaciones aplicadas
}
