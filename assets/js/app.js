"use strict";
var spotsApp = angular.module('spotsApp', [
    'spotsControllers'
]);

spotsApp.config(['$interpolateProvider', function($interpolateProvider) {
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
}]);