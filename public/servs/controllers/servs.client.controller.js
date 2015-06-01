// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'serv'
angular.module('servs').controller('ServsController', ['$scope', '$routeParams', '$location', 'Authentication', 'Servs',
    function($scope, $routeParams, $location, Authentication, Servs) {
        // Exponer el service Authentication
        $scope.authentication = Authentication;

 // Crear un nuevo método controller para crear nuevos motos
        $scope.create = function() {
            // Usar los campos form para crear un nuevo objeto $resource serv
            var serv = new Servs({
                tipo: this.tipo,
                especializacion: this.especializacion,
				ubicacion: this.ubicacion,
				precio: this.precio,
				descripcion: this.descripcion,
				imagen1: this.imagen1,
				imagen2: this.imagen2,
				imagen3: this.imagen3,
				imagen4: this.imagen4,
				imagen5: this.imagen5,
				estado: this.estado,
				nombre: this.nombre,
				apellido: this.apellido,
				cedula: this.cedula
				
            });

            // Usar el método '$save' de serv para enviar una petición POST apropiada
            serv.$save(function(response) {
                // Si un moto fue creado de modo correcto, redireccionar al usuario a la página del servs 
                $location.path('servs/' + response._id);
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

// Crear un nuevo método controller para recuperar una lista de servs
        $scope.find = function() {
            // Usar el método 'query' de article para enviar una petición GET apropiada
            $scope.servs = Servs.query();
        };

        // Crear un nuevo método controller para recuperar un unico serv
        $scope.findOne = function() {
            // Usar el método 'get' de serv para enviar una petición GET apropiada
            $scope.serv = Servs.get({
                servId: $routeParams.servId
            });
        };

 // Crear un nuevo método controller para actualizar un único serv
        $scope.update = function() {
            // Usar el método '$update' de serv para enviar una petición PUT apropiada
            $scope.serv.$update(function() {
                // Si un serv fue actualizado de modo correcto, redirigir el user a la página del serv 
                $location.path('servs/' + $scope.serv._id);
            }, function(errorResponse) {
                // En otro caso, presenta al user un mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

// Crear un nuevo método controller para borrar un único serv
        $scope.delete = function(serv) {
            // Si un serv fue enviado al método, borrarlo
            if (serv) {
                // Usar el método '$remove' del serv para borrar el serv
                serv.$remove(function() {
                    // Eliminar el serv de la lista de servs
                    for (var i in $scope.servs) {
                        if ($scope.servs[i] === serv) {
                            $scope.servs.splice(i, 1);
                        }
                    }
                });
            } else {
                // En otro caso, usar el método '$remove' de serv para borrar el serv
                $scope.serv.$remove(function() {
                    $location.path('servs');
                });
            }
        };

    }
]);