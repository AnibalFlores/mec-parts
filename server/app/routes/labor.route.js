module.exports = function(app) {
 
    const labores = require('../controllers/labor.controller.js');
 
    // endpoints
    
    // Iniciar datos: add Labores
    app.get('/api/labores/iniciar', labores.init);
 
    // Trae todas las labores (no incluye la de prueba)
    app.get('/api/labores', labores.findAll);

    // Trae todas las labores (incluye la de prueba)
    app.get('/api/todaslaslabores', labores.findAllStock);

    // busca una labor por su id
    app.get('/api/labor/:id', labores.findById);

    // Borra una labor por su id
    app.delete('/api/laborborrar/:id', labores.destroy);

    // Inserta una labor nueva
    app.post('/api/labornueva/', labores.create);

    // Actualiza una labor por su id
    app.put('/api/laborupdate/:id', labores.update);

    // Inicializa labor desdes terminal cuando operario confirma su maquina y nombre
    app.post('/api/terminalnuevalabor/', labores.nuevaporterminal);
}