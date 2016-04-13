'use strict';

var logger = require('../middleware/logger'),
    tesseract = require('node-tesseract');

exports.readText = function(filePath, callback) {

    logger.info('running ocr');

    tesseract.process(filePath,function(err, text) {
        if(err) {
            logger.error(err);
            return callback(err);
        } else {
            logger.log(text);
            return callback(null, text);
        }
    });
};
