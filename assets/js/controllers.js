"use strict";
/*global angular,io,_*/
var spotsControllers = angular.module('spotsControllers', ['spotsServices']);

spotsControllers.controller('spotsCtrl', ['$scope', 'spotsFactory', function($scope, spotsFactory) {
    $scope.socket = io();
    $scope.spots = {};

    spotsFactory.get().then(function(data){
        $scope.spots = data.data.spots;
    });

    $scope.socket.on('spot update', function (spot) {
        if(spot) {
            var idx = _.findIndex($scope.spots, {title: spot.title});
            $scope.$apply(function(scope) {
                scope.spots[idx] = spot;
            });
        }
    });

}]);


