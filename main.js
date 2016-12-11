//Helpers
Array.prototype.insert = function(index, item) {
  this.splice(index, 0, item);
};

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}
//End Helpers

const canvasWidth = 768;
const canvasHeight = 480;

class Hill {
  constructor(detail) {
    this.detail = detail;
  }
  getPath() {
    var path = [];
    for (var level = 0; level < this.detail; level++) {
      var newPath = [];
      if (path.length == 0) {
        newPath.push({
          'level' : 0,
          'value' : 100
        })
      }else {
        for (var i = 0 ; i < path.length ; i++){
          if (path[i].level == level-1) {
            newPath.push({
              'level' : level,
              'value' : 100/ (level+1)
            });
            newPath.push(path[i]);
            newPath.push({
              'level' : level,
              'value' : 100/ (level+1)
            });
          }else {
            newPath.push(path[i]);
          }
        }
      }
      path = newPath;
    }
    console.log(path);
  }
}
  var hill = new Hill(4);
  hill.getPath();
  // first we need to create a stage
  var stage = new Konva.Stage({
    container: 'canvas', // id of container <div>
    width: canvasWidth,
    height: canvasHeight
  });

  // then create layer
  var layer = new Konva.Layer();

  var triangle = new Konva.Shape({
    sceneFunc: function(context) {
      context.beginPath();
      context.moveTo(0, 240);
      context.lineTo(220, 80);
      context.quadraticCurveTo(150, 100, 260, 170);
      context.closePath();

      // Konva specific method
      context.fillStrokeShape(this);
    },
    fill: '#00D2FF',
    stroke: 'black',
    strokeWidth: 4
  });

  // add the triangle shape to the layer
  layer.add(triangle);

  // add the layer to the stage
  stage.add(layer);
