import p5 from 'p5';
import './lib/generative-design-library.js'; // サイドエフェクト・インポート
(p5 as any).disableFriendlyErrors = true;

new p5((p: p5) => {

  var tileCount = 10;
  var shapes: p5.Image[] = [];
  var currentShape: p5.Image;
  var tileWidth: number;
  var tileHeight: number;
  var maxDist: number;
  var shapeAngle = 0;
  var shapeSize = 20;
  var newShapeSize = shapeSize;
  var isLoading = true;


  var sizeMode = 0;

  async function getImage(path: string): Promise<p5.Image> {
    const response = await fetch(path);
    const text = await response.text();
    console.log("First 5 chars:", text.substring(0, 5));
    // 1. 文字列からBlobを作成（ここで image/svg+xml を強制）
    const blob = new Blob([text], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    return new Promise((resolve, reject) => {
      p.loadImage(
        url,
        (img) => {
          URL.revokeObjectURL(url);
          resolve(img);
        },
        (err) => {
          URL.revokeObjectURL(url);
          reject(err);
        }
      );
    });
  }

  p.setup = async () => {
    console.log("start");
    const paths: string[] = [
      '/data/module_1.svg',
      '/data/module_2.svg',
      '/data/module_3.svg',
      '/data/module_4.svg',
      '/data/module_5.svg',
      '/data/module_6.svg',
      '/data/module_7.svg',
    ];
    for (let index = 0; index < paths.length; index++) {
      const element = paths[index];
      if (element) {
        try {
          const img = await getImage(element);
          console.log("yattayo")
          shapes.push(img);
        } catch (err) {
          console.error(element + ":" + err);
        }
      }
    }
    console.log("end");
    p.createCanvas(600, 600);
    p.imageMode(p.CENTER);
    var img = shapes[0];
    if (img) {
      currentShape = img;
    }
    tileWidth = p.width / tileCount;
    tileHeight = p.height / tileCount;
    maxDist = p.sqrt(p.pow(p.width, 2) + p.pow(p.height, 2))
    isLoading = false;

  };


  p.draw = () => {
    if (shapes.length === 0) return;
    if (isLoading) return;

    p.clear();
    for (let gridY = 0; gridY < tileCount; gridY++) {
      for (let gridX = 0; gridX < tileCount; gridX++) {
        var posX = tileWidth * gridX + tileWidth / 2;
        var posY = tileHeight * gridY + tileWidth / 2;
        var angle = p.atan2(p.mouseY - posY, p.mouseX - posX) + (shapeAngle * (p.PI / 180));
        if (sizeMode == 0) newShapeSize = shapeSize;
        if (sizeMode == 1) newShapeSize = shapeSize * 1.5 - p.map(p.dist(p.mouseX, p.mouseY, posX, posY), 0, 500, 5, shapeSize);
        if (sizeMode == 2) newShapeSize = p.map(p.dist(p.mouseX, p.mouseY, posX, posY), 0, 500, 5, shapeSize);

        p.push();
        p.translate(posX, posY);
        p.rotate(angle);
        p.noStroke();
        p.image(currentShape, 0, 0, newShapeSize, newShapeSize);
        p.pop();
      }
    }

  };

  p.mousePressed = () => {
  };


  p.keyReleased = () => {
    if (p.key == 's') p.saveCanvas("hoge", 'png')
    if (p.key == 'd') sizeMode = (sizeMode + 1) % 3;
    if (p.key == 'g') {
      tileCount += 5;
      if (tileCount > 20) {
        tileCount = 10;
      }
      tileWidth = p.width / tileCount;
      tileHeight = p.height / tileCount;
    }
    if (p.key == '1') {
      var img = shapes[0];
      if (img) {
        currentShape = img;
      }
    }
    if (p.key == '2') {
      var img = shapes[1];
      if (img) {
        currentShape = img;
      }
    }
    if (p.key == '3') {
      var img = shapes[2];
      if (img) {
        currentShape = img;
      }
    }
    if (p.key == '4') {
      var img = shapes[3];
      if (img) {
        currentShape = img;
      }
    }
    if (p.key == '5') {
      var img = shapes[4];
      if (img) {
        currentShape = img;
      }
    }
    if (p.key == '6') {
      var img = shapes[5];
      if (img) {
        currentShape = img;
      }
    }
    if (p.key == '7') {
      var img = shapes[6];
      if (img) {
        currentShape = img;
      }
    }

    if (p.key == p.UP_ARROW) shapeSize += 5;
    if (p.key == p.DOWN_ARROW) shapeSize -= 5;
    if (p.key == p.LEFT_ARROW) shapeAngle += 5;
    if (p.key == p.RIGHT_ARROW) shapeAngle -= 5;
  }
});
