'use strict';

var helmet = require('helmet'),
    express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    routes = require('./routes'),
    config = require('./middleware/configuration'),
    notFound = require('./middleware/notFound'),
    logger = require("./middleware/logger"),
    cors = require('cors');

var app = express();
var port = config.get('port');

//MIDDLEWARE
app.set('port', port);
app.use(bodyParser.json({ limit: "10kb" }));
app.use(bodyParser.urlencoded({ limit: "10kb", extended: false }));
app.use(helmet.xssFilter());
app.use(helmet.hidePoweredBy());
app.use(helmet.ienoopen());
app.use(helmet.nosniff());
app.use(helmet.xframe());
app.use(cors());

//ROUTES
var path = config.get("path:routes");

app.get(path + 'healthcheck', routes.healthcheck.index);
app.get(path + 'ocr/readtext', routes.ocr.readText);

app.use(notFound.index);

//START
var server = http.createServer(app);
server.listen(app.get('port'), function(){
    if (config.get("iisnode")) {
        logger.info('Express server running on iisnode under: ' + path + '   configured for environment:  ' + config.get('environment'));
    } else {
        logger.info('Express server listening on port ' + app.get('port') + '   configured for environment:  ' + config.get('environment'));
    }
});


//LISTENERS
var closeServer = function (err) {
    logger.error('uncaughtException: ' + err);
    process.exit(0);
};

process.on('exit', closeServer);
process.on('SIGINT', closeServer);
process.on('SIGTERM', closeServer);
process.on('uncaughtException', closeServer);


module.exports = app;