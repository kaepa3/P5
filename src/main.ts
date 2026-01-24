import p5 from 'p5';
import './lib/generative-design-library.js'; // サイドエフェクト・インポート
(p5 as any).disableFriendlyErrors = true;


new p5((p: p5) => {
  var tileCountX = 10;
  var tileCountY = 10;
  var tileWidth = 0;
  var tileHeight = 0;


  var circleCount = 0;
  var endSize = 0;
  var endOffset = 0;

  var actRandomSeed = 0;

  p.setup = () => {
    p.createCanvas(800, 800);
    tileWidth = p.width / tileCountX;
    tileHeight = p.height / tileCountY;

    p.noFill();
    p.stroke(0, 128);
  };

  p.draw = () => {
    p.background(255);
    p.randomSeed(actRandomSeed);

    p.translate(tileWidth / 2, tileHeight / 2);

    circleCount = p.mouseX / 30 + 1;
    endSize = p.map(p.mouseX, 0, p.max(p.width, p.mouseX), tileWidth / 2, 0);
    endOffset = p.map(p.mouseY, 0, p.max(p.height, p.mouseY), 0, (tileWidth - endSize) / 2);

    for (let gridY = 0; gridY < tileCountY; gridY++) {
      for (let gridX = 0; gridX < tileCountX; gridX++) {
        p.push();
        p.translate(tileWidth * gridX, tileHeight * gridY);
        p.scale(1, tileHeight / tileWidth);

        var toggle = Math.floor(p.random(0, 4));
        switch (toggle) {
          case 0:
            p.rotate(-p.HALF_PI);
            break;
          case 1:
            p.rotate(0);
            break;
          case 2:
            p.rotate(p.HALF_PI);
            break;
          case 3:
            p.rotate(p.PI);
            break;
        }
        for (let i = 0; i < circleCount; i++) {
          const diameter = p.map(i, 0, circleCount, tileWidth, endSize);
          var offset = p.map(i, 0, circleCount, 0, endOffset);
          p.ellipse(offset, 0, diameter, diameter);
        }
        p.pop();

      }
    }
  };

  p.windowResized = () => {
  };

  p.mousePressed = () => {
    actRandomSeed = p.random(100000);
  };


  p.keyReleased = () => {
    if (p.key == 's') p.saveCanvas("hoge", 'png')
  }
});
