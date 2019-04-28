'use strict'
module.exports = (sequelize, Sequelize) => {
  const Labor = sequelize.define('labor', {
    terminalid: {// a los fines de facilitar reportes se incluyen ids
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    maqid: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    nombre: {// aca iria el nombre de la operacion no hay asociacion ya que la labor es un log
      type: Sequelize.STRING
    },
    operador:{
      type: Sequelize.STRING
    },
    nroorden: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    parteid: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    parte:{
      type: Sequelize.STRING
    },
    inicio: {// tambien este dato estaria en el timestamp pero este seria el usado por el sistema
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    final: {
      type: Sequelize.DATE
    },
    aptas: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    rechazos: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    terminadas: {
      type: Sequelize.BOOLEAN,// el "a terminar" es la negacion de esto
      defaultValue: false
    },
    observacion: {
      type: Sequelize.TEXT // en los terminales el maximo se fijo en 144
    },
    iniciopap:{// tomamos de la entidad eventos y agregamos estos 4 datos aquí
      type: Sequelize.DATE
    },
    duracionpap:{// si la duracion de pap es menor a 5 min se registra en cero
      type: Sequelize.TIME
    },
    iniciomec: {
      type: Sequelize.DATE     
    },
    duracionmec:{
      type: Sequelize.TIME
    },
    inicioope: {
      type: Sequelize.DATE     
    },
    duracionope:{
      type: Sequelize.TIME
    }   
  }, {
    tableName: 'labores',
    timestamps: false,
  });

  return Labor;
}
