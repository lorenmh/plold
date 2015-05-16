/* jshint node: true */
/* global phantom */

var page = require('webpage').create(),
    system = require('system'),
    fs = require('fs')
;

var path
;

path = system.args[1];

page.open(path, function() {
  phantom.exit( console.log(page.content) );
});
