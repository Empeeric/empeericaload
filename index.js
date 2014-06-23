"use strict";
process.chdir(__dirname);

var opinion = require('opinion');
var redis = require('socket.io-redis/node_modules/redis');
var redisAdapter = require('socket.io-redis');
var url = require('url');
var conf = require('./conf');
var app = opinion({
    middlewareOrder: opinion.DEFAULT_MIDDLEWARE_STACK,
    keys: ['78fd9fe83f2af46f2a8b567154db8d2a'],
    statics: 'assets',
    render: ['views', 'dust'],
    socketio: { clientPath: '/js/socket.io.js' }
});
app.on('webSockets-bound', function () {
    var redisOpts = url.parse(process.env.REDISCLOUD_URL);
    redisOpts.host = redisOpts.host.split(':')[0];
    var pubClient = redis.createClient(redisOpts.port, redisOpts.hostname, {no_ready_check: true});
    pubClient.auth(redisOpts.auth.split(":")[1]);
    var subClient = redis.createClient(redisOpts.port, redisOpts.hostname, {no_ready_check: true, detect_buffers: true});
    subClient.auth(redisOpts.auth.split(":")[1]);
    var adapter = redisAdapter({pubClient: pubClient, subClient: subClient});
    app.webSockets.adapter(adapter);
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
