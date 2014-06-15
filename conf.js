"use strict";
var _ = require('lodash-contrib');

function createConfiguration(appName) {
    var conf = _.defaults(process.env, {
        APP_NAME: appName,
        PORT: process.env.PORT || 80,
        MONGODB_URI: 'mongodb://localhost/' + appName,
        IMPORTER_SECRET: '2fzhUceNPjTcFKjE',
        PASSPORT_COOKIE_NAME: 'auth-' + appName,
        COOKIE_SECRET: 'Uk5ZWthLqzUk5ZWthLqzUk5ZWthLqz',
        SENDGRID_AUTH: {
            user: process.env.SENDGRID_USERNAME || 'app20278627@heroku.com',
            pass: process.env.SENDGRID_PASSWORD || 's65jcndz'
        },
        SOCKET_TRANSPORTS: "websocket htmlfile xhr-polling jsonp-polling".split(" "),
        FAKE_SOCKET: {
            emit: function () {},
            on: function () {},
            isFake: true
        },
        userSockets: {}
    });
    conf.MONGODB_URI = conf.MONGOLAB_URI || conf.MONGOHQ_URL || conf.MONGODB_URI;
    conf.createConfiguration = createConfiguration;

    return (module.exports = global.conf = conf);
}


createConfiguration(process.env.APP_NAME || 'boilerplate');
