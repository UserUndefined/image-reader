'use strict';

var logger = require('../middleware/logger'),
    ocrService = require('../services/ocrService');

exports.readText = function(req, res) {

    logger.info('Request URL: ' + req.url);

    ocrService.readText('C:\\temp\\test.png', function(err, results){
        if (err){
            return res.status(500).json({message: 'An error occuured running the OCR process', description: err})
        }
        return res.status(200).json(results.toString());
    })
};

exports.readRecipt = function(req, res) {

    logger.info('Request URL: ' + req.url);

    ocrService.readText('C:\\temp\\receipt.jpg', function(err, results){
        if (err){
            return res.status(500).json({message: 'An error occuured running the OCR process', description: err})
        }
        return res.status(200).json(results.toString());
    })
};
