module.exports = function (app) {

    const listados = require('../controllers/listado.controller.js');
  
    // endpoints
  
    // Iniciar datos: add Listados (ejecutar antes de agregar partes)
    app.get('/api/listados/iniciar', listados.init);
  
    // Trae todos los listados
    app.get('/api/listados', listados.findAll);
  
    // Trae todos los listados
    app.get('/api/todosloslistados', listados.findAllStock);
  
    // busca un listado por su id
    app.get('/api/listado/:id', listados.findById);
  
    // Borra un listado por su id
    app.delete('/api/listadoborrar/:id', listados.destroy);
  
    // Inserta un listado nuevo
    app.post('/api/listadonuevo/', listados.create);
  
    // Actualiza un listado por su id
    app.put('/api/listadoupdate/:id', listados.update);
  }