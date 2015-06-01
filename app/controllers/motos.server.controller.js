// Invocar modo JavaScript 'strict' 
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
	Moto = mongoose.model('Moto');

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

// Crear un nuevo método controller para crear nuevas motos
exports.create = function(req, res) {
	// Crear un nuevo objeto moto
	var moto = new Moto(req.body);

	// Configurar la propiedad 'creador' del moto
	moto.creador = req.user;

	// Intentar salvar el moto
	moto.save(function(err) {
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del moto 
			res.json(moto);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de motos
exports.list = function(req, res) {
	// Usar el método model 'find' para obtener una lista de motos
	Moto.find().sort('-creado').populate('creador', 'firstName lastName fullName').exec(function(err, motos) {
		if (err) {
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del moto 
			res.json(motos);
		}
	});
};

// Crear un nuevo método controller que devuelve una moto existente
exports.read = function(req, res) {
	res.json(req.moto);
};

// Crear un nuevo método controller que actualiza una moto existente
exports.update = function(req, res) {
	// Obtener el moto usando el objeto 'request'
	var moto = req.moto;

	// Actualizar los campos moto
	moto.tipo = req.body.tipo;
	moto.marca = req.body.marca;
	moto.cilindrada = req.body.cilindrada;
	moto.ano = req.body.ano;
	moto.ubicacion = req.body.ubicacion;
	moto.descripcion = req.body.descripcion;
	moto.imagen1 = req.body.imagen1;
	moto.imagen2 = req.body.imagen2;
	moto.imagen3 = req.body.imagen3;
	moto.imagen4 = req.body.imagen4;
	moto.imagen5 = req.body.imagen5;
	moto.estado = req.body.estado;
	moto.nombre = req.body.nombre;
	moto.apellido = req.body.apellido;
	moto.cedula = req.body.cedula;

	// Intentar salvar el moto actualizado
	moto.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del moto 
			res.json(moto);
		}
	});
};

// Crear un nuevo método controller que borre un moto existente
exports.delete = function(req, res) {
	// Obtener el moto usando el objeto 'request'
	var moto = req.moto;

	// Usar el método model 'remove' para borrar el moto
	moto.remove(function(err) {
		if (err) {
			// Si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del moto 
			res.json(moto);
		}
	});
};

// Crear un nuevo controller middleware que recupera un único moto existente
exports.motoByID = function(req, res, next, id) {
	// Usar el método model 'findById' para encontrar un único moto 
	Moto.findById(id).populate('creador', 'firstName lastName fullName').exec(function(err, moto) {
		if (err) return next(err);
		if (!moto) return next(new Error('Fallo al cargar la moto ' + id));

		// Si un moto es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.moto = moto;

		// Llamar al siguiente middleware
		next();
	});
};

// Crear un nuevo controller middleware que es usado para autorizar una operación auto 
exports.hasAuthorization = function(req, res, next) {
	// si el usuario actual no es el creador del artículo, enviar el mensaje de error apropiado
	if (req.moto.creador.id !== req.user.id) {
		return res.status(403).send({
			message: 'Usuario no está autorizado'
		});
	}

	// Llamar al siguiente middleware
	next();
};