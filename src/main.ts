import p5 from 'p5';
import './lib/generative-design-library.js'; // サイドエフェクト・インポート
(p5 as any).disableFriendlyErrors = true;


new p5((p: p5) => {
  var moduleColor: p5.Color;
  var moduleAlpha = 180;
  var maxDistance = 500;


  p.setup = () => {
    p.createCanvas(600, 600);
    p.noFill();
    p.strokeWeight(3);
    moduleColor = p.color(0, 0, 0, moduleAlpha);
  };

  p.draw = () => {
    p.clear();
    p.stroke(moduleColor);

    for (let gridY = 0; gridY < p.width; gridY += 25) {
      for (let gridX = 0; gridX < p.height; gridX += 25) {
        var diameter = p.dist(p.mouseX, p.mouseY, gridX, gridY);
        diameter = diameter / maxDistance * 40;

        p.push();
        p.translate(gridX, gridY);

        p.rect(0, 0, diameter, diameter);
        p.pop();
      }
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.mousePressed = () => {
  };


  p.keyReleased = () => {
    if (p.key == 's') p.saveCanvas("hoge", 'png')
  }
});
