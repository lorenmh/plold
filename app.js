/* jshint node: true */

var express   = require('express');
var client    = require('mongodb').MongoClient;
var path      = require('path');

var app, uri, connect
;

app = express();

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

function findAllBlogTeaser() {
  return new Promise(function(res, rej) {
    connect().then(function(db) {
      db.collection('blogs').find( {}, { _id: 0, text: 0 } )
        .toArray(function(e, d) {
          if (e) { return rej(e); }
          res(d);
        });
    }).catch(function(e) {
      rej(e);
    });
  });
}

function findBlog(slug) {
  return new Promise(function(res, rej) {
    connect().then(function(db) {
      db.collection('blogs').findOne({slug: slug}, {_id: 0}, function(e,d) {
        if (e) { return rej(e); }
        res(d);
      });
    }).catch(function(e) {
      rej(e);
    });
  });
}


function findAllProjectTeaser() {
  return new Promise(function(res, rej) {
    connect().then(function(db) {
      db.collection('projects').find( {}, { _id: 0, text: 0 } )
        .toArray(function(e, d) {
          if (e) { return rej(e); }
          res(d);
        });
    }).catch(function(e) {
      rej(e);
    });
  });
}

function findProject(slug) {
  return new Promise(function(res, rej) {
    connect().then(function(db) {
      db.collection('projects').findOne({slug: slug}, {_id: 0}, function(e,d) {
        if (e) { return rej(e); }
        res(d);
      });
    }).catch(function(e) {
      rej(e);
    });
  });
}

app.use('/public/', express.static('public'));

app.get('/api/project_teaser/', function(req, res) {
  findAllProjectTeaser().then(function(projects) {
    res.send(projects);
  });
});

app.get('/api/projects/:slug', function(req, res) {
  findProject(req.params.slug).then(function(project) {
    if (!project) { res.status(404); }
    res.send(project);
  });
});

app.get('/api/blog_teaser/', function(req, res) {
  findAllBlogTeaser().then(function(blogs) {
    res.send(blogs);
  });
});

app.get('/api/blogs/:slug', function(req, res) {
  findBlog(req.params.slug).then(function(blog) {
    if (!blog) { res.status(404); }
    res.send(blog);
  });
});

app.get('/*', function(req, res) {
  res.sendFile(path.join( __dirname + '/templates/index.html'));
});


app.listen(3300, function() {
  console.log('Listening on 3300');
});