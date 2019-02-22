const db = require('../configs/db.config');
const Reciente = db.reciente;

// Iniciar datos: Operadores Recientes (1 - Testing)
exports.init = (req, res) => {
	Reciente.create({
		terminal: 1,
        operador: 1,
        fecha: '2019-02-19 07:01:34.553-03'		
	});

    Reciente.create({
		terminal: 2,
        operador: 2,
        fecha: '2019-02-19 08:01:34.553-03'		
	});

    Reciente.create({
		terminal: 1,
        operador: 1,
        fecha: '2019-02-21 18:01:34.553-03'		
	});

// return res.send('Recientes Ok');
}

// Listar todos los recientes
exports.findAll = (req, res) => {
	Reciente.findAll({
		attributes: ['id', 'terminal', 'operador', 'fecha'],
	}).then(terminales => {
		res.json(terminales);
	});
}

// Listar todos los terminales ordenadas por update
exports.findAllStock = (req, res) => {
	Reciente.findAll({
	  attributes: ['id', 'terminal', 'operador', 'fecha']
	}).then(terminales => {
	  res.json(terminales);
	});
  };

// Buscar por id
exports.findById = (req, res) => {
	Reciente.findByPk(req.params.id, {
		attributes: ['id', 'terminal', 'operador', 'fecha']
	}).then(res => res.json(res))
};

// Borrar por id
exports.destroy = (req, res) => {
	if (req.params.id > 0) {
		Reciente.destroy({
			where: {
				id: req.params.id
			}
		}).then(response => {
			res.json(response)})
	} else {
		res.sendStatus(405);// metodo no permitido (de borrar el 0)
	}
}

// Terminal nuevo
exports.create = (req, res) => {
	Reciente.create({
		nombre: req.body.terminal,
		estado: req.body.operador
	}).then(rec => {
		res.send(rec)
		console.log(rec.get())
	})

}

// Actualiza por id
exports.update = (req, res) => {
	Reciente.update({
		nombre: req.body.terminal,
		estado: req.body.operador
		}, {
			where: {
				id: req.params.id
			}
		})
		.then((count) => {
			console.log('Recientes actualizados: ' + count);
			res.json(Reciente.findByPk(req.params.id))
		})
}