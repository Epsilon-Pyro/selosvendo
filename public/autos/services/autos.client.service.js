// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'autos'
angular.module('autos').factory('Autos', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' auto
    return $resource('api/autos/:autoId', {
        autoId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);