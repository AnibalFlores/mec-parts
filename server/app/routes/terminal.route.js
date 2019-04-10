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
    app.post('/api/terminalnuevo/', terminales.create);

    // Actualiza una terminal por su id
    app.put('/api/terminalupdate/:id', terminales.update);

    // Server Info
    app.get('/api/serverinfo/', terminales.serverinfo);

    // Terminal Status
    app.get('/api/terminalstatus/:id', terminales.terminalstatus);

    // Actualiza status de una terminal por su id
    app.put('/api/terminalstatusupdate/:id', terminales.updatestatus);
}