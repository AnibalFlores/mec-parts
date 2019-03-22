'use strict'
module.exports = (sequelize, Sequelize) => {
	const Operario = sequelize.define('operario', {
	  nombre: {
		  type: Sequelize.STRING
		},
		apellido: {
		  type: Sequelize.STRING
		},
		activo: {
			type: Sequelize.BOOLEAN,
			defaultValue: true
		}
	});
	
	return Operario;
}