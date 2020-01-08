/**
 * Implement these functions following the node style callback pattern
 */

var fs = require('fs');
var request = require('request');

// This function should retrieve the first line of the file at `filePath`
var pluckFirstLineFromFile = function (filePath, callback) {
  // TODO
  var rs = fs.createReadStream(filePath, {encoding: 'utf8'});
  var line = '';
  var pos = 0;
  var index;
  rs
    .on('data', (chunk) => {
      index = chunk.indexOf('\n');
      line += chunk;
      index !== -1 ? rs.close() : pos += chunk.length;
    })
    .on('close', () => {
      callback(null, line.slice(0, pos + index));
    })
    .on('error', (err) => {
      callback(err);
    });
};

// This function should retrieve the status code of a GET request to `url`
var getStatusCode = function (url, callback) {
  // TODO
  request({url: url, method: 'get'}, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res.statusCode);
    }
  });
};

// Export these functions so we can test them and reuse them in later exercises
module.exports = {
  getStatusCode: getStatusCode,
  pluckFirstLineFromFile: pluckFirstLineFromFile
};
