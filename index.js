"use strict";
process.chdir(__dirname);

var opinion = require('opinion');
var socketio = require('socket.io');
var conf = require('./conf');


var app = opinion({
    middlewareOrder: opinion.DEFAULT_MIDDLEWARE_STACK,
    keys: ['78fd9fe83f2af46f2a8b567154db8d2a'],
    statics: 'assets',
    render: ['views', 'dust']
});

app.use(
    function* () {
        this.body = yield this.render('hello-world');
    }
);


module.exports = app.listen(conf.PORT, function () {
    app.socketio = socketio.listen(this);
    console.log("Server listening on %s", this._connectionKey);
});
