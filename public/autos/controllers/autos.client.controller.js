// Invocar modo JavaScript 'strict'
'use strict';

// Crear el controller 'autos'
angular.module('autos').controller('AutosController', ['$scope', '$routeParams', '$location', 'Authentication', 'Autos',
    function($scope, $routeParams, $location, Authentication, Autos) {
        // Exponer el service Authentication
        $scope.authentication = Authentication;

 // Crear un nuevo método controller para crear nuevos autos
        $scope.create = function() {
            // Usar los campos form para crear un nuevo objeto $resource auto
            var auto = new Autos({
                tipo: this.tipo,
                marca: this.marca,
				modelo: this.modelo,
				ano: this.ano,
				transmision: this.transmision,
				ubicacion: this.ubicacion,
				precio: this.precio,
				aireacnd: this.aireacnd,
				vidriosyseguros: this.vidriosyseguros,
				alarma: this.alarma,
				sonido: this.sonido,
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

            // Usar el método '$save' de auto para enviar una petición POST apropiada
            auto.$save(function(response) {
                // Si un auto fue creado de modo correcto, redireccionar al usuario a la página del auto 
                $location.path('autos/' + response._id);
            }, function(errorResponse) {
                // En otro caso, presentar al usuario el mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

// Crear un nuevo método controller para recuperar una lista de artículos
        $scope.find = function() {
            // Usar el método 'query' de article para enviar una petición GET apropiada
            $scope.autos = Autos.query();
        };

        // Crear un nuevo método controller para recuperar un unico artículo
        $scope.findOne = function() {
            // Usar el método 'get' de article para enviar una petición GET apropiada
            $scope.auto = Autos.get({
                autoId: $routeParams.autoId
            });
        };

 // Crear un nuevo método controller para actualizar un único article
        $scope.update = function() {
            // Usar el método '$update' de auto para enviar una petición PUT apropiada
            $scope.auto.$update(function() {
                // Si un auto fue actualizado de modo correcto, redirigir el user a la página del article 
                $location.path('autos/' + $scope.auto._id);
            }, function(errorResponse) {
                // En otro caso, presenta al user un mensaje de error
                $scope.error = errorResponse.data.message;
            });
        };

// Crear un nuevo método controller para borrar un único auto
        $scope.delete = function(auto) {
            // Si un auto fue enviado al método, borrarlo
            if (auto) {
                // Usar el método '$remove' del auto para borrar el auto
                auto.$remove(function() {
                    // Eliminar el auto de la lista de autos
                    for (var i in $scope.autos) {
                        if ($scope.autos[i] === auto) {
                            $scope.autos.splice(i, 1);
                        }
                    }
                });
            } else {
                // En otro caso, usar el método '$remove' de auto para borrar el auto
                $scope.auto.$remove(function() {
                    $location.path('autos');
                });
            }
        };

    }
]);