const {
  Maquinas
} = require("../datos/maquinas");
const {
  Terminales
} = require("../datos/terminales");
const db = require('../configs/db.config');
const Op = db.Sequelize.Op;
const Terminal = db.terminal;
const Maquina = db.maquina;
const Listado = db.listado;

// Iniciar datos: Maquina (1 - Testing)
exports.init = (req, res) => {
  Terminal.bulkCreate(Terminales).then(() => {
    Maquina.bulkCreate(Maquinas).then(() => {
      return Maquina.findAll();
    }).then(maquinas => {
      console.log('Terminales y Maquinas creadas');
    });
  })

};

// Listar todas las maquinas y operaciones incluida la de pruebas
exports.findAll = (req, res) => {
  Maquina.findAll({
    attributes: {
      exclude: ['terminalId']
    },
    include: [{
      model: Terminal,
      attributes: ['id', 'nombre'],
      as: 'terminal'
    },
    {
      model: Listado,
      attributes: ['id', 'nombre', 'activo'],
      as: 'listados'
    }
    ],
    where: {
      id: {
        [Op.gt]: 0 // poniendo 1 excluimos la de pruebas
      }
    },
    order: [
      ['nombre', 'ASC']
    ]
  }).then(maquinas => {
    res.json(maquinas);
  });
}

// Listar todos las maquinas incluida la de pruebas
exports.findAllStock = (req, res) => {
  Maquina.findAll({
    attributes: {
      exclude: ['terminalId']
    },
    include: [{
      model: Terminal,
      attributes: ['id', 'nombre'],
      as: 'terminal'
    }],
    order: [
      ['nombre', 'ASC']
    ]
  }).then(maquinas => {
    res.json(maquinas);
  });
};

// Lista todas las maquinas activas por terminal id
// incluida la de prueba
exports.findAllbyTerminal = (req, res) => {
  Maquina.findAll({
    attributes: {
      exclude: ['terminalId']
    },
    where: {
      terminalId: req.params.id,
      activa: true
    },
    order: [
      ['nombre', 'ASC']
    ]
  }).then(maquinas => {
    res.json(maquinas);
  });
}

// Vincular maquina con sus listados por id
exports.vinculaLista = (req, res) => {
  Maquina.findByPk(req.body.maquina.id)
    .then(maq => {
      var pks = []; // array de pks para la columna listadoId
      for (var i = 0; i < req.body.listados.length; i++) {
        pks.push(req.body.listados[i].id); //armamos con solo los pks de los listados
      }
      // ojo aca es "setListados" y no "addListados" de esa manera se eliminan los vínculos previos
      // de la join table 
      maq.setListados(pks);
    })
    .then(() => {
      // console.log('Listados de Maquina Actualizados.');
      res.json(Maquina.findByPk(req.body.maquina.id))
    })
}

// Buscar por id
exports.findById = (req, res) => {
  Maquina.findByPk(req.params.id, {
    attributes: {
      exclude: ['terminalId']
    },
    include: [{
      model: Terminal,
      attributes: ['id', 'nombre'],
      as: 'terminal'
    }],
  }).then(rub => res.json(rub))
};

// Borrar por id
exports.destroy = (req, res) => {
  if (req.params.id > 1) {
    Maquina.destroy({
      where: {
        id: req.params.id
      }
    }).then(response => {
      res.json(response)
    })
  } else {
    res.sendStatus(405); // metodo no permitido (de borrar el 1)
  }
}

// Maquina nueva
exports.create = (req, res) => {
  Maquina.create({
    nombre: req.body.nombre,
    tipo: req.body.tipo,
    terminalId: req.body.terminal.id,
    pap: req.body.pap,
    aterminar: req.body.aterminar,
    activa: req.body.activa
  }).then(maq => {
    res.send(maq)
    console.log(maq.get())
  })

}

// Actualiza por id
exports.update = (req, res) => {
  Maquina.update({
    nombre: req.body.nombre,
    tipo: req.body.tipo,
    terminalId: req.body.terminal.id,
    pap: req.body.pap,
    aterminar: req.body.aterminar,
    activa: req.body.activa
  }, {
      where: {
        id: req.params.id
      }
    })
    .then((count) => {
      console.log('Maquinas Actualizadas: ' + count);
      res.json(Maquina.findByPk(req.params.id))
    })
}
