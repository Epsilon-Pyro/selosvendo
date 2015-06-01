// Invocar modo JavaScript 'strict' 
'use strict';

// Cargar las dependencias del módulo
var mongoose = require('mongoose'),
	Auto = mongoose.model('Auto');

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
	// Crear un nuevo objeto auto
	var auto = new Auto(req.body);

	// Configurar la propiedad 'creador' del auto
	auto.creador = req.user;

	// Intentar salvar el auto
	auto.save(function(err) {
		if (err) {
			// Si ocurre algún error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del auto 
			res.json(auto);
		}
	});
};

// Crear un nuevo método controller que recupera una lista de autos
exports.list = function(req, res) {
	// Usar el método model 'find' para obtener una lista de autos
	Auto.find().sort('-creado').populate('creador', 'firstName lastName fullName').exec(function(err, autos) {
		if (err) {
			// Si un error ocurre enviar un mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del auto 
			res.json(autos);
		}
	});
};

// Crear un nuevo método controller que devuelve un auto existente
exports.read = function(req, res) {
	res.json(req.auto);
};

// Crear un nuevo método controller que actualiza un auto existente
exports.update = function(req, res) {
	// Obtener el auto usando el objeto 'request'
	var auto = req.auto;

	// Actualizar los campos auto
	auto.tipo = req.body.tipo;
	auto.marca = req.body.marca;
	auto.modelo = req.body.modelo;
	auto.ano = req.body.ano;
	auto.transmision = req.body.transmision;
	auto.ubicacion = req.body.ubicacion;
	auto.precio = req.body.precio;
	auto.aireacnd = req.body.aireacnd;
	auto.vidriosyseguros = req.body.vidriosyseguros;
	auto.alarma = req.body.alarma;
	auto.sonido = req.body.sonido;
	auto.descripcion = req.body.descripcion;
	auto.imagen1 = req.body.imagen1;
	auto.imagen2 = req.body.imagen2;
	auto.imagen3 = req.body.imagen3;
	auto.imagen4 = req.body.imagen4;
	auto.imagen5 = req.body.imagen5;
	auto.estado = req.body.estado;
	auto.nombre = req.body.nombre;
	auto.apellido = req.body.apellido;
	auto.cedula = req.body.cedula;

	// Intentar salvar el auto actualizado
	auto.save(function(err) {
		if (err) {
			// si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del auto 
			res.json(auto);
		}
	});
};

// Crear un nuevo método controller que borre un auto existente
exports.delete = function(req, res) {
	// Obtener el artículo usando el objeto 'request'
	var auto = req.auto;

	// Usar el método model 'remove' para borrar el auto
	auto.remove(function(err) {
		if (err) {
			// Si ocurre un error enviar el mensaje de error
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Enviar una representación JSON del auto 
			res.json(auto);
		}
	});
};

// Crear un nuevo controller middleware que recupera un único auto existente
exports.autoByID = function(req, res, next, id) {
	// Usar el método model 'findById' para encontrar un único auto 
	Auto.findById(id).populate('creador', 'firstName lastName fullName').exec(function(err, auto) {
		if (err) return next(err);
		if (!auto) return next(new Error('Fallo al cargar el auto ' + id));

		// Si un auto es encontrado usar el objeto 'request' para pasarlo al siguietne middleware
		req.auto = auto;

		// Llamar al siguiente middleware
		next();
	});
};

// Crear un nuevo controller middleware que es usado para autorizar una operación article 
exports.hasAuthorization = function(req, res, next) {
	// si el usuario actual no es el creador del artículo, enviar el mensaje de error apropiado
	if (req.auto.creador.id !== req.user.id) {
		return res.status(403).send({
			message: 'Usuario no está autorizado'
		});
	}

	// Llamar al siguiente middleware
	next();
};