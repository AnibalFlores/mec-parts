module.exports = function (app) {

    const usuario = require('../controllers/usuario.controller');

    // Iniciar datos: add users del sistema
    app.get('/api/usuarios/iniciar', usuario.init);

    // Trae todos los user (incluye los roles)
    app.get('/api/usuarios/', usuario.findAll);

    // Loguea tonto validando usuario y clave y devuelve rol 
    // A = admin, V = auditor
    app.post('/api/login/', usuario.login);

    // Modifica la clave de acceso 
    app.put('/api/cambio/:id', usuario.cambioclave);


}