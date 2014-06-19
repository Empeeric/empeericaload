"use strict";
var spotsControllers = angular.module('spotsControllers', ['spotsServices']);

spotsControllers.controller('spotsCtrl', ['$scope', 'spotsFactory', function($scope, spotsFactory) {
    spotsFactory.get().then(function(data){
        $scope.spots = data.data.spots;
    });
}]);


