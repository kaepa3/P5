import p5 from 'p5';
import './lib/generative-design-library.js'; // サイドエフェクト・インポート
(p5 as any).disableFriendlyErrors = true;
// main.ts の new p5((p: any) => { ... }) の中に直接入れるか、
// その外に定義して p を渡すようにします。

new p5((p: p5) => {
  let hueValues: number[] = [];
  let saturationValues: number[] = [];
  let brightnessValues: number[] = [];
  let actRandomSeed = 0;
  let colorCount = 20;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100, 100);
    p.noStroke();
  };

  p.draw = () => {
    p.noLoop();
    p.randomSeed(actRandomSeed);

    for (let i = 0; i < colorCount; i++) {
      if (i % 2 == 0) {

        hueValues[i] = p.random(130, 220);
        saturationValues[i] = 100;
        brightnessValues[i] = Math.floor(p.random(15, 100));
      } else {

        hueValues[i] = 195;
        saturationValues[i] = Math.floor(p.random(20, 100));
        brightnessValues[i] = 100;
      }
    }

    var counter = 0;
    var rowCount = Math.floor(p.random(5, 30));
    var rowHeight = p.height / rowCount;

    for (let i = rowCount; i >= 0; i--) {
      var partCount = i + 1;
      var parts = [];
      for (let ii = 0; ii < partCount; ii++) {
        if (p.random() < 0.075) {
          var fragments = p.random(2, 20);
          partCount = partCount + fragments;
          for (let iii = 0; iii < fragments; iii++) {
            parts.push(p.random(2));
          }
        } else {
          parts.push(p.random(2, 20));
        }
      }

      var sumPartsTotal = 0;
      for (let ii = 0; ii < partCount; ii++) {
        var v = parts[ii];
        if (v) {
          sumPartsTotal += v;
        }
      }

      var sumPartsNow = 0;
      for (let ii = 0; ii < parts.length; ii++) {
        var pV = parts[ii]
        if (pV) {
          sumPartsNow += pV;
          var x = p.map(sumPartsNow, 0, sumPartsTotal, 0, p.width);
          var y = rowHeight * i;
          var w = -p.map(pV, 0, sumPartsTotal, 0, p.width);
          var h = rowHeight;

          var index = Math.floor(counter % colorCount);
          var hV = hueValues[index];
          var sV = saturationValues[index];
          var bV = brightnessValues[index];
          if (hV && sV && bV && x) {
            var col = p.color(hV, sV, bV);
            p.fill(col);
            p.rect(x, y, w, h);
          } else {
            console.log("error1:" + x + ":" + y + ":" + w + ":" + h + ":" + hV + ":" + sV + ":" + bV);
          }
        } else {
          console.log("error2");
        }
        counter++;

      }
    }
  };

  p.mouseReleased = () => {
    actRandomSeed = p.random(100000);
    p.loop();
  };

  p.keyReleased = () => {
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');
    if (p.key == 'c' || p.key == 'C') {
      // -- save an ase file (adobe swatch export) --
      var colors = [];
      for (var i = 0; i < hueValues.length; i++) {
        var h = hueValues[i];
        var s = saturationValues[i];
        var b = brightnessValues[i];
        if (h && s && b) {
          colors.push(p.color(h, s, b));
        }
      }
      writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
    }
  };
});
