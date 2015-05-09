var colors = [
  '#50A3A2',
  '#53E3A6',
  '#F79E7F',
  '#F7CF93',
  '#E2F0A5'
];

function randColor() { return colors[ Math.floor(Math.random() * colors.length) ]; }

// v == view
// p == shape?
function shapeArray(v, p) {
  var iY, iX;
  
  var numRows = Math.floor( v.bounds.height / ( p.radius * 2 + p.pad * 2 ) );
  var numCols = Math.floor( v.bounds.width / ( p.radius * 2 + p.pad * 2 ) );
  
  for (iY = 0; iY < numRows; iY++) {
    for (iX = 0; iX < numCols; iX++) {
      v.drawShape({
        x: (p.radius + p.pad) + iX * (p.radius * 2 + p.pad * 2),
        y: (p.radius + p.pad) + iY * (p.radius * 2 + p.pad * 2),
        size: Math.floor(p.range[0] + Math.random() * (p.range[1] - p.range[0] + 1)),
        color: randColor(),
        radius: p.radius,
        offset: 'RANDOM',
        animate: true,
        animDurFn: function() { return 2000 + Math.random() * 2000 ; },
        rotationFn: function() { return 360 - Math.random() * 720 ; },
        fillOpacity: 0.6,
        strokeOpacity: 0.0,
        drawBoundingCircle: false,
        rand: 40
      });
    }
  }
}



// v.blah({ radius: 100, size: 10, x: 300, y: 300, offset: 'RANDOM', rand: 70, color: '#D77FD9', animate: true })
// v.blah({ radius: 200, size: 10, x: 300, y: 300, offset: 'RANDOM', rand: 70, color: '#8FD95B', animate: true })
// v.blah({ radius: 200, size: 10, x: 300, y: 300, offset: 'RANDOM', rand: 70, color: '#6DBBD1', animate: true })
// v.blah({ radius: 200, size: 10, x: 300, y: 300, offset: 'RANDOM', rand: 70, color: '#555252', animate: true })
// v.blah({ radius: 200, size: 10, x: 300, y: 300, offset: 'RANDOM', rand: 70, color: '#F9E185', animate: true })
// v.blah({ radius: 200, size: 10, x: 300, y: 300, offset: 'RANDOM', rand: 70, color: '#D77FD9', animate: true })
// v.blah({ radius: 200, size: 10, x: 300, y: 300, offset: 'RANDOM', rand: 70, color: '#8FD95B', animate: true })
// v.blah({ radius: 200, size: 10, x: 300, y: 300, offset: 'RANDOM', rand: 70, color: '#6DBBD1', animate: true })
// v.blah({ radius: 200, size: 10, x: 300, y: 300, offset: 'RANDOM', rand: 70, color: '#555252', animate: true })
// v.blah({ radius: 200, size: 10, x: 300, y: 300, offset: 'RANDOM', rand: 70, color: '#F9E185', animate: true })
// v.blah({ radius: 200, size: 10, x: 300, y: 300, offset: 'RANDOM', rand: 70, color: 'black', animate: true })
// v.blah({ radius: 200, size: 10, x: 300, y: 300, offset: 'RANDOM', rand: 70, color: 'white', animate: true })
// v.blah({ radius: 200, size: 10, x: 300, y: 300, offset: 'RANDOM', rand: 70, color: '#D77FD9', animate: true })
// v.blah({ radius: 200, size: 10, x: 300, y: 300, offset: 'RANDOM', rand: 70, color: '#6DBBD1', animate: true })
// v.blah({ radius: 200, size: 10, x: 300, y: 300, offset: 'RANDOM', rand: 70, color: 'white', animate: true })
