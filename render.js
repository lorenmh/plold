/* jshint node: true */

var http = require('http');
var child_process = require('child_process');
var spawn = child_process.spawn;

var APP_URI = 'http://127.0.0.1:3300';
var PORT = 3000;

var renderer = http.createServer(function(req, res) {
  var process, data;

  process = spawn('phantomjs', [
    'page.js',
    APP_URI + req.url
  ]);

  process.stdout.on('data', function(d) {
    data = d;
  });

  process.stdout.on('close', function() {
    res.end(data);
  });

});

renderer.listen(PORT, 'localhost');
