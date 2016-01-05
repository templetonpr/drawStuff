var canvas;

// we use these for drawing more interesting shapes
var lastX = 0;
var lastY = 0;
var strokeWidth = 1;
var thickness = 1;
var strokeColor = "black";

Meteor.startup(function () {
  canvas = new Canvas();

  Deps.autorun(function () {
    var data = Points.find({}).fetch();
    if (canvas) {
      canvas.draw(data);
    }
  });
});

Template.palette.events({

  "click button.clear": function (event) {
    Meteor.call('clear', function () {
      canvas.clear();
    });
  },

  //choose a color. Initialise the last vals, otherwise a stray line will appear.

  "click button.red": function (event) {
    lastX = 0;
    lastY = 0;
    strokeColor = "red";
    console.log("StrokeColor: " + strokeColor);
  },

  "click button.black": function (event) {
    lastX = 0;
    lastY = 0;
    strokeColor = "black";
    console.log("StrokeColor: " + strokeColor);
  },

  "click button.white": function (event) {
    lastX = 0;
    lastY = 0;
    strokeColor = "white";
    console.log("StrokeColor: " + strokeColor);
  },

  "click button.blue": function (event) {
    lastX = 0;
    lastY = 0;
    strokeColor = "blue";
    console.log("StrokeColor: " + strokeColor);
  },

  "click button.green": function (event) {
    lastX = 0;
    lastY = 0;
    strokeColor = "green";
    console.log("StrokeColor: " + strokeColor);
  },

  "click button.yellow": function (event) {
    lastX = 0;
    lastY = 0;
    strokeColor = "yellow";
    console.log("StrokeColor: " + strokeColor);
  },

  "click button.orange": function (event) {
    lastX = 0;
    lastY = 0;
    strokeColor = "orange";
    console.log("StrokeColor: " + strokeColor);
  },

  "click button.purple": function (event) {
    lastX = 0;
    lastY = 0;
    strokeColor = "purple";
    console.log("StrokeColor: " + strokeColor);
  },
  
  "click button.cyan": function (event) {
    lastX = 0;
    lastY = 0;
    strokeColor = "cyan";
    console.log("StrokeColor: " + strokeColor);
  },
  
  "click button.goldenrod": function (event) {
    lastX = 0;
    lastY = 0;
    strokeColor = "goldenrod";
    console.log("StrokeColor: " + strokeColor);
  },
  
  "click button.fuchsia": function (event) {
    lastX = 0;
    lastY = 0;
    strokeColor = "fuchsia";
    console.log("StrokeColor: " + strokeColor);
  },
  
  "click button.lime": function (event) {
    lastX = 0;
    lastY = 0;
    strokeColor = "lime";
    console.log("StrokeColor: " + strokeColor);
  },
  
  "click button.maroon": function (event) {
    lastX = 0;
    lastY = 0;
    strokeColor = "maroon";
    console.log("StrokeColor: " + strokeColor);
  },
  
  "click button.olive": function (event) {
    lastX = 0;
    lastY = 0;
    strokeColor = "olive";
    console.log("StrokeColor: " + strokeColor);
  },
  
  "click button.orchid": function (event) {
    lastX = 0;
    lastY = 0;
    strokeColor = "orchid";
    console.log("StrokeColor: " + strokeColor);
  },
  
  "click button.slategray": function (event) {
    lastX = 0;
    lastY = 0;
    strokeColor = "slategray";
    console.log("StrokeColor: " + strokeColor);
  },

  "blur #customColor": function (event) {
    lastX = 0;
    lastY = 0;
    strokeColor = event.target.value;
    console.log("StrokeColor: " + strokeColor);
  },

  "click button.thicker": function (event) {
    lastX = 0;
    lastY = 0;
    thickness += 1;
    console.log("Line thickness: " + thickness);

  },

  "click .brush-small": function (event) {
    lastX = 0;
    lastY = 0;
    thickness = 1;
    console.log("Line thickness: " + thickness);
  },

  "click .brush-medium": function (event) {
    lastX = 0;
    lastY = 0;
    thickness = 5;
    console.log("Line thickness: " + thickness);
  },

  "click .brush-large": function (event) {
    lastX = 0;
    lastY = 0;
    thickness = 10;
    console.log("Line thickness: " + thickness);
  },

  "click button.thinner": function (event) {
    lastX = 0;
    lastY = 0;
    if (thickness > 0) {
      thickness -= 1;
    }
    console.log("Line thickness: " + thickness);
  }

});

var markPoint = function (event) {

  var offset = $('#canvas').offset();

  // In the first frame, lastX and lastY are 0.
  // This means the line gets drawn to the top left of the screen
  // Which is annoying, so we test for this and stop it happening.

  if (lastX == 0) { // check that x was something not top-left. should probably set this to -1
    lastX = (event.pageX - offset.left);
    lastY = (event.pageY - offset.top);
  }
  Points.insert({
    //this draws a point exactly where you click the mouse
    // x: (event.pageX - offset.left),
    // y: (event.pageY - offset.top)});


    //We can do more interesting stuff
    //We need to input data in the right format
    //Then we can send this to d3 for drawing


    //1) Algorithmic mouse follower
    // x: (event.pageX - offset.left)+(Math.cos((event.pageX/10  ))*30),
    // y: (event.pageY - offset.top)+(Math.sin((event.pageY)/10)*30)});

    //2) draw a line - requires you to change the code in drawing.js
    x: (event.pageX - offset.left),
    y: (event.pageY - offset.top),
    x1: lastX,
    y1: lastY,
    // We could calculate the line thickness from the distance
    // between current position and last position
    //w: 0.05*(Math.sqrt(((event.pageX - offset.left)-lastX) * (event.pageX - offset.left)
    //  + ((event.pageY - offset.top)-lastY) * (event.pageY - offset.top))),
    // Or we could just set the line thickness using buttons and variable
    w: thickness,
    // We can also use strokeColor, defined by a selection
    c: strokeColor,


  }); // end of Points.insert()

  lastX = (event.pageX - offset.left);
  lastY = (event.pageY - offset.top);

};

Template.canvas.events({

  'click': function (event) {
    markPoint(event);
  },

  'mousedown': function (event) {
    Session.set('draw', true);
  },

  'mouseup': function (event) {
    Session.set('draw', false);
    lastX = 0;
    lasyY = 0;
  },

  'mousemove': function (event) {
    if (Session.get('draw')) {
      markPoint(event);
    }
  }

});