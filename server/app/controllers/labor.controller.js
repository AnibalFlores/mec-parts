const db = require('../configs/db.config');
const Op = db.Sequelize.Op;
const Labor = db.labor;
const Evento = db.evento

// Iniciar datos: Maquina (1 - Testing)
exports.init = (req, res) => {
  Labor.create({
    nombre: 'Labor de Pruebas',
    operarioId: 1
  })
    .then(lab => {
      Evento.create({
        nombre: 'Prueba'
      })
        .then(eve =>
          lab.addEvento(eve))
    });

  Labor.create({
    nombre: 'Pintura',
    operarioId: 1
  })
    .then(lab => {
      Evento.create({
        nombre: 'PAP'
      })
        .then(eve =>
          lab.addEvento(eve))
    });

  /*
  Labor.create({
    nombre: 'Torneado'
  });

  Labor.create({
    nombre: 'Fresado'
  });

  Labor.create({
    nombre: 'Taladrado'
  });
  // return res.send('Maquinas Ok');
  
  */

}

// Listar todos las labores excluida la de pruebas
exports.findAll = (req, res) => {
  Labor.findAll({
    where: {
      id: {
        [Op.gt]: 0
      }
    },
    order: [
      ['inicio', 'DESC']
    ]
  }).then(labo => {
    res.json(labo);
  });
}

// Listar todos las labores excluida la de pruebas
exports.findAllrange = (req, res) => {
  Labor.findAll({
    where: {
      id: {
        [Op.gt]: 0
      },
      inicio: {
        [Op.gte]: req.params.ini
      },
      final: {
        [Op.lte]: req.params.fin
      }
    },
    order: [
      ['inicio', 'DESC']
    ]
  }).then(labo => {
    res.json(labo);
  });
}

// Listar todos las labores incluida la de pruebas
exports.findAllStock = (req, res) => {
  Labor.findAll({
    include: [{
      model: Evento,
      as: 'eventos',
    }],
    order: [
      ['nombre', 'ASC']
    ]
  }).then(labo => {
    res.json(labo);
  });
};

// Buscar por id
exports.findById = (req, res) => {
  Labor.findByPk(req.params.id,{
    include: [{
      model: Evento,
      as: 'eventos',
    }],
    order: [
      ['nombre', 'ASC']
    ]
  }).then(labo => {
    res.json(labo);
  }).then(lab => res.json(lab))
};

// Borrar por id
exports.destroy = (req, res) => {
  if (req.params.id > 1) {
    Labor.destroy({
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

// Labor nueva
exports.create = (req, res) => {
  Labor.create({
    nombre: req.body.nombre
  }).then(lab => {
    res.send(lab);
    console.log(lab.get());
  })

}

// Actualiza por id
exports.update = (req, res) => {
  Labor.update({
    terminalid: req.body.terminalid,
    maqid: req.body.maqid,
    nombre: req.body.nombre,
    operador: req.body.operador,
    nroorden: req.body.nroorden,
    parteid: req.body.parteid,
    parte: req.body.parte,
    inicio: req.body.inicio,
    final: req.body.final,
    aptas: req.body.aptas,
    rechazos: req.body.rechazos,
    terminadas: req.body.terminadas,
    observacion: req.body.observacion

  }, {
      where: {
        id: req.params.id
      }
    })
    .then((count) => {
      console.log('Labores Actualizadas: ' + count);
      res.json(Labor.findByPk(req.params.id))
    })
}

// Inicia labor nueva desde terminal recibe nombre y operario
// (Luego se cambia el estado del terminal con un update)
exports.nuevaporterminal = (req, res) => {
  Labor.create({
    nombre: req.body.nombre,
    operador: req.body.operario,
    operarioId: req.body.operarioId
  }).then((lab) => {
    lab.get();
    res.json(lab);
    console.log(lab.get());
  })
}