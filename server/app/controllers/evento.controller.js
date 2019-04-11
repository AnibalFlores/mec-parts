const db = require('../configs/db.config');
const Op = db.Sequelize.Op;
const Evento = db.evento;
const Labor = db.labor;

// Iniciar datos: Eventos (1 - Testing)
exports.init = (req, res) => {
  /*
  Labor.findByPk(1)
    .then(lab => {
      Evento.create({
          nombre: 'Prueba'
        })
        .then(eve =>
          lab.addevento(eve))
    });
  /*
    Labor.findById(2).then(lab =>{
      lab.eventos.create({
       nombre: 'PAP'
     })});

     Labor.findById(2).then(lab =>{
      lab.eventos.create({
       nombre: 'MEC'
     })})

     Labor.findById(2).then(lab =>{
      lab.eventos.create({
       nombre: 'PAP'
     })});

     Labor.findById(2).then(lab =>{
      lab.eventos.create({
       nombre: 'MEC'
     })})

     Labor.findById(2).then(lab =>{
      lab.eventos.create({
       nombre: 'FIN'
     })})

    // return res.send('Maquinas Ok');
  */
}

// Listar todos los eventos excluido el de pruebas
exports.findAll = (req, res) => {
  Evento.findAll({
    attributes: ['id', 'nombre'],
    where: {
      id: {
        [Op.gt]: 1
      }
    },
    order: [
      ['nombre', 'ASC']
    ]
  }).then(eve => {
    res.json(eve);
  });
}

// Listar todos los eventos 
exports.findAllStock = (req, res) => {
  Evento.findAll({
    attributes: ['id', 'nombre'],
    order: [
      ['nombre', 'ASC']
    ]
  }).then(eve => {
    res.json(eve);
  });
};

// Buscar por id
exports.findById = (req, res) => {
  Evento.findByPk(req.params.id, {
    attributes: ['id', 'nombre']
  }).then(eve => res.json(eve))
};

// Borrar por id
exports.destroy = (req, res) => {
  if (req.params.id > 1) {
    Evento.destroy({
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

// Evento nuevo
exports.create = (req, res) => {
  Evento.create({
    nombre: req.body.nombre,
    laborId: req.body.laborid
  }).then(eve => {
    res.send(eve)
    console.log(eve.get())
  })

}

// Actualiza por id
exports.update = (req, res) => {
  Evento.update({
      nombre: req.body.nombre
    }, {
      where: {
        id: req.params.id
      }
    })
    .then((count) => {
      console.log('Eventos Actualizados: ' + count);
      res.json(Evento.findByPk(req.params.id))
    })
}
