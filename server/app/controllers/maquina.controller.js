const { Maquinas } = require("./maquinas");
const db = require('../configs/db.config');
const Op = db.Sequelize.Op;
const Maquina = db.maquina;

// Iniciar datos: Maquina (1 - Testing)
exports.init = (req, res) => {
  Maquina.bulkCreate(Maquinas).then(() => {
    return Maquina.findAll();
  }).then(maq =>
    console.log('Maquinas creadas'));


}

// Listar todos las maquinas excluida la de pruebas
exports.findAll = (req, res) => {
    Maquina.findAll({
    attributes: ['id', 'nombre'],
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
      order: [['nombre', 'ASC']]  
    }).then(maqs => {
      res.json(maqs);
    });
  };

// Buscar por id
exports.findById = (req, res) => {
    Maquina.findByPk(req.params.id, {
    attributes: ['id', 'nombre']
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
    nombre: req.body.nombre
  }).then(maq => {
    res.send(maq)
    console.log(maq.get())
  })

}

// Actualiza por id
exports.update = (req, res) => {
    Maquina.update({
      nombre: req.body.nombre
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
