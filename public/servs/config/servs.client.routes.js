// Invocar modo JavaScript 'strict'
'use strict';

// Configurar el módulo routes de 'servs'
angular.module('servs').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/servs', {
			templateUrl: 'servs/views/list-servs.client.view.html'
		}).
		when('/servs/create', {
			templateUrl: 'servs/views/create-serv.client.view.html'
		}).
		when('/servs/:servId', {
			templateUrl: 'servs/views/view-serv.client.view.html'
		}).
		when('/servs/:servId/edit', {
			templateUrl: 'servs/views/edit-serv.client.view.html'
		});
	}
]); 