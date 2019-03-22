module.exports = function (app) {
    const operario = require('../controllers/operario.controller');

    // Iniciar datos: add operarios del sistema
    app.get('/api/operarios/iniciar', operario.init);

    // Trae todos los operarios
    app.get('/api/operarios/', operario.findAll);

    // busca un operario por su id
    app.get('/api/operario/:id', operario.findById);

    // Borra un operario por su id
    app.delete('/api/operarioborrar/:id', operario.destroy);

    // Inserta un operario nuevo
    app.post('/api/operarionuevo/', operario.create);

    // Actualiza un operario por su id
    app.put('/api/operarioupdate/:id', operario.update);

     // Valida pin de un operario por su id
     // app.post('/api/operariologin/', operario.login);
}