"use strict";
/*global _,expect */
var conf = require('../conf');
conf.PORT = _.random(1050, 35000);


describe('basic test', function () {
    it("should just work", function (done) {
        done();
    });


    it("should just load", function (done) {
        var server = require('..');
        expect(server).to.have.property('_connectionKey').contain(conf.PORT);
        server.close();
        done();
    });
});
