module.exports = function (app) {
    const parte = require('../controllers/parte.controller');

    // Iniciar datos: add partes del sistema
    app.get('/api/partes/iniciar', parte.init);

    // Trae todos las partes
    app.get('/api/partes/', parte.findAll);

    // Trae todos los codigos
    app.get('/api/codigosdepartes/', parte.findAllCodes);

    // busca una parte por su id
    app.get('/api/parte/:id', parte.findById);

    // Borra una parte por su id
    app.delete('/api/parteborrar/:id', parte.destroy);

    // Inserta un parte nueva
    app.post('/api/partenueva/', parte.create);

    // Actualiza una parte por su id
    app.put('/api/parteupdate/:id', parte.update);

    // busca todas las partes activas de una maquina por su id
    app.get('/api/partespormaquina/:id', parte.findAllByMachine);

    // busca partes por su código
    app.get('/api/partesporcodigo/:query', parte.findByCodigo);
}