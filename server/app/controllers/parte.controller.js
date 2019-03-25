const {
  Codigos1
} = require("../datos/codigos1");
const {
  Codigos2
} = require("../datos/codigos2");
const {
  Codigos3
} = require("../datos/codigos3");
const {
  Codigos4
} = require("../datos/codigos4");
const {
  Codigos5
} = require("../datos/codigos5");
const {
  Codigos6
} = require("../datos/codigos6");
const {
  Codigos7
} = require("../datos/codigos7");
const {
  Codigos8
} = require("../datos/codigos8");
const {
  Vinculos
} = require("../datos/vinculos");
const {
  Listados
} = require("../datos/listados");

const db = require('../configs/db.config.js');
const Op = db.Sequelize.Op;
const Listado = db.listado
const Parte = db.parte;
const Maquina = db.maquina;
const MaquinaListado = db.maquinalistado;

// Iniciar datos: 
// Primero generamos los nombres de los listados
// y luego cada uno de los listados de codigos de Partes
// finalmente asociamos las maquinas u operaciones a los listados

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

    // aca vinculamos las maquinas 
    // con los listados pero a partir de
    // insertar los pares maquina id y listado id 
    MaquinaListado.bulkCreate(Vinculos).then(() => {
      return MaquinaListado.findAll();
    }).then(maqlis =>
      console.log('Vinculos maquina-listados creados.'));

  })

};

// Listar todos las partes ordenadas por id
exports.findAll = (req, res) => {
  Parte.findAndCountAll({
    attributes: ['id', 'codigo', 'activa'],
    include: [{
      model: Listado,
      attributes: ['id', 'nombre'],
      as: 'listado',
    }],
    order: [
      ['id', 'ASC']
    ]
  }).then(r => {
    res.json({
      cantidad: r.count,
      partes: r.rows
    });
  });
};

// TODO lo esta llamdo la tablet hay que cambiar a findAllByMachine
// Listar todos las partes ordenadas por codigo para una maquina
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

// Buscador por codigo de parte
exports.findByCodigo = (req, res) => {
  let lookupValue = req.params.query.toLowerCase();
  Parte.findAndCountAll({
    // limit: 10,
    attributes: ['id', 'codigo', 'activa'],
    include: [{
      model: Listado,
      attributes: ['id', 'nombre'],
      as: 'listado',
    }],
    order: [
      ['id', 'ASC']
    ],
    where: {
      codigo: db.sequelize.where(db.sequelize.fn('LOWER', db.sequelize.col('codigo')), 'LIKE', '%' + lookupValue + '%')
    }
  }).then(function (r) {
    return res.json({
      cantidad: r.count,
      partes: r.rows
    });
  }).catch(function (error) {
    console.log(error);
  })
}

// Listar todos las partes ordenadas por update
exports.findAllStock = (req, res) => {
  Parte.findAll({
    attributes: ['id', 'codigo', 'activa']
  }).then(articulos => {
    res.json(articulos);
  });
};

// Listar todas las partes activas correspondientes
// a una maquina por el id de la maquina
exports.findAllByMachine = (req, res) => {
  Parte.findAll({
    attributes: ['id', 'codigo', 'activa'],
    where: {
      activa: true
    },
    include: [{
      model: Listado,
      as: 'listado',
      attributes: [],
      where: {
        activo: true
      },
      include: [{
        model: Maquina,
        as: 'maquinas',
        attributes: [],
        where: {
          id: {
            [Op.eq]: req.params.id
          }
        },
        through: {
          attributes: []
        }
      }],
      required: true
    }]
  }).then(partes => {
    res.json(partes);
  });
};

// Localizar por id
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

// Borrar por id
exports.destroy = (req, res) => {
  Parte.destroy({
    where: {
      id: req.params.id
    }
  }).then(response => res.json(response))
}

// Nueva parte
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

// Actualizar
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
