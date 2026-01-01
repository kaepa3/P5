import p5 from 'p5';
import './lib/generative-design-library.js'; // サイドエフェクト・インポート
(p5 as any).disableFriendlyErrors = true;
// main.ts の new p5((p: any) => { ... }) の中に直接入れるか、
// その外に定義して p を渡すようにします。

new p5((p: p5) => {
  let hueValues: number[] = [];
  let saturationValues: number[] = [];
  let brightnessValues: number[] = [];

  var tileCountX = 50;
  var tileCountY = 10;

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    p.colorMode(p.HSB, 360, 100, 100, 100);
    p.noStroke();

    for (let i = 0; i < tileCountX; i++) {
      hueValues[i] = p.random(360);
      saturationValues[i] = p.random(100);
      brightnessValues[i] = p.random(100);
    }
  };

  p.draw = () => {
    p.background(0, 0, 100);

    var mX = p.constrain(p.mouseX, 0, p.width);
    var mY = p.constrain(p.mouseY, 0, p.height);

    var counter = 0;
    var currentTileCountX = p.map(mX, 0, p.width, 1, tileCountX);
    var currentTileCountY = p.map(mY, 0, p.height, 1, tileCountY);
    var tileWidth = p.width / currentTileCountX;
    var tileHeight = p.height / currentTileCountY;
    for (let gridY = 0; gridY < tileCountY; gridY++) {
      for (let gridX = 0; gridX < tileCountX; gridX++) {
        var posX = tileWidth * gridX;
        var posY = tileHeight * gridY;

        var index = Math.floor(counter % currentTileCountX);

        var h = hueValues[index];
        var s = saturationValues[index];
        var b = brightnessValues[index];
        if (h && s && b) {
          p.fill(h, s, b);
        } else {
          console.log("over flow:" + index)
        }
        p.rect(posX, posY, tileWidth, tileHeight);
        counter++;
      }
    }
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

    if (p.key == '1') {
      for (var i = 0; i < tileCountX; i++) {
        hueValues[i] = p.random(360);
        saturationValues[i] = p.random(100);
        brightnessValues[i] = p.random(100);
      }
    }

    if (p.key == '2') {
      for (var i = 0; i < tileCountX; i++) {
        hueValues[i] = p.random(360);
        saturationValues[i] = p.random(100);
        brightnessValues[i] = 100;
      }
    }

    if (p.key == '3') {
      for (var i = 0; i < tileCountX; i++) {
        hueValues[i] = p.random(360);
        saturationValues[i] = 100;
        brightnessValues[i] = p.random(100);
      }
    }

    if (p.key == '4') {
      for (var i = 0; i < tileCountX; i++) {
        hueValues[i] = 0;
        saturationValues[i] = 0;
        brightnessValues[i] = p.random(100);
      }
    }

    if (p.key == '5') {
      for (var i = 0; i < tileCountX; i++) {
        hueValues[i] = 195;
        saturationValues[i] = 100;
        brightnessValues[i] = p.random(100);
      }
    }

    if (p.key == '6') {
      for (var i = 0; i < tileCountX; i++) {
        hueValues[i] = 195;
        saturationValues[i] = p.random(100);
        brightnessValues[i] = 100;
      }
    }

    if (p.key == '7') {
      for (var i = 0; i < tileCountX; i++) {
        hueValues[i] = p.random(180);
        saturationValues[i] = p.random(80, 100);
        brightnessValues[i] = p.random(50, 90);
      }
    }

    if (p.key == '8') {
      for (var i = 0; i < tileCountX; i++) {
        hueValues[i] = p.random(180, 360);
        saturationValues[i] = p.random(80, 100);
        brightnessValues[i] = p.random(50, 90);
      }
    }

    if (p.key == '9') {
      for (var i = 0; i < tileCountX; i++) {
        if (i % 2 == 0) {
          hueValues[i] = p.random(360);
          saturationValues[i] = 100;
          brightnessValues[i] = p.random(100);
        } else {
          hueValues[i] = 195;
          saturationValues[i] = p.random(100);
          brightnessValues[i] = 100;
        }
      }
    }

    if (p.key == '0') {
      for (var i = 0; i < tileCountX; i++) {
        if (i % 2 == 0) {
          hueValues[i] = 140;
          saturationValues[i] = p.random(30, 100);
          brightnessValues[i] = p.random(40, 100);
        } else {
          hueValues[i] = 210;
          saturationValues[i] = p.random(40, 100);
          brightnessValues[i] = p.random(50, 100);
        }
      }
    }
  };
});
