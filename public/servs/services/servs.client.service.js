// Invocar modo JavaScript 'strict'
'use strict';

// Crear el service 'servs'
angular.module('servs').factory('Servs', ['$resource', function($resource) {
	// Usar el service '$resource' para devolver un objeto '$resource' serv
    return $resource('api/servs/:servId', {
        servId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);