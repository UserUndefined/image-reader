'use strict';

var winston = require('winston'),
    config = require('../middleware/configuration');

winston.level = config.get('logger:level');

function Logger(){
    return winston;
}

module.exports = new Logger();