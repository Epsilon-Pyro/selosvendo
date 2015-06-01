// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulo routes de 'motos'
angular.module('motos').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/motos', {
			templateUrl: 'motos/views/list-motos.client.view.html'
		}).
		when('/motos/create', {
			templateUrl: 'motos/views/create-moto.client.view.html'
		}).
		when('/motos/:motoId', {
			templateUrl: 'motos/views/view-moto.client.view.html'
		}).
		when('/motos/:motoId/edit', {
			templateUrl: 'motos/views/edit-moto.client.view.html'
		});
	}
]); 