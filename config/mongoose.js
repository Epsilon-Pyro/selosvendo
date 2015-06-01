// Invocar el modo 'strict' de JavaScript
'use strict';

// Carga las dependencias del módulo
var	mongoose = require('mongoose');

// Definir el método de configuración de Mongoose
module.exports = function() {
	// Usar Mongoose para conectar a MongoDB
	var db = 'mongodb://localhost/mean';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
  db = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
  process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
  process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
  process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
  process.env.OPENSHIFT_APP_NAME;
};

	// Cargar el modelo 'User' 
	require('../app/models/user.server.model');

    // Cargar el modelo 'Article'
	require('../app/models/article.server.model');
	
	  // Cargar el modelo 'Auto'
	require('../app/models/auto.server.model');
	
	 // Cargar el modelo 'Moto'
	require('../app/models/moto.server.model');
	
		 // Cargar el modelo 'Servicios'
	require('../app/models/serv.server.model');

	// Devolver la instancia de conexión a Mongoose
	return db;
};