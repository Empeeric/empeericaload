"use strict";
var _ = require('lodash');

module.exports = function (app) {
    var spots = [];
    var loop = function(i){
        var rand = Math.round(Math.random() * 6000) + 1000;
        setTimeout(function () {
            var new_val = (Number(spots[i].value) + (Math.random() * Math.pow(-1, Math.floor(Math.random() * 2 + 1)))).toFixed(2);
            spots[i].direction = new_val > spots[i].value ? 'positive' : 'negative';
            spots[i].value = (Number(spots[i].value) + (Math.random() * Math.pow(-1, Math.floor(Math.random() * 2 + 1)))).toFixed(2);
            app.webSockets.emit('spot update', spots[i]);
            loop(i);
        }, rand);
    };
    for(var i = 0; i < 300; i++){
        spots.push({title: 'spot' + i, value : (Math.random() * 1000).toFixed(2), direction: 'neutral'});
        loop(i);
    }
    return {
        getSpots: function(){
            return spots;
        }
    }
};
