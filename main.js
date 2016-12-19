//Helpers
Array.prototype.insert = function(index, item) {
  this.splice(index, 0, item);
};

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}
//End Helpers

const canvasWidth = 1400;
const canvasHeight = 480;

class Hill {
  constructor(detail, height, rangeX, rangeY, color, posY) {
    this.detail = detail;
    this.height = height;
    this.rangeX = canvasWidth / rangeX;
    this.rangeY = canvasHeight / rangeY;
    this.color = color;
    this.posY = posY;
  }
  getPath() {
    var path = [];
    for (var level = 0; level < this.detail; level++) {
      var newPath = [];
      if (path.length == 0) {
        newPath.push({
          'level': 0,
        'value': randomRange(this.height - this.rangeY, this.height + this.rangeY) + this.posY * 70
        })
      } else {
        for (var i = 0; i < path.length; i++) {
          if (path[i].level == level - 1) {
            newPath.push({
              'level': level,
            'value': randomRange(this.height - this.rangeY, this.height + this.rangeY) / (level + 1) + this.posY * 70
            });
            newPath.push(path[i]);
            newPath.push({
              'level': level,
            'value': randomRange(this.height - this.rangeY, this.height + this.rangeY) / (level + 1) + this.posY * 70
            });
          } else {
            newPath.push({
              'level' : path[i].level,
              'value' : path[i].value + this.posY *70
            });
          }
        }
      }
      path = newPath;
    }
    //face ca in mijloc sa nu fie asa ascutit
    var overrideRange = [Math.floor(path.length/2 -4) ,Math.floor(path.length/2 +4) ];
    for (var i = overrideRange[0]; i <= overrideRange[1] ; i++) {
      if (i != overrideRange/2){
       
        path[i]['value'] =randomRange(this.height - this.rangeY, this.height + this.rangeY) * 0.85;
      }
    }
    return path;

  }
  draw(path) {
    var mountain = new Konva.Shape({
      sceneFunc: function(context) {
        context.beginPath();
        context.moveTo(0, canvasHeight);
        var sectorLength = canvasWidth / path.length;
        for (var i = 0; i < path.length; i++) {
          context.lineTo(randomRange(sectorLength - 3, sectorLength + 3) * (i + 0.5), canvasHeight - path[i].value);
        }
        context.lineTo(canvasWidth, canvasHeight);
        //context.quadraticCurveTo(150, 100, 260, 170);
        context.closePath();

        // Konva specific method
        context.fillStrokeShape(this);
      },
      fill: this.color,
      stroke: this.color,
      strokeWidth: 5
    });

    // add the triangle shape to the layer
    layer.add(mountain);

    // add the layer to the stage
    stage.add(layer);
  }
}
function drawSky () {
  var blueList = ['#6ca6cd' , '#9ac0cd', '#a9d4e1','#3a9dbc','#4a90ad'];
  var randomList = ['#f5b049','#77bfa3', '#b7e3cc','#6c5f78','#6dd472' ];
  var color1 = blueList[Math.floor(Math.random() * blueList.length)];
  var color2 = randomList[Math.floor(Math.random() * randomList.length)];
  var sky = new Konva.Rect({
    x: 0,
    y: 0,
    width: canvasWidth,
    height: canvasHeight,
    fillLinearGradientStartPoint: { x : canvasWidth/2, y: canvasHeight},
    fillLinearGradientEndPoint: { x : canvasWidth/2, y :0 },
    fillLinearGradientColorStops: [0, color2, 1, color1],
    strokeWidth: 4
  });
  layer.add(sky);
  stage.add(layer);
}
// first we need to create a stage
var stage = new Konva.Stage({
  container: 'canvas', // id of container <div>
  width: canvasWidth,
  height: canvasHeight
});

// then create layer
var layer = new Konva.Layer();

var colors = [ '#2a2a2a', '#3f3f3f', '#545454' ];

drawSky();
for (let i = 2; i >= 0; i--){
  let hill = new Hill(4, 250, 30, 4, colors[i], i);
  let path = hill.getPath();
  hill.draw(path);
}



