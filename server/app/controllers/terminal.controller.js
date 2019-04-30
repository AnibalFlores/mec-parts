const db = require('../configs/db.config');
const Terminal = db.terminal;
const Maquina = db.maquina;

// Iniciar datos: Terminales (1 - Es para las maquinas sin Terminal)
exports.init = (req, res) => {
	Terminal.create({
		nombre: 'Sin Terminal',
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

// Listar todos los terminales por orden alfabetico
exports.findAll = (req, res) => {
	Terminal.findAll({
		attributes: [
			'id',
			'nombre',
			'estado',
			'iniciolabor',
			'inicioevento',
			'operarioname',
			'maquinaname',
			'partecodigo',
			'nroordenactual',
			'laboractual'],
			order: [				
			['nombre', 'ASC']]
	}).then(terminales => {
		res.json(terminales);
	});
}

// Listar todos los terminales ordenadas por update
exports.findAllStock = (req, res) => {
	Terminal.findAll({
	  attributes: ['id', 'nombre', 'estado'],
	  include: [{
		model: Maquina,
		attributes: ['id', 'nombre'],
		as: 'maquinas',
	}],

	}).then(terminales => {
	  res.json(terminales);
	});
  };

// Buscar por id
exports.findById = (req, res) => {
	Terminal.findByPk(req.params.id, {
		attributes: ['id', 'nombre', 'estado']
	}).then(term => res.json(term))
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
			db.sequelize.query('UPDATE maquinas SET "terminalId" = 1 WHERE "terminalId" IS NULL');
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

// Actualiza status por id
exports.updatestatus = (req, res) => {
	Terminal.update({
		estado: req.body.estado,
		iniciolabor: req.body.iniciolabor,
		inicioevento: req.body.inicioevento,
		laboractual: req.body.laboractual, 
		operarioactual: req.body.operarioactual,
		operarioname: req.body.operarioname,
		maquinaactual: req.body.maquinaactual,
		maquinaname: req.body.maquinaname,
		parteactual: req.body.parteactual,
		partecodigo: req.body.partecodigo,
		nroordenactual: req.body.nroordenactual,
		esmaquina: req.body.esmaquina,
		espap: req.body.espap, 
		esaterminar: req.body.esaterminar 
		}, {
			where: {
				id: req.params.id
			}
		})
		.then((count) => {
			console.log('Status Terminal actualizado');
			res.json(Terminal.findByPk(req.params.id))
		})
}

// Server info
exports.serverinfo = (req, res) => {
	res.send('Mec-Parts Server Versión 1.0');
	
}

// Busca terminal por id y envia el status
// el status corresponde a las globales del terminal
exports.terminalstatus = (req,res) =>{
	Terminal.findByPk(req.params.id).then(term => res.json(term))
}