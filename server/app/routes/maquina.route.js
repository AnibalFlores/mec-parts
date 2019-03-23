module.exports = function(app) {
 
    const maquinas = require('../controllers/maquina.controller.js');
 
    // endpoints
    
    // Iniciar datos: add Maquinas
    app.get('/api/maquinas/iniciar', maquinas.init);
 
    // Trae todos las maquinas (no incluye la de prueba)
    app.get('/api/maquinas', maquinas.findAll);

    // Trae todos las maquinas (incluye la de prueba)
    app.get('/api/todaslasmaquinas', maquinas.findAllStock);

    // busca una maquina por su id
    app.get('/api/maquina/:id', maquinas.findById);

    // Borra una maquina por su id
    app.delete('/api/maquinaborrar/:id', maquinas.destroy);

    // Inserta una maquina nueva
    app.post('/api/maquinanueva/', maquinas.create);

    // Actualiza una maquina por su id
    app.put('/api/maquinaupdate/:id', maquinas.update);

    // Actualiza listados de una maquina
    app.post('/api/vincularmaquinalistados/', maquinas.vinculaLista);
}