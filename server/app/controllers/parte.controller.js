const db = require('../configs/db.config.js');
const Op = db.Sequelize.Op;
const Parte = db.parte;
const Codigos = [{
    codigo: '0101-1'
  },
  {
    codigo: '0102-1'
  }, {
    codigo: '0102-2'
  }, {
    codigo: '10001-1'
  }, {
    codigo: '10101-1'
  }, {
    codigo: '10102-1'
  }, {
    codigo: '10201-1'
  }, {
    codigo: '10202-1'
  }, {
    codigo: '10301-1'
  }, {
    codigo: '10402-1'
  }, {
    codigo: '10401-1'
  }, {
    codigo: '10401-2'
  }, {
    codigo: '10501-1'
  }, {
    codigo: '10501-2'
  }, {
    codigo: '10601-1'
  }, {
    codigo: '10602-1'
  }, {
    codigo: '10701-1'
  }, {
    codigo: '10701-2'
  }, {
    codigo: '10801-1'
  }, {
    codigo: '10901-1'
  }, {
    codigo: '10901-2'
  }, {
    codigo: '1102-1'
  }, {
    codigo: '1105-1'
  }, {
    codigo: '1102-2'
  }, {
    codigo: '1101-1'
  }, {
    codigo: '1101-2'
  }, {
    codigo: '1104-1'
  }, {
    codigo: '1103-2'
  }, {
    codigo: '1103-1'
  }, {
    codigo: '11001-1'
  }, {
    codigo: '11102-1'
  }, {
    codigo: '11101-1'
  }, {
    codigo: '11201-1'
  }, {
    codigo: '11302-1'
  }, {
    codigo: '11301-1'
  }, {
    codigo: '11401-1'
  }, {
    codigo: '11501-1'
  }, {
    codigo: '11502-1'
  }, {
    codigo: '11601-1'
  }, {
    codigo: '11701-1'
  }, {
    codigo: '11701-2'
  }, {
    codigo: '11801-1'
  }, {
    codigo: '11802-1'
  }, {
    codigo: '11801-2'
  }, {
    codigo: '11803-1'
  }, {
    codigo: '11901-1'
  }, {
    codigo: '1201-1'
  }, {
    codigo: '1202-1'
  }, {
    codigo: '12001-1'
  }, {
    codigo: '12101-3'
  }, {
    codigo: '12101-1'
  }, {
    codigo: '12101-2'
  }, {
    codigo: '12201-1'
  }, {
    codigo: '12301-1'
  }, {
    codigo: '12302-1'
  }, {
    codigo: '12303-1'
  }, {
    codigo: '12401-1'
  }, {
    codigo: '12402-1'
  }, {
    codigo: '12403-1'
  }, {
    codigo: '12501-1'
  }, {
    codigo: '12601-1'
  }, {
    codigo: '12701-1'
  }, {
    codigo: '12801-1'
  }, {
    codigo: '12801-2'
  }, {
    codigo: '1302-1'
  }, {
    codigo: '1301-1'
  }, {
    codigo: '1301-2'
  }, {
    codigo: '13001-1'
  }, {
    codigo: '13101-1'
  }, {
    codigo: '13201-1'
  }, {
    codigo: '13301-1'
  }, {
    codigo: '13401-1'
  }, {
    codigo: '13501-1'
  }, {
    codigo: '13601-1'
  }, {
    codigo: '13602-1'
  }, {
    codigo: '13701-1'
  }, {
    codigo: '13801-1'
  }, {
    codigo: '13901-1'
  }, {
    codigo: '1401-1'
  }, {
    codigo: '1402-1'
  }, {
    codigo: '14001-1'
  }, {
    codigo: '14101-1'
  }, {
    codigo: '14101-2'
  }, {
    codigo: '14201-1'
  }, {
    codigo: '14301-1'
  }, {
    codigo: '14401-1'
  }, {
    codigo: '14501-1'
  }, {
    codigo: '14601-1'
  }, {
    codigo: '14701-1'
  }, {
    codigo: '14801-1'
  }, {
    codigo: '1501-1'
  }, {
    codigo: '1501-2'
  }, {
    codigo: '1601-1'
  }, {
    codigo: '1601-2'
  }, {
    codigo: '1701-1'
  }, {
    codigo: '1801-2'
  }, {
    codigo: '1801-1'
  }, {
    codigo: '1901-1'
  }, {
    codigo: '0201-1'
  }, {
    codigo: '0201-2'
  }, {
    codigo: '2001-1'
  }, {
    codigo: '2101-1'
  }, {
    codigo: '2102-1'
  }, {
    codigo: '2201-1'
  }, {
    codigo: '2202-1'
  }, {
    codigo: '2301-1'
  }, {
    codigo: '2301-2'
  }, {
    codigo: '2401-1'
  }, {
    codigo: '2402-1'
  }, {
    codigo: '2402-2'
  }, {
    codigo: '2501-1'
  }, {
    codigo: '2502-1'
  }, {
    codigo: '2601-1'
  }, {
    codigo: '2601-2'
  }, {
    codigo: '2702-1'
  }, {
    codigo: '2701-1'
  }, {
    codigo: '2703-1'
  }, {
    codigo: '2801-1'
  }, {
    codigo: '2802-1'
  }, {
    codigo: '2901-1'
  }, {
    codigo: '0301-1'
  }, {
    codigo: '0301-2'
  }, {
    codigo: '0301-3'
  }, {
    codigo: '3003-1'
  }, {
    codigo: '3005-1'
  }, {
    codigo: '3004-2'
  }, {
    codigo: '3004-1'
  }, {
    codigo: '3003-2'
  }, {
    codigo: '3003-3'
  }, {
    codigo: '3006-1'
  }, {
    codigo: '3101-1'
  }, {
    codigo: '3202-2'
  }, {
    codigo: '3203-1'
  }, {
    codigo: '3204-1'
  }, {
    codigo: '3201-1'
  }, {
    codigo: '3202-1'
  }, {
    codigo: '3301-1'
  }, {
    codigo: '3302-1'
  }, {
    codigo: '3303-1'
  }, {
    codigo: '3401-1'
  }, {
    codigo: '3501-1'
  }, {
    codigo: '3601-1'
  }, {
    codigo: '3602-1'
  }, {
    codigo: '3701-1'
  }, {
    codigo: '3801-1'
  }, {
    codigo: '3901-1'
  }, {
    codigo: '0402-1'
  }, {
    codigo: '0401-2'
  }, {
    codigo: '0401-1'
  }, {
    codigo: '4001-1'
  }, {
    codigo: '4101-1'
  }, {
    codigo: '4201-1'
  }, {
    codigo: '4302-1'
  }, {
    codigo: '4303-1'
  }, {
    codigo: '4301-1'
  }, {
    codigo: '4304-1'
  }, {
    codigo: '4401-1'
  }, {
    codigo: '4402-1'
  }, {
    codigo: '4403-1'
  }, {
    codigo: '4501-1'
  }, {
    codigo: '4601-1'
  }, {
    codigo: '4601-2'
  }, {
    codigo: '4602-1'
  }, {
    codigo: '4701-1'
  }, {
    codigo: '4801-1'
  }, {
    codigo: '4901-1'
  }, {
    codigo: '0502-1'
  }, {
    codigo: '0504-1'
  }, {
    codigo: '0503-1'
  }, {
    codigo: '0501-1'
  }, {
    codigo: '5001-1'
  }, {
    codigo: '5101-1'
  }, {
    codigo: '5201-2'
  }, {
    codigo: '5201-1'
  }, {
    codigo: '5301-1'
  }, {
    codigo: '5301-2'
  }, {
    codigo: '5401-1'
  }, {
    codigo: '5501-1'
  }, {
    codigo: '5601-1'
  }, {
    codigo: '5601-2'
  }, {
    codigo: '5701-1'
  }, {
    codigo: '5801-1'
  }, {
    codigo: '5802-1'
  }, {
    codigo: '5901-1'
  }, {
    codigo: '0606-1'
  }, {
    codigo: '0602-2'
  }, {
    codigo: '0605-1'
  }, {
    codigo: '0607-1'
  }, {
    codigo: '0603-2'
  }, {
    codigo: '0601-1'
  }, {
    codigo: '0602-1'
  }, {
    codigo: '0603-1'
  }, {
    codigo: '0604-1'
  }, {
    codigo: '0604-2'
  }, {
    codigo: '6001-1'
  }, {
    codigo: '6101-1'
  }, {
    codigo: '6201-1'
  }, {
    codigo: '6301-1'
  }, {
    codigo: '6401-1'
  }, {
    codigo: '6501-1'
  }, {
    codigo: '6502-1'
  }, {
    codigo: '6601-2'
  }, {
    codigo: '6601-1'
  }, {
    codigo: '6701-1'
  }, {
    codigo: '6801-1'
  }, {
    codigo: '6902-1'
  }, {
    codigo: '6901-1'
  }, {
    codigo: '0701-1'
  }, {
    codigo: '7001-1'
  }, {
    codigo: '7101-1'
  }, {
    codigo: '7102-1'
  }, {
    codigo: '7201-1'
  }, {
    codigo: '7301-1'
  }, {
    codigo: '7401-1'
  }, {
    codigo: '7501-1'
  }, {
    codigo: '7601-1'
  }, {
    codigo: '7602-1'
  }, {
    codigo: '7702-1'
  }, {
    codigo: '7801-1'
  }, {
    codigo: '7901-1'
  }, {
    codigo: '7901-2'
  }, {
    codigo: '0802-1'
  }, {
    codigo: '0801-1'
  }, {
    codigo: '0801-2'
  }, {
    codigo: '0803-1'
  }, {
    codigo: '0801-3'
  }, {
    codigo: '0801-4'
  }, {
    codigo: '8001-1'
  }, {
    codigo: '8002-1'
  }, {
    codigo: '8101-1'
  }, {
    codigo: '8102-1'
  }, {
    codigo: '8201-1'
  }, {
    codigo: '8301-1'
  }, {
    codigo: '8401-1'
  }, {
    codigo: '8402-1'
  }, {
    codigo: '8501-1'
  }, {
    codigo: '8601-1'
  }, {
    codigo: '8701-1'
  }, {
    codigo: '8801-1'
  }, {
    codigo: '8901-1'
  }, {
    codigo: '8902-1'
  }, {
    codigo: '0901-1'
  }, {
    codigo: '0901-5'
  }, {
    codigo: '0901-6'
  }, {
    codigo: '0901-2'
  }, {
    codigo: '0901-8'
  }, {
    codigo: '0901-4'
  }, {
    codigo: '0901-7'
  }, {
    codigo: '0901-9'
  }, {
    codigo: '0901-3'
  }, {
    codigo: '9001-1'
  }, {
    codigo: '9101-1'
  }, {
    codigo: '9203-1'
  }, {
    codigo: '9202-1'
  }, {
    codigo: '9201-1'
  }, {
    codigo: '9301-1'
  }, {
    codigo: '9301-2'
  }, {
    codigo: '9401-1'
  }, {
    codigo: '9501-1'
  }, {
    codigo: '9501-2'
  }, {
    codigo: '9502-1'
  }, {
    codigo: '9601-1'
  }, {
    codigo: '9602-1'
  }, {
    codigo: '9701-1'
  }, {
    codigo: '9801-1'
  }, {
    codigo: '9802-1'
  }, {
    codigo: '9901-1'
  }
];

