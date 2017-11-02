/********************************************
 * Server for develop  
 ********************************************/
var webpack = require('webpack');
var express = require('express');
var config = require('./webpack.dev.config.js');
var proxy = require('http-proxy-middleware');
var ProjCfg = require('./project.js');
const http = require('http');


var app = express();
 
var compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, {
	publicPath: config.output.publicPath,
	hot: true,
	historyApiFallback: true,
	inline: true,
	progress: true,
	stats: {
		colors: true,
    }
}));

app.use('/finance/stock/*', proxy({target:'http://web.juhe.cn:8080',changeOrigin:true}));

app.use(require('webpack-hot-middleware')(compiler));
// all other url redirect ro index.html
app.get('*', function(req, res) {
	res.sendFile(__dirname + '/src/index.html');
});

var PORT = ProjCfg.base.DevelopListenPort;
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
    console.log('========== Develop server running at localhost:' + PORT + ' ========== ');
}

server.listen(PORT);
server.on('error', onError);
server.on('listening', onListening);
