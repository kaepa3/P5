import p5 from 'p5';
import './lib/generative-design-library.js'; // サイドエフェクト・インポート
(p5 as any).disableFriendlyErrors = true;
// main.ts の new p5((p: any) => { ... }) の中に直接入れるか、
// その外に定義して p を渡すようにします。

new p5((p: p5) => {

  p.setup = () => {
    p.createCanvas(550, 550);
    p.strokeCap(p.SQUARE);
  };

  p.draw = () => {
    p.background(255);

    p.translate(p.width / 2, p.height / 2);

    var circleResolution = p.map(p.mouseY, 0, p.height, 2, 80);
    var radius = p.mouseX - p.width / 2 + 0.5;
    var angle = p.TWO_PI / circleResolution;
    p.strokeWeight(p.mouseY / 20);
    p.beginShape();
    for (let i = 0; i < circleResolution; i++) {
      const x = p.cos(angle * i) * radius;
      const y = p.sin(angle * i) * radius;
      p.line(0, 0, x, y);
    }
    p.endShape();
  };
});
