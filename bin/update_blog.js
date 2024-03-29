/* jshint node: true */
var fs = require('fs');
var client    = require('mongodb').MongoClient;
var path      = require('path');

var app, uri, connect
;

uri = 'mongodb://localhost:27017/plutonium';

connect = (function() {
  var promise = new Promise(function(res, rej) {
    client.connect(uri, function(e, db) {
      if (e) { return rej(e); }
      res(db);
    });
  });

  return function() {
    return promise;
  };

})();

fs.readFile('../files/blog.json', 'utf8', function (e, blog) {
  if (e) { return console.log(e); }
  connect().then(function(db) {
    blog = JSON.parse(blog);
    db.collection('blogs').update({ slug: blog.slug }, blog );
  }).catch(function(e) {
    console.log(e);
  });
});
