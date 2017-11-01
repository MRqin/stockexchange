/********************************************
 * Server for production test
 ********************************************/
var express = require('express');
var path = require('path');
var compression = require('compression');
var ProjCfg = require('./project.js');
const http = require('http');

var app = express();
app.use(compression());

// serve our static stuff like index.css
app.use(express.static(path.join(__dirname, ProjCfg.base.DistPath)));

// send all requests to index.html so browserHistory in React Router works
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, ProjCfg.base.DistPath, 'index.html'));
});

var PORT = process.env.PORT || ProjCfg.base.ProductionListenPort;

const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof PORT === 'string' ?
        'Pipe ' + PORT :
        'PORT ' + PORT;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error('==========' + bind + ' is already in use ==========');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    console.log('========== Production server running at localhost:' + PORT + ' ========== ');
}

server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);
