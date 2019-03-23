const { Maquinas } = require("../datos/maquinas");
const { Terminales } = require("../datos/terminales");
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
      console.log('Terminales y Maquinas creadas')
    });
  })

};

// Listar todos las maquinas excluida la de pruebas
exports.findAll = (req, res) => {
  Maquina.findAll({
    attributes: ['id', 'nombre'],
    include: [{
      model: Terminal,
      attributes: ['id', 'nombre'],
      as: 'terminal'
    },
    {
      model: Listado,
      attributes: ['id', 'nombre', 'activo'],
      as: 'listados'
    }],
    where: {
      id: {
        [Op.gt]: 1
      }
    },
    order: [['nombre', 'ASC']]
  }).then(maquinas => {
    res.json(maquinas);
  });
}

// Listar todos las maquinas incluida la de pruebas
exports.findAllStock = (req, res) => {
  Maquina.findAll({
    attributes: ['id', 'nombre'],
    include: [{
      model: Terminal,
      attributes: ['id', 'nombre'],
      as: 'terminal'
    }],
    order: [['nombre', 'ASC']]
  }).then(maquinas => {
    res.json(maquinas);
  });
};

// Vincular maquina con sus listados por id
exports.vinculaLista = (req, res) => {
  Maquina.findByPk(req.body.maquina.id)
    .then(maq => {
      var pks = [];// array de pks para la columna listadoId
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
    attributes: ['id', 'nombre'],
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
    terminalId: req.body.terminal.id
  }).then(maq => {
    res.send(maq)
    console.log(maq.get())
  })

}

// Actualiza por id
exports.update = (req, res) => {
  Maquina.update({
    nombre: req.body.nombre,
    terminalId: req.body.terminal.id
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
