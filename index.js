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

var noise_maker = require('./noise_maker');
var noise = noise_maker(app);

app.get('/', function* () {
    yield this.render('hello-world');
});
app.get('/spots', function* () {
    yield this.render('spots');
});

app.get('/spotsArray', function* () {
    this.body = {spots: noise.getSpots()};
});

module.exports = app.listen(conf.PORT, function () {
    console.log("Server listening on %s", this._connectionKey);
});
