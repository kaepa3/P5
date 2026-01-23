import p5 from 'p5';
import './lib/generative-design-library.js'; // サイドエフェクト・インポート
(p5 as any).disableFriendlyErrors = true;


new p5((p: p5) => {
  var tileCount = 20;
  var actRandomSeed = 0;

  var moduleColorBackground: p5.Color;
  var moduleColorForeground: p5.Color;

  var moduleAlphaBackground = 100;
  var moduleAlphaForeground = 100;

  var moduleRadiusBackground = 30;
  var moduleRadiusForeground = 15;

  var backgroundColor: p5.Color;

  p.setup = () => {
    p.createCanvas(600, 600);
    p.colorMode(p.HSB, 360, 100, 100, 100);
    p.noStroke();

    moduleColorBackground = p.color(0, 0, 0, moduleAlphaBackground);
    moduleColorForeground = p.color(0, 0, 100, moduleAlphaForeground);

    backgroundColor = p.color(0, 0, 100);

  };

  p.draw = () => {
    p.translate(p.width / tileCount / 2, p.height / tileCount / 2);
    p.background(backgroundColor);
    p.randomSeed(actRandomSeed);
    for (let gridY = 0; gridY < tileCount; gridY++) {
      for (let gridX = 0; gridX < tileCount; gridX++) {
        var posX = p.width / tileCount * gridX;
        var posY = p.height / tileCount * gridY;
        var shiftX = p.random(-1, 1) * p.mouseX / 20;
        var shiftY = p.random(-1, 1) * p.mouseY / 20;

        p.fill(moduleColorBackground);
        p.ellipse(posX + shiftX, posY + shiftY, moduleRadiusBackground, moduleRadiusBackground);

        p.fill(moduleColorForeground);
        p.ellipse(posX, posY, moduleRadiusForeground, moduleRadiusForeground);
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
