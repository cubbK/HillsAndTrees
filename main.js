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
  constructor(detail, height, rangeX, rangeY) {
    this.detail = detail;
    this.height = height;
    this.rangeX = canvasWidth / rangeX;
    this.rangeY = canvasHeight / rangeY;
  }
  getPath() {
    var path = [];
    for (var level = 0; level < this.detail; level++) {
      var newPath = [];
      if (path.length == 0) {
        newPath.push({
          'level': 0,
          'value': randomRange(this.height - this.rangeY, this.height + this.rangeY)
        })
      } else {
        for (var i = 0; i < path.length; i++) {
          if (path[i].level == level - 1) {
            newPath.push({
              'level': level,
              'value': randomRange(this.height - this.rangeY, this.height + this.rangeY) / (level + 1)
            });
            newPath.push(path[i]);
            newPath.push({
              'level': level,
              'value': randomRange(this.height - this.rangeY, this.height + this.rangeY) / (level + 1)
            });
          } else {
            newPath.push(path[i]);
          }
        }
      }
      path = newPath;
    }
    var overrideRange = [Math.floor(path.length/2 -2) ,Math.floor(path.length/2 +2) ];
    console.log(overrideRange);
    for (var i = overrideRange[0]; i <= overrideRange[1] ; i++) {
      if (i != overrideRange/2){
        console.log(path[i]);
        path[i]['value'] =randomRange(this.height - this.rangeY, this.height + this.rangeY) * 0.75;
      }
    }
    return path;

  }
  draw(path) {
    var triangle = new Konva.Shape({
      sceneFunc: function(context) {
        context.beginPath();
        context.moveTo(0, canvasHeight);
        var sectorLength = canvasWidth / path.length;
        for (var i = 0; i < path.length; i++) {
          context.lineTo(randomRange(sectorLength - 2, sectorLength + 2) * (i + 0.5), canvasHeight - path[i].value);
        }
        context.lineTo(canvasWidth, canvasHeight);
        //context.quadraticCurveTo(150, 100, 260, 170);
        context.closePath();

        // Konva specific method
        context.fillStrokeShape(this);
      },
      fill: '',
      stroke: 'black',
      strokeWidth: 5
    });

    // add the triangle shape to the layer
    layer.add(triangle);

    // add the layer to the stage
    stage.add(layer);
  }
}

// first we need to create a stage
var stage = new Konva.Stage({
  container: 'canvas', // id of container <div>
  width: canvasWidth,
  height: canvasHeight
});

// then create layer
var layer = new Konva.Layer();

var hill = new Hill(4, 250, 30, 4);
var path = hill.getPath();
hill.draw(path);
