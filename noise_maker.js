"use strict";
var _ = require('lodash');

module.exports = function (app) {
    var spots = [];
    var loop = function(i){
        var rand = Math.round(Math.random() * 6000) + 1000;
        setTimeout(function () {
            spots[i].value = (Number(spots[i].value) + (Math.random() * Math.pow(-1, Math.floor(Math.random() * 2 + 1)))).toFixed(2);
            loop(i);
        }, rand);
    };
    for(var i = 0; i < 300; i++){
        spots.push({title: 'spot' + i, value : (Math.random() * 1000).toFixed(2)});
        loop(i);
    }
    return {
        getSpots: function(){
            return spots;
        }
    }
};
