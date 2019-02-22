module.exports = function (app) {
    const recientes = require('../controllers/reciente.controller');

    // Iniciar datos: add rubros del sistema
    app.get('/api/recientes/iniciar', recientes.init);

    // Trae todos los rubros
    app.get('/api/recientes/', recientes.findAll);

    // busca un rubro por su id
    app.get('/api/reciente/:id', recientes.findById);

    // Borra un rubro por su id
    app.delete('/api/recienteborrar/:id', recientes.destroy);

    // Inserta un articulo nuevo
    app.post('/api/recientenuevo/', recientes.create);

    // Actualiza un articulo por su id
    app.put('/api/recienteupdate/:id', recientes.update);
}