// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'motos'
angular.module('motos').factory('Motos', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' motos
    return $resource('api/motos/:motoId', {
        motoId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);