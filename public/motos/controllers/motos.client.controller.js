// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'motos'
angular.module('motos').controller('MotosController', ['$scope', '$routeParams', '$location', 'Authentication', 'Motos',
    function($scope, $routeParams, $location, Authentication, Motos) {
        // Exponer el service Authentication
        $scope.authentication = Authentication;

 // Crear un nuevo método controller para crear nuevos motos
        $scope.create = function() {
            // Usar los campos form para crear un nuevo objeto $resource moto
            var moto = new Motos({
                tipo: this.tipo,
                marca: this.marca,
				cilindrada: this.cilindrada,
				ano: this.ano,
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

            // Usar el método '$save' de moto para enviar una petición POST apropiada
            moto.$save(function(response) {
                // Si un moto fue creado de modo correcto, redireccionar al usuario a la página del motos 
                $location.path('motos/' + response._id);
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

// Crear un nuevo método controller para recuperar una lista de motos
        $scope.find = function() {
            // Usar el método 'query' de article para enviar una petición GET apropiada
            $scope.motos = Motos.query();
        };

        // Crear un nuevo método controller para recuperar un unico moto
        $scope.findOne = function() {
            // Usar el método 'get' de article para enviar una petición GET apropiada
            $scope.moto = Motos.get({
                motoId: $routeParams.motoId
            });
        };

 // Crear un nuevo método controller para actualizar un único moto
        $scope.update = function() {
            // Usar el método '$update' de moto para enviar una petición PUT apropiada
            $scope.moto.$update(function() {
                // Si un moto fue actualizado de modo correcto, redirigir el user a la página del article 
                $location.path('motos/' + $scope.moto._id);
            }, function(errorResponse) {
                // En otro caso, presenta al user un mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

// Crear un nuevo método controller para borrar un único moto
        $scope.delete = function(moto) {
            // Si un moto fue enviado al método, borrarlo
            if (moto) {
                // Usar el método '$remove' del moto para borrar el moto
                moto.$remove(function() {
                    // Eliminar el moto de la lista de motos
                    for (var i in $scope.motos) {
                        if ($scope.motos[i] === moto) {
                            $scope.motos.splice(i, 1);
                        }
                    }
                });
            } else {
                // En otro caso, usar el método '$remove' de moto para borrar el moto
                $scope.moto.$remove(function() {
                    $location.path('motos');
                });
            }
        };

    }
]);