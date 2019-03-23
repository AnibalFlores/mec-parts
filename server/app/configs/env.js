// mis variables de ambiente 
const env = {
  // para el express
  // listenOn: 'localhost', // este no funca
  listenOn: '0.0.0.0', // Gracias Tongas!!! cualquier ip de origen 
  puerto: 3000,
  // para el postgres
  database: 'Mecparts',
  usuario: 'postgres',
  clave: 'postgres',// default
  // clave: 'anibal71', // esta o la default postgres
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  // http://docs.sequelizejs.com/manual/installation/usage.html
  // pool de conexiones
  max: 5,
  min: 0,
  idle: 30000,
  acquire: 60000,
  
};

module.exports = env;