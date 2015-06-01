// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var users = require('../../app/controllers/users.server.controller'),
	motos = require('../../app/controllers/motos.server.controller');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'motos'  
	app.route('/api/motos')
	   .get(motos.list)
	   .post(users.requiresLogin, motos.create);
	
	// Configurar las rutas 'motos' parametrizadas
	app.route('/api/motos/:motoId')
	   .get(motos.read)
	   .put(users.requiresLogin, motos.hasAuthorization, motos.update)
	   .delete(users.requiresLogin, motos.hasAuthorization, motos.delete);

	// Configurar el parámetro middleware 'motoId'   
	app.param('motoId', motos.motoByID);
};