/* jshint node: true */
var fs = require('fs');

fs.readFile('../files/blog.md', 'utf8', function (e, d) {
  if (e) { return console.log(e); }
  fs.writeFile('../files/blog.json', JSON.stringify({
    title: "plutonium.io's First Post",
    slug: "hello-world",
    text: d,
  }));
});
