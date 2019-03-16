const db = require('../configs/db.config');
const Op = db.Sequelize.Op;
const Listado = db.listado;

// Iniciar datos: Listados de partes
exports.init = (req, res) => {
  Listado.create({
    nombre: 'MPXX'
  });

  Listado.create({
    nombre: 'MPXXXX'
  });

  Listado.create({
    nombre: 'MPXXXX-X'
  });

  Listado.create({
    nombre: 'Bomba'
  });

  Listado.create({
    nombre: 'Pistones'
  });

  Listado.create({
    nombre: 'CRXXXX'
  });

  Listado.create({
    nombre: 'CRXXXX-X'
  });

  Listado.create({
    nombre: 'CR'
  });

}

// Listar todos las listados de partes
exports.findAll = (req, res) => {
  Listado.findAll({
    attributes: ['id', 'nombre'],
    where: {
      id: {
        [Op.gt]: 0 // aca ponemos el filtro
      }
    },
    order: [
      ['nombre', 'ASC']
    ]
  }).then(listados => {
    res.json(listados);
  });
}

// Listar todos los listados de partes
exports.findAllStock = (req, res) => {
  Listado.findAll({
    attributes: ['id', 'nombre'],
    order: [
      ['nombre', 'ASC']
    ]
  }).then(lis => {
    res.json(lis);
  });
};

// Buscar por id
exports.findById = (req, res) => {
  Listado.findByPk(req.params.id, {
    attributes: ['id', 'nombre']
  }).then(lis => res.json(lis))
};

// Borrar por id
exports.destroy = (req, res) => {
  if (req.params.id > 1) {
    Listado.destroy({
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

// Listado nuevo
exports.create = (req, res) => {
  Listado.create({
    nombre: req.body.nombre
  }).then(lis => {
    res.send(lis)
    console.log(lis.get())
  })

}

// Actualiza por id
exports.update = (req, res) => {
  Listado.update({
      nombre: req.body.nombre
    }, {
      where: {
        id: req.params.id
      }
    })
    .then((count) => {
      console.log('Listados Actualizados: ' + count);
      res.json(Listado.findByPk(req.params.id))
    })
}
