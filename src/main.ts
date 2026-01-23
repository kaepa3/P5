import p5 from 'p5';
import './lib/generative-design-library.js'; // サイドエフェクト・インポート
(p5 as any).disableFriendlyErrors = true;


new p5((p: p5) => {
  var tileCount = 20;
  var actRandomSeed = 0;
  var rectSize = 30;


  p.setup = () => {
    p.createCanvas(600, 600);
    p.colorMode(p.HSB, 360, 100, 100, 100);
    p.noStroke();
    p.fill(192, 100, 64, 60);
  };

  p.draw = () => {
    p.clear();
    p.randomSeed(actRandomSeed);

    for (let gridY = 0; gridY < tileCount; gridY++) {
      for (let gridX = 0; gridX < tileCount; gridX++) {
        var posX = (p.width / tileCount) * gridX;
        var posY = (p.height / tileCount) * gridY;


        var shiftX1 = p.mouseX / 20 * p.random(-1, 1);
        var shiftY1 = p.mouseY / 20 * p.random(-1, 1);
        var shiftX2 = p.mouseX / 20 * p.random(-1, 1);
        var shiftY2 = p.mouseY / 20 * p.random(-1, 1);
        var shiftX3 = p.mouseX / 20 * p.random(-1, 1);
        var shiftY3 = p.mouseY / 20 * p.random(-1, 1);
        var shiftX4 = p.mouseX / 20 * p.random(-1, 1);
        var shiftY4 = p.mouseY / 20 * p.random(-1, 1);

        p.push();
        p.translate(posX, posY);

        p.beginShape();
        p.vertex(shiftX1, shiftY1);
        p.vertex(rectSize + shiftX2, shiftY2);
        p.vertex(rectSize + shiftX3, rectSize + shiftY3);
        p.vertex(shiftX4, rectSize + shiftY4);
        p.endShape(p.CLOSE);
        p.pop();
      }
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.mousePressed = () => {
    actRandomSeed = p.random(100000);
  };


  p.keyReleased = () => {
    if (p.key == 's') p.saveCanvas("hoge", 'png')
  }
});
