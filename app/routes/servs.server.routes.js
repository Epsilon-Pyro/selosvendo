// Invocar modo JavaScript 'strict'
'use strict';

// Cargar las dependencias del módulo
var users = require('../../app/controllers/users.server.controller'),
	servs = require('../../app/controllers/servs.server.controller');

// Definir el método routes de module
module.exports = function(app) {
	// Configurar la rutas base a 'servs'  
	app.route('/api/servs')
	   .get(servs.list)
	   .post(users.requiresLogin, servs.create);
	
	// Configurar las rutas 'servs' parametrizadas
	app.route('/api/servs/:servId')
	   .get(servs.read)
	   .put(users.requiresLogin, servs.hasAuthorization, servs.update)
	   .delete(users.requiresLogin, servs.hasAuthorization, servs.delete);

	// Configurar el parámetro middleware 'motoId'   
	app.param('servId', servs.servByID);
};