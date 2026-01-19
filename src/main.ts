import p5 from 'p5';
import './lib/generative-design-library.js'; // サイドエフェクト・インポート
(p5 as any).disableFriendlyErrors = true;

new p5((p: p5) => {

  var tileCount = 10;
  var actRandomSeed: number = 0;

  var circleAlpha = 130;
  var circleColor: p5.Color;

  p.setup = async () => {
    p.createCanvas(600, 600);
    p.noFill();
    circleColor = p.color(0, 0, 0, circleAlpha);
  };


  p.draw = () => {
    p.translate(p.width / tileCount / 2, p.height / tileCount / 2);
    p.background(255);
    p.randomSeed(actRandomSeed);

    p.stroke(circleColor);
    p.strokeWeight(p.mouseY / 60);

    for (let gridY = 0; gridY < tileCount; gridY++) {
      for (let gridX = 0; gridX < tileCount; gridX++) {
        var posX = p.width / tileCount * gridX;
        var posY = p.height / tileCount * gridY;

        var shiftX = p.random(-p.mouseX, p.mouseX) / 20;
        var shiftY = p.random(-p.mouseX, p.mouseX) / 20;

        p.ellipse(posX + shiftX, posY + shiftY, p.mouseY / 15, p.mouseY / 15);
      }
    }
  };

  p.mousePressed = () => {
    actRandomSeed = p.random(100000);
  };


  p.keyReleased = () => {
    if (p.key == 's') p.saveCanvas("hoge", 'png')
  }
});
