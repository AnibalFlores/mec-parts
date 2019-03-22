const { Codigos1 } = require("../datos/codigos1");
const { Codigos2 } = require("../datos/codigos2");
const { Codigos3 } = require("../datos/codigos3");
const { Codigos4 } = require("../datos/codigos4");
const { Codigos5 } = require("../datos/codigos5");
const { Codigos6 } = require("../datos/codigos6");
const { Codigos7 } = require("../datos/codigos7");
const { Codigos8 } = require("../datos/codigos8");
const { Listados } = require("../datos/listados");

const db = require('../configs/db.config.js');
const Op = db.Sequelize.Op;
const Listado = db.listado
const Parte = db.parte;

// Iniciar datos: Partes
exports.init = (req, res) => {
  Listado.bulkCreate(Listados).then(() => {
    Parte.bulkCreate(Codigos1).then(() => {
      return Parte.findAll();
    }).then(partes => {
      console.log('Lista 1 creada')
    });

    Parte.bulkCreate(Codigos2).then(() => {
      return Parte.findAll();
    }).then(partes =>
      console.log('Lista 2 creada'));

    Parte.bulkCreate(Codigos3).then(() => {
      return Parte.findAll();
    }).then(partes =>
      console.log('Lista 3 creada'));

    Parte.bulkCreate(Codigos4).then(() => {
      return Parte.findAll();
    }).then(partes =>
      console.log('Lista 4 creada'));

    Parte.bulkCreate(Codigos5).then(() => {
      return Parte.findAll();
    }).then(partes =>
      console.log('Lista 5 creada'));

    Parte.bulkCreate(Codigos6).then(() => {
      return Parte.findAll();
    }).then(partes =>
      console.log('Lista 6 creada'));

    Parte.bulkCreate(Codigos7).then(() => {
      return Parte.findAll();
    }).then(partes =>
      console.log('Lista 7 creada'));

    Parte.bulkCreate(Codigos8).then(() => {
      return Parte.findAll();
    }).then(partes =>
      console.log('Lista 8 creada'));

  })

};

// Listar todos las partes ordenadas por id
exports.findAll = (req, res) => {
  Parte.findAll({
    attributes: ['id', 'codigo', 'activa'],
    include: [{
			model: Listado,
			attributes: ['id', 'nombre'],
			as: 'listado',
		}],
    order: [
      ['id', 'ASC']
    ]
  }).then(partes => {
    res.json(partes);
  });
};

// Listar todos las partes ordenadas por codigo
exports.findAllCodes = (req, res) => {
  Parte.findAll({
    limit: 25, // esto es para testing en produccion seria filtrado por terminal y app nativa 
    attributes: ['id', 'codigo', 'activa'],
    include: [{
			model: Listado,
			attributes: ['id', 'nombre'],
			as: 'listado',
		}],
    order: [
      ['codigo', 'ASC']
    ]
  }).then(partes => {
    res.json(partes);
  });
};

// Listar todos las partes ordenadas por update
exports.findAllStock = (req, res) => {
  Parte.findAll({
    attributes: ['id', 'codigo', 'activa']
  }).then(articulos => {
    res.json(articulos);
  });
};

exports.findById = (req, res) => {
  Parte.findByPk(req.params.id, {
    attributes: ['id', 'codigo', 'activa'],
    include: [{
			model: Listado,
			attributes: ['id', 'nombre'],
			as: 'listado',
		}]
  }).then(art => res.json(art))
};

exports.destroy = (req, res) => {
  Parte.destroy({
    where: {
      id: req.params.id
    }
  }).then(response => res.json(response))
}

exports.create = (req, res) => {
  Parte.create({
    codigo: req.body.codigo,
    listadoId: req.body.listado.id,
    activa: req.body.activa
  }).then(part => {
    // part.setListado(req.body.listadoId)
    res.send(part)
    console.log(part.get())
  })

}

exports.update = (req, res) => {
  Parte.update({
      codigo: req.body.codigo,
      listadoId: req.body.listado.id,
      activa: req.body.activa
    }, {
      where: {
        id: req.params.id
      }
    })
    .then((count) => {
      console.log('Partes actualizadas: ' + count);
      res.json(Parte.findByPk(req.params.id))
    })

}
