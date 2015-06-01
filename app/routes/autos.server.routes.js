// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var users = require('../../app/controllers/users.server.controller'),
	autos = require('../../app/controllers/autos.server.controller');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'autos'  
	app.route('/api/autos')
	   .get(autos.list)
	   .post(users.requiresLogin, autos.create);
	
	// Configurar las rutas 'autos' parametrizadas
	app.route('/api/autos/:autoId')
	   .get(autos.read)
	   .put(users.requiresLogin, autos.hasAuthorization, autos.update)
	   .delete(users.requiresLogin, autos.hasAuthorization, autos.delete);

	// Configurar el parámetro middleware 'autoId'   
	app.param('autoId', autos.autoByID);
};