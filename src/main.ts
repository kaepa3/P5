import p5 from 'p5';
import './lib/generative-design-library.js'; // サイドエフェクト・インポート
(p5 as any).disableFriendlyErrors = true;
// main.ts の new p5((p: any) => { ... }) の中に直接入れるか、
// その外に定義して p を渡すようにします。

new p5((p: p5) => {

  p.setup = () => {
    p.createCanvas(720, 720);
    p.noFill()
    p.background(255);
    p.strokeWeight(2);
    p.stroke(0, 25);
  };

  p.draw = () => {
    if (p.mouseIsPressed && p.mouseButton.left) {
      p.push();
      p.translate(p.width / 2, p.height / 2);
      var circleResolution = p.map(p.mouseY + 100, 0, p.height, 2, 10);
      var radius = p.mouseX - p.width / 2;
      var angle = p.TAU / circleResolution;
      p.beginShape();
      for (let i = 0; i < circleResolution; i++) {
        const x = p.cos(angle * i) * radius;
        const y = p.sin(angle * i) * radius;
        p.vertex(x, y);

      }
      p.endShape();
      p.pop();
    }
  };
  p.keyReleased = () => {
    if (p.key == p.DELETE) p.background(255);
  }
});
