"use strict";

describe('basic test', function () {
    it("should just work", function (done) {
        done();
    });


    it("should just load", function (done) {
        var server = require('..');
        server.close();
        done();
    });
});
