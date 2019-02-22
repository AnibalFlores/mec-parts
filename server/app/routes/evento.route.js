module.exports = function(app) {
 
    const eventos = require('../controllers/evento.controller.js');
 
    // endpoints
    
    // Iniciar datos: add Eventos
    app.get('/api/eventos/iniciar', eventos.init);
 
    // Trae todos los eventos (no incluye el de prueba)
    app.get('/api/eventos', eventos.findAll);

    // Trae todos los eventos (incluye el de prueba)
    app.get('/api/todasloseventos', eventos.findAllStock);

    // busca una evento por su id
    app.get('/api/evento/:id', eventos.findById);

    // Borra un evento por su id
    app.delete('/api/eventoborrar/:id', eventos.destroy);

    // Inserta un evento nuevo
    app.post('/api/eventonuevo/', eventos.create);

    // Actualiza un evento por su id
    app.put('/api/eventoupdate/:id', eventos.update);
}