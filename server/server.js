var loopback = require('loopback');
var boot = require('loopback-boot');
var bodyParser = require('body-parser');
var utils = require('./boot/lib/util');
var app = module.exports = loopback();
var cookieParser = require('cookie-parser');
var sessionStore = require('sessionstore');
var express = require('express');
var Session = require('express-session'),
    SessionStore = require('session-file-store')(Session);
var session = Session({secret: 'pass', resave: true, saveUninitialized: true});
var ios = require('socket.io-express-session');

app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname);

app.start = function () {
    // start the web server
    return app.listen(function () {
        app.emit('started');
        console.log('Web server listening at: %s', app.get('url'));
    });
};
// start the server if `$ node server/server.js`
if (require.main === module) {
    //app.start();

    app.io = require('socket.io').listen(app.start());

    app.io.use(ios(session)); // session support

    app.io.sockets.on('connection', function (socket) {
        console.log('a user connected');

        utils.setSocket(socket);

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });
    });
}
