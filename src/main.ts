import p5 from 'p5';
import './lib/generative-design-library.js'; // サイドエフェクト・インポート
(p5 as any).disableFriendlyErrors = true;
// main.ts の new p5((p: any) => { ... }) の中に直接入れるか、
// その外に定義して p を渡すようにします。

new p5((p: p5) => {
  let hueValues: p5.Color[] = [];
  let saturationValues: p5.Color[] = [];
  let brightnessValues: p5.Color[] = [];

  // 1. setImage を内部関数として定義
  const setImage = (loadedImageFile: p5.Image) => {
    img = loadedImageFile;
  };

  p.setup = () => {
    p.createCanvas(600, 600);
    p.noCursor();
    p.noStroke();
    p.loadImage('pic.png', setImage, (err: any) => {
      console.error('Image Load Failed!', err); // 失敗した時のログ
    });
  };

  p.draw = () => {
    if (!img || !img.pixels) return;

    img.loadPixels();

    const tileCount = p.floor(p.width / p.max(p.mouseX, 5));
    const rectSize = p.width / tileCount;

    colors = [];

    // ピクセル抽出
    for (let gridY = 0; gridY < tileCount; gridY++) {
      for (let gridX = 0; gridX < tileCount; gridX++) {
        const px = p.int(gridX * rectSize);
        const py = p.int(gridY * rectSize);
        const i = (py * img.width + px) * 4;
        const c = p.color(
          img.pixels[i],
          img.pixels[i + 1],
          img.pixels[i + 2],
          img.pixels[i + 3]
        );
        colors.push(c);
      }
    }

    // 3. ライブラリ呼び出し (前回修正した通り、p を渡す必要があるかもしれません)
    // ライブラリの仕様に合わせて gd.sortColors(colors, sortMode) かもしれません
    sortColors(p, colors, sortMode);

    // 描画
    let i = 0;
    for (let gridY = 0; gridY < tileCount; gridY++) {
      for (let gridX = 0; gridX < tileCount; gridX++) {
        p.fill(colors[i]);
        p.rect(gridX * rectSize, gridY * rectSize, rectSize, rectSize);
        i++;
      }
    }
  };

  p.keyReleased = () => {
    // 4. キー判定
    if (p.key == 'c' || p.key == 'C') {
      // writeFile や gd.timestamp がグローバルにある前提
      (window as any).writeFile([gd.ase.encode(colors)], gd.timestamp(), 'ase');
    }
    if (p.key == 's' || p.key == 'S') p.saveCanvas(gd.timestamp(), 'png');

    if (p.key == '1') p.loadImage('data/pic1.jpg', setImage);
    if (p.key == '2') p.loadImage('data/pic2.jpg', setImage);
    if (p.key == '3') p.loadImage('data/pic3.jpg', setImage);
    if (p.key == '4') p.loadImage('data/pic4.jpg', setImage);
    if (p.key == 'a') sortMode = null;
    if (p.key == 'b') sortMode = gd.HUE;
    if (p.key == '7') sortMode = gd.SATURATION;
    if (p.key == '8') sortMode = gd.BRIGHTNESS;
    if (p.key == '9') sortMode = gd.GRAYSCALE;
    console.log("press:" + p.key + ":" + sortMode)
  };
});
