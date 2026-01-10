import p5 from 'p5';
import './lib/generative-design-library.js'; // サイドエフェクト・インポート
(p5 as any).disableFriendlyErrors = true;
// main.ts の new p5((p: any) => { ... }) の中に直接入れるか、
// その外に定義して p を渡すようにします。

new p5((p: p5) => {
  var tileCount = 20;
  var actRandomSeed = 0;

  var actStrokeCap;

  p.setup = () => {
    p.createCanvas(600, 600);
    actStrokeCap = p.ROUND;
  };

  p.draw = () => {
    p.clear();

    p.strokeCap(actStrokeCap);
    p.randomSeed(actRandomSeed);
    for (let gridX = 0; gridX < tileCount; gridX++) {
      for (let gridY = 0; gridY < tileCount; gridY++) {
        const posX = p.width / tileCount * gridX;
        const posY = p.height / tileCount * gridY;

        var toggle = p.floor(p.random(0, 2));
        if (toggle == 0) {
          p.strokeWeight(p.mouseX / 20);
          p.line(posX, posY, posX + p.width / tileCount, posY + p.height / tileCount);
        }
        else if (toggle == 1) {
          p.strokeWeight(p.mouseY / 20);
          p.line(posX, posY + p.width / tileCount, posX + p.height / tileCount, posY);
        }
        else {
          console.log("naze:" + toggle);
        }
      }
    }
  };
  p.mousePressed = () => {
    actRandomSeed = p.random(100000);
  };


  p.keyReleased = () => {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');

    if (p.key == '1') actStrokeCap = p.ROUND;
    if (p.key == '2') actStrokeCap = p.SQUARE;
    if (p.key == '3') actStrokeCap = p.PROJECT;
  }
});
