'use strict';

var logger = require('../middleware/logger');

exports.readText = function(req, res) {

    logger.info('Request URL: ' + req.url);

    return res.status(200).json({message: 'all good'});
};
