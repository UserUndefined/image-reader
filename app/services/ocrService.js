'use strict';

var logger = require('../middleware/logger'),
    tesseract = require('node-tesseract');

exports.readText = function(filePath, callback) {

    logger.info('running ocr');

    /**
    Page segmentation modes:
    0    Orientation and script detection (OSD) only.
    1    Automatic page segmentation with OSD.
    2    Automatic page segmentation, but no OSD, or OCR.
    3    Fully automatic page segmentation, but no OSD. (Default)
    4    Assume a single column of text of variable sizes.
    5    Assume a single uniform block of vertically aligned text.
    6    Assume a single uniform block of text.
    7    Treat the image as a single text line.
    8    Treat the image as a single word.
    9    Treat the image as a single word in a circle.
    10    Treat the image as a single character.
*/
        var options = {
        l: 'eng', //language
        psm: 3   //page segmentation mode
    };

    tesseract.process(filePath, options, function(err, text) {
        if(err) {
            logger.error(err);
            return callback(err);
        } else {
            logger.log(text);
            return callback(null, text);
        }
    });
};
