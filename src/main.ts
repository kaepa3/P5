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
    p.noFill();
  };

  p.draw = () => {
    p.background(255);

    count = p.mouseX / 20 + 5;
    var para = p.min(p.height, p.mouseY) / p.height - 0.5;

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
            p.translate(-tileWidth / 2, -tileHeight / 2);
            for (let i = 0; i < count; i++) {
              p.line(0, (para + 0.5) * tileHeight, tileWidth, i * tileHeight / count);
              p.line(0, i * tileHeight / count, tileWidth, i * tileHeight - (para + 0.5) * tileHeight);
            }

            break;
          case 2:
            for (let i = 0; i < count; i++) {
              p.line(para * tileWidth, para * tileHeight, tileWidth / 2, (i / count - 0.5) * tileHeight);
              p.line(para * tileWidth, para * tileHeight, -tileWidth / 2, (i / count - 0.5) * tileHeight);
              p.line(para * tileWidth, para * tileHeight, (i / count - 0.5) * tileWidth, tileHeight / 2);
              p.line(para * tileWidth, para * tileHeight, (i / count - 0.5) * tileWidth, -tileHeight / 2);
            }

            break;
          case 3:
            for (let i = 0; i < count; i++) {
              p.line(0, para * tileHeight, tileWidth / 2, (i / count - 0.5) * tileHeight);
              p.line(0, para * tileHeight, -tileWidth / 2, (i / count - 0.5) * tileHeight);
              p.line(0, para * tileHeight, (i / count - 0.5) * tileWidth, tileHeight / 2);
              p.line(0, para * tileHeight, (i / count - 0.5) * tileWidth, -tileHeight / 2);
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
  }
});
