const {
  Operarios
} = require("../datos/operarios");
const db = require('../configs/db.config');
const Operario = db.operario;
const Op = db.Sequelize.Op;

// Iniciar datos: Operarios
exports.init = (req, res) => {

  Operario.bulkCreate(Operarios).then(() => {
    return Operario.findAll();
  }).then(operarios => {
    console.log('Operarios creados')
  })
};

// Listar todos los Operarios ordenados por apellido y nombre
exports.findAll = (req, res) => {
  Operario.findAll({
    attributes: ['id', 'nombre', 'apellido', 'activo'],
    order: [
      ['apellido', 'ASC'],
      ['nombre', 'ASC']
    ]
  }).then(operarios => {
    res.json(operarios);
  });
};

// Localizar por id
exports.findById = (req, res) => {
  Operario.findByPk(req.params.id, {
    attributes: ['id', 'nombre', 'apellido', 'activo']
  }).then(ope => res.json(ope))
};

// Borrar por id
exports.destroy = (req, res) => {
  Operario.destroy({
    where: {
      id: req.params.id
    }
  }).then(response => res.json(response))
}

// Nuevo Operario
exports.create = (req, res) => {
  Operario.create({
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    pin: req.body.pin,
    activo: req.body.activo
  }).then(ope => {
    res.send(ope)
    console.log(ope.get())
  })

}

// Actualizar
exports.update = (req, res) => {
  Operario.update({
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      pin: req.body.pin,
      activo: req.body.activo
    }, {
      where: {
        id: req.params.id
      }
    })
    .then((count) => {
      console.log('Operarios actualizados: ' + count);
      res.json(Operario.findByPk(req.params.id))
    })

}

// Valida pin
/* exports.login = (req, res) => {
  Operario.findByPk(req.body.id)
    .then(ope => {
      console.log('id: ' + ope.id + ' pin: ' + ope.pin);
      console.log(ope.pin === req.body.pin && ope.activo);
      res.json(ope.pin === req.body.pin && ope.activo);
    })

}*/
