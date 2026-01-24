import p5 from 'p5';
import './lib/generative-design-library.js'; // サイドエフェクト・インポート
(p5 as any).disableFriendlyErrors = true;


new p5((p: p5) => {
  var count = 10;
  var lineWeight = 0;
  var strokeColor = 0;
  var backgroundColor = 0;

  var drawMode = 1;

  p.setup = () => {
    p.createCanvas(800, 800);
  };

  p.draw = () => {
    p.background(backgroundColor);

    var tileCountX = p.mouseX / 30 + 1;
    var tileCountY = p.mouseY / 30 + 1;
    var tileWidth = p.width / tileCountX;
    var tileHeight = p.height / tileCountY;

    for (let gridY = 0; gridY < tileCountY; gridY++) {
      for (let gridX = 0; gridX < tileCountX; gridX++) {
        var posX = tileWidth * gridX;
        var posY = tileHeight * gridY;

        var x1 = tileWidth / 2;
        var y1 = tileHeight / 2;
        var x2 = 0;
        var y2 = 0;
        p.push();
        p.translate(posX, posY);
        for (let side = 0; side < 4; side++) {
          for (let i = 0; i < count; i++) {
            switch (side) {
              case 0:
                x2 += tileWidth / count;
                y2 = 0;
                break;
              case 1:
                x2 = tileWidth;
                y2 += tileHeight / count;
                break;
              case 2:
                x2 -= tileWidth / count;
                y2 = tileHeight;
                break;
              case 3:
                x2 = 0;
                y2 -= tileHeight / count;
                break;
            }
            if (i < count / 2) {
              lineWeight += 1;
              strokeColor += 60;
            } else {
              lineWeight -= 1;
              strokeColor -= 60;
            }
            switch (drawMode) {
              case 1:
                backgroundColor = 255;
                p.stroke(0);
                break;
              case 2:
                backgroundColor = 255;
                p.stroke(0);
                p.strokeWeight(lineWeight);
                break;
              case 3:
                backgroundColor = 0;
                p.stroke(strokeColor);
                p.strokeWeight(p.mouseX / 100);
                break;
            }
            p.line(x1, y1, x2, y2);
          }
        }
        p.pop();
      }
    }
  };

  p.windowResized = () => {
  };

  p.mousePressed = () => {
  };


  p.keyReleased = () => {
    if (p.key == 's') p.saveCanvas("hoge", 'png')
  }
});
