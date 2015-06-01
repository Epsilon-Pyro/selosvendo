// Invocar modo JavaScript 'strict' 
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
	Serv = mongoose.model('Serv');

// Crear un nuevo método controller para el manejo de errores
var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Error de servidor desconocido';
	}
};

// Crear un nuevo método controller para crear nuevos autos
exports.create = function(req, res) {
	// Crear un nuevo objeto serv
	var serv = new Serv(req.body);

	// Configurar la propiedad 'creador' del serv
	serv.creador = req.user;

	// Intentar salvar el serv
	serv.save(function(err) {
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del serv 
			res.json(serv);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de servs
exports.list = function(req, res) {
	// Usar el método model 'find' para obtener una lista de servs
	Serv.find().sort('-creado').populate('creador', 'firstName lastName fullName').exec(function(err, servs) {
		if (err) {
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del serv 
			res.json(servs);
		}
	});
};

// Crear un nuevo método controller que devuelve un serv existente
exports.read = function(req, res) {
	res.json(req.serv);
};

// Crear un nuevo método controller que actualiza un serv existente
exports.update = function(req, res) {
	// Obtener el serv usando el objeto 'request'
	var serv = req.serv;

	// Actualizar los campos serv
	serv.tipo = req.body.tipo;
	serv.especializacion = req.body.especializacion;
	serv.ubicacion = req.body.ubicacion;
	serv.precio = req.body.precio;
	serv.descripcion = req.body.descripcion;
	serv.imagen1 = req.body.imagen1;
	serv.imagen2 = req.body.imagen2;
	serv.imagen3 = req.body.imagen3;
	serv.imagen4 = req.body.imagen4;
	serv.imagen5 = req.body.imagen5;
	serv.estado = req.body.estado;
	serv.nombre = req.body.nombre;
	serv.apellido = req.body.apellido;
	serv.cedula = req.body.cedula;

	// Intentar salvar el serv actualizado
	serv.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del serv 
			res.json(serv);
		}
	});
};

// Crear un nuevo método controller que borre un serv existente
exports.delete = function(req, res) {
	// Obtener el artículo usando el objeto 'request'
	var serv = req.serv;

	// Usar el método model 'remove' para borrar el serv
	serv.remove(function(err) {
		if (err) {
			// Si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del serv 
			res.json(serv);
		}
	});
};

// Crear un nuevo controller middleware que recupera un único serv existente
exports.servByID = function(req, res, next, id) {
	// Usar el método model 'findById' para encontrar un único serv 
	Serv.findById(id).populate('creador', 'firstName lastName fullName').exec(function(err, serv) {
		if (err) return next(err);
		if (!serv) return next(new Error('Fallo al cargar el serv ' + id));

		// Si un serv es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.serv = serv;

		// Llamar al siguiente middleware
		next();
	});
};

// Crear un nuevo controller middleware que es usado para autorizar una operación article 
exports.hasAuthorization = function(req, res, next) {
	// si el usuario actual no es el creador del artículo, enviar el mensaje de error apropiado
	if (req.serv.creador.id !== req.user.id) {
		return res.status(403).send({
			message: 'Usuario no está autorizado'
		});
	}

	// Llamar al siguiente middleware
	next();
};