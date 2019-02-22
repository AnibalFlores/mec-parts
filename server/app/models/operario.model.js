'use strict'
module.exports = (sequelize, Sequelize) => {
	const Operario = sequelize.define('operario', {
	  nombre: {
		  type: Sequelize.STRING
		},
		apellido: {
		  type: Sequelize.STRING
		},
		pin: {
			type: Sequelize.STRING,
			defaultValue: '1234',
			validate: {
				isNumeric: true
			}
		},
		activo: {
			type: Sequelize.BOOLEAN,
			defaultValue: true
		}
	});
	
	return Operario;
}