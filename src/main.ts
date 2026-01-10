import p5 from 'p5';
import './lib/generative-design-library.js'; // サイドエフェクト・インポート
(p5 as any).disableFriendlyErrors = true;
// main.ts の new p5((p: any) => { ... }) の中に直接入れるか、
// その外に定義して p を渡すようにします。

new p5((p: p5) => {

  var tileCount = 20;
  var actRandomSeed = 0;

  var actStrokeCap: typeof p5.ROUND | typeof p5.SQUARE | typeof p5.PROJECT;
  var colorLeft: p5.Color;
  var colorRight: p5.Color;
  var alphaLeft = 255;
  var alphaRight = 255;

  p.setup = () => {
    p.createCanvas(600, 600);
    actStrokeCap = p.ROUND;
    colorLeft = p.color(197, 0, 123, alphaLeft);
    colorRight = p.color(87, 35, 129, alphaLeft);
  };

  p.draw = () => {
    p.clear();
    p.strokeCap(actStrokeCap);
    p.randomSeed(actRandomSeed);

    for (let gridY = 0; gridY < tileCount; gridY++) {
      for (let gridX = 0; gridX < tileCount; gridX++) {
        const posX = p.width / tileCount * gridX;
        const posY = p.height / tileCount * gridY;
        const toggle = p.floor(p.random(0, 2));
        if (toggle == 0) {
          p.stroke(colorLeft);
          p.strokeWeight(p.mouseX / 10);
          p.line(posX, posY, posX + p.width / tileCount, posY + p.height / tileCount);
        }

        if (toggle == 1) {
          p.stroke(colorRight);
          p.strokeWeight(p.mouseY / 10);
          p.line(posX, posY + p.width / tileCount, posX + p.height / tileCount, posY);
        }
      }

    }
  };

  p.mousePressed = () => {
    actRandomSeed = p.random(100000);
  };


  p.keyReleased = () => {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
    if (p.key == '1') actStrokeCap == p.ROUND;
    if (p.key == '2') actStrokeCap == p.SQUARE;
    if (p.key == '3') actStrokeCap == p.PROJECT;

    var black = p.color(0, 0, 0, 255);
    if (p.key == '4') {
      if (colorEqual(colorLeft, black)) {
        colorLeft = p.color(197, 0, 123, alphaLeft);
      } else {
        colorLeft = p.color(0, 0, 0, alphaLeft);
      }
    }
    if (p.key == '5') {
      if (colorEqual(colorRight, black)) {
        colorRight = p.color(87, 35, 129, alphaRight);
      } else {
        colorRight = p.color(0, 0, 0, alphaRight);
      }
    }
    if (p.key == '6') {
      if (alphaLeft == 255) {
        alphaLeft = 127;
      } else {
        alphaLeft = 255;
      }
      colorLeft = p.color(p.red(colorLeft), p.green(colorLeft), p.blue(colorLeft), alphaLeft);
    }
    if (p.key == '6') {
      if (alphaRight == 255) {
        alphaRight = 127;
      } else {
        alphaRight = 255;
      }
      colorRight = p.color(p.red(colorRight), p.green(colorRight), p.blue(colorRight), alphaRight);
    }
    if (p.key == '0') {
      actStrokeCap = p.ROUND;
      alphaLeft = 255;
      alphaRight = 255;
      colorLeft = p.color(0, 0, 0, alphaLeft);
      colorRight = p.color(0, 0, 0, alphaRight);
    }
  }
  function colorEqual(color1: p5.Color, color2: p5.Color) {
    return color1.toString() == color2.toString();
  }
});
