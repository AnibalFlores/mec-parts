const db = require('../configs/db.config');
const Terminal = db.terminal;

// Iniciar datos: Terminales (1 - Testing)
exports.init = (req, res) => {
	Terminal.create({
		nombre: 'Terminal de Pruebas',
		estado: 'Apagado'		
	});

	Terminal.create({
		nombre: 'Terminal de Pintura',
		estado: 'Apagado'		
	});

	Terminal.create({
		nombre: 'Terminal de Torneado',
		estado: 'Apagado'		
	});

// return res.send('Terminales Ok');
}

// Listar todos los terminales
exports.findAll = (req, res) => {
	Terminal.findAll({
		attributes: ['id', 'nombre', 'estado'],
	}).then(terminales => {
		res.json(terminales);
	});
}

// Listar todos los terminales ordenadas por update
exports.findAllStock = (req, res) => {
	Terminal.findAll({
	  attributes: ['id', 'nombre', 'estado']
	}).then(terminales => {
	  res.json(terminales);
	});
  };

// Buscar por id
exports.findById = (req, res) => {
	Terminal.findByPk(req.params.id, {
		attributes: ['id', 'nombre', 'estado']
	}).then(rub => res.json(rub))
};

// Borrar por id
exports.destroy = (req, res) => {
	if (req.params.id > 1) {
		Terminal.destroy({
			where: {
				id: req.params.id
			}
		}).then(response => {
			// puse esta query porque on delete set default no esta en el ORM
			db.sequelize.query('UPDATE articulos SET "rubroId" = 1 WHERE "rubroId" IS NULL');
			res.json(response)})
	} else {
		res.sendStatus(405);// metodo no permitido (de borrar el 1)
	}
}

// Terminal nuevo
exports.create = (req, res) => {
	Terminal.create({
		nombre: req.body.nombre,
		estado: req.body.estado
	}).then(ter => {
		res.send(ter)
		console.log(ter.get())
	})

}

// Actualiza por id
exports.update = (req, res) => {
	Terminal.update({
		nombre: req.body.nombre,
		estado: req.body.estado
		}, {
			where: {
				id: req.params.id
			}
		})
		.then((count) => {
			console.log('Terminales actualizados: ' + count);
			res.json(Terminal.findByPk(req.params.id))
		})
}