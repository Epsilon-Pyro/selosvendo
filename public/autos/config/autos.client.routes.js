// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulo routes de 'autos'
angular.module('autos').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/autos', {
			templateUrl: 'autos/views/list-autos.client.view.html'
		}).
		when('/autos/create', {
			templateUrl: 'autos/views/create-auto.client.view.html'
		}).
		when('/autos/:autoId', {
			templateUrl: 'autos/views/view-auto.client.view.html'
		}).
		when('/autos/:autoId/edit', {
			templateUrl: 'autos/views/edit-auto.client.view.html'
		});
	}
]); 