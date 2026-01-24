import p5 from 'p5';
import './lib/generative-design-library.js'; // サイドエフェクト・インポート
(p5 as any).disableFriendlyErrors = true;


new p5((p: p5) => {
  var count = 0;
  var tileCountX = 6;
  var tileCountY = 6;

  var drawMode = 1;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.rectMode(p.CENTER);
  };

  p.draw = () => {
    p.clear();
    p.noFill();

    count = p.mouseX / 10 + 10;
    var para = p.mouseY / p.height;

    var tileWidth = p.width / tileCountX;
    var tileHeight = p.height / tileCountY;

    for (let gridY = 0; gridY < tileCountY; gridY++) {
      for (let gridX = 0; gridX < tileCountX; gridX++) {
        var posX = tileWidth * gridX + tileWidth / 2;
        var posY = tileHeight * gridY + tileHeight / 2;

        p.push();
        p.translate(posX, posY);

        switch (drawMode) {
          case 1:
            p.stroke(0);
            for (let i = 0; i < count; i++) {
              p.rect(0, 0, tileWidth, tileHeight);
              p.scale(1 - 3 / count);
              p.rotate(para * 0.1);
            }
            break;
          case 2:
            p.noStroke();
            for (let i = 0; i < count; i++) {
              var gradient = p.lerpColor(p.color(0, 0), p.color(166, 141, 5), i / count);
              gradient.setAlpha(i / count * 200);
              p.fill(gradient);
              p.rotate(p.QUARTER_PI);
              p.rect(0, 0, tileWidth, tileHeight);
              p.scale(1 - 3 / count);
              p.rotate(para * 1.5);
            }
            break;
          case 3:
            p.noStroke();
            for (let i = 0; i < count; i++) {

              var gradient = p.lerpColor(p.color(0, 0), p.color(166, 141, 5), i / count);
              gradient.setAlpha(170);
              p.fill(gradient);
              p.push();
              p.translate(4 * i, 0);
              p.ellipse(0, 0, tileWidth / 4, tileHeight / 4);
              p.pop();

              p.push();
              p.translate(-4 * i, 0);
              p.ellipse(0, 0, tileWidth / 4, tileHeight / 4);
              p.pop();

              p.scale(1 - 1.5 / count);
              p.rotate(para * 1.5);
            }
            break;
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
    if (p.key == '1') drawMode = 1;
    if (p.key == '2') drawMode = 2;
    if (p.key == '3') drawMode = 3;
    if (p.key == p.DOWN_ARROW) tileCountY = p.max(tileCountY - 1, 1);
    if (p.key == p.UP_ARROW) tileCountY += 1;
    if (p.key == p.LEFT_ARROW) tileCountX = p.max(tileCountX - 1, 1);
    if (p.key == p.RIGHT_ARROW) tileCountX += 1;
  }
});
