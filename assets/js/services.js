var spotsServices = angular.module('spotsServices', []);

spotsServices.service('spotsFactory', ['$http',
    function ($http) {
        this.get = function () {
            return $http.get('/spotsArray');
        };
    }
]);
