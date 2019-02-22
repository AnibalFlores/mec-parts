module.exports = function(app) {
 
    const terminales = require('../controllers/terminal.controller.js');
 
    // endpoints
    
    // Iniciar datos: add Terminales
    app.get('/api/terminales/iniciar', terminales.init);
 
    // Trae todos las terminales (no incluye la de prueba)
    app.get('/api/terminales', terminales.findAll);

    // Trae todos las terminales (incluye la de prueba)
    app.get('/api/todaslasterminales', terminales.findAllStock);

    // busca una terminal por su id
    app.get('/api/terminal/:id', terminales.findById);

    // Borra una terminal por su id
    app.delete('/api/terminalborrar/:id', terminales.destroy);

    // Inserta una terminal nueva
    app.post('/api/terminalnueva/', terminales.create);

    // Actualiza una terminal por su id
    app.put('/api/terminalupdate/:id', terminales.update);
}