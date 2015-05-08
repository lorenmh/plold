var fs = require('fs'),
    vars = require('./vars');
var files;

files = {
  './api/server/datasources.json': JSON.stringify(
    {
      "db": {
        "name": "db",
        "connector": "memory"
      },
      "plutonium": {
        "host": "localhost",
        "database": vars.name,
        "password": vars.password,
        "name": "plutonium",
        "connector": "postgresql",
        "user": vars.owner
      }
    }
  , null, 2 )
}

Object.keys(files).forEach(function(path) {
  fs.writeFile(path, files[path], function(e) {
    if (e) { return console.log(e); }
    console.log('Generated ' + path);
  });
});
