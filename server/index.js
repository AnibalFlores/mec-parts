var express = require('express');
 var app = express(); // express tradicional http
// const app = require("https-localhost") // modulo wrap de express que redirecciona a puerto 443 con certificados mkcert

// var bodyParser = require('body-parser'); // <-- body parser deprecado ahora incluido en express
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// middleware para corregir error CORS
app.use(function (req, res, next) {
  // modifico los headers para definir las siguientes cositas
  // Websites a los que permitir conexion (* cualquiera peligroso)
  res.setHeader('Access-Control-Allow-Origin', '*');
  // acciones que permitiremos
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // si estamos logueados
  res.setHeader("Access-Control-Allow-Credentials", "true");
  // Headers que quiero permitir
  res.setHeader('Access-Control-Allow-Headers', 'x-auth, Content-Type');
  // Se pone a true si por ejemplo queremos cookies en las requests a
  // la API seria así
  // res.setHeader('Access-Control-Allow-Credentials', true);
  // Por ultimo pasamos de este middleware a la siguiente capa con next() 
  next();
});

// Definimos la Base de Datos
const db = require('./app/configs/db.config');

// aca importo los controllers solo para llenar la base de datos
// apenas la promesa del sync se ejecute
const usuarios = require('./app/controllers/usuario.controller');
// const terminales = require('./app/controllers/terminal.controller');
// const listados = require('./app/controllers/listado.controller');
const partes = require('./app/controllers/parte.controller');
const operarios = require('./app/controllers/operario.controller');
const maquinas = require('./app/controllers/maquina.controller');
const labores = require('./app/controllers/labor.controller');
const eventos = require('./app/controllers/evento.controller');

// el "force: true" borra todas las tablas y las crea de nuevo en cada ejecucion
// aparte hay triggers en crudo los puse separados en @storedprocedures.js
db.sequelize.sync({
  force: true
}).then(() => {
  console.log('**** Dropado todo y Resync con { force: true } ****');
  
  // genero los triggers para actualizar cantidades automaticamente en la db
  // require('./app/models/@storedprocedures')(db, db.sequelize, db.Sequelize);

  // aca lleno las tablas de las entidades básicas el orden es importante
  // sin facturas y algunos articulos informáticos todos en cero unidades 
  usuarios.init();
  // listados.init();
  // terminales.init();
  operarios.init();
  maquinas.init();
  // labores.init();
  // eventos.init();
  partes.init();
  
  console.log('**** Datos iniciales generados con exito ****');
});

// cargamos todos los routes de la server app 
require('./app/routes/route.js')(app); // 

// Iniciamos el Server
db.env.listenOn
var server = app.listen(db.env.puerto, db.env.listenOn, function () {
  console.log("Server corriendo en http://%s:%s", server.address().address, server.address().port)
});