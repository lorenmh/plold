/* jshint node: true */

var shapes = require('./shapes');

var colors = [
  '#50A3A2',
  '#53E3A6',
  '#F79E7F',
  '#F7CF93',
  '#E2F0A5'
];

function randColor() { return colors[ Math.floor(Math.random() * colors.length) ]; }

var animFn = function() { return 2000 + Math.random() * 2000 ; };
var rotFn = function() { return 360 - Math.random() * 720 ; };

// p == params
function shapeArray(p) {
  var iY, iX;
  
  var numRows = Math.floor( 
    p.view.bounds.height / ( p.radius * 2 + p.pad * 2 )
  );

  var numCols = Math.floor(
    p.view.bounds.width / ( p.radius * 2 + p.pad * 2 )
  );
  
  for (iY = 0; iY < numRows; iY++) {
    for (iX = 0; iX < numCols; iX++) {
      p.view.drawShape({
        x: (p.radius + p.pad) + iX * (p.radius * 2 + p.pad * 2),
        y: (p.radius + p.pad) + iY * (p.radius * 2 + p.pad * 2),
        size: Math.floor(p.range[0] + Math.random() * (p.range[1] - p.range[0] + 1)),
        color: randColor(),
        radius: p.radius,
        offset: 'RANDOM',
        animate: true,
        animDurFn: animFn,
        rotationFn: rotFn,
        fillOpacity: 0.6,
        strokeOpacity: 0.0,
        drawBoundingCircle: false,
        rand: 40
      });
    }
  }
}

module.exports = shapeArray;