// Iniciar datos: Partes
exports.init = (req, res) => {

  Parte.bulkCreate(Codigos).then(() => {
    return Parte.findAll();
  }).then(partes => {
    console.log('partes creadas')
  })

  // return res.send('Partes Ok');

};

// Listar todos las partes ordenadas por id
exports.findAll = (req, res) => {
  Parte.findAll({
    attributes: ['id', 'codigo', 'nombre', 'descripcion', 'activa'],
    order: [['id','ASC']]
  }).then(partes => {
    res.json(partes);
  });
};

// Listar todos las partes ordenadas por codigo
exports.findAllCodes = (req, res) => {
  Parte.findAll({
    attributes: ['id', 'codigo'],
    order: [['codigo','ASC']]
  }).then(partes => {
    res.json(partes);
  });
};

// Listar todos las partes ordenadas por update
exports.findAllStock = (req, res) => {
  Parte.findAll({
    attributes: ['id', 'codigo', 'nombre', 'descripcion', 'activa']
  }).then(articulos => {
    res.json(articulos);
  });
};

exports.findById = (req, res) => {
  Parte.findByPk(req.params.id, {
    attributes: ['id', 'codigo', 'nombre', 'descripcion', 'activa']
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
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    activa: req.body.activa
  }).then(part => {
    //part.setRubro(req.body.rubro.id)
    res.send(part)
    console.log(part.get())
  })

}

exports.update = (req, res) => {
  Parte.update({
      codigo: req.body.codigo,
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
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
