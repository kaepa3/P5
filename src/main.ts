import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import p5 from "p5";

/**
 * min以上max以下のランダムな整数を取得する
 */
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


const sketch = (p: p5) => {
  // p という引数（スケッチそのもの）を受け取る関数を作る
  var colorsLeft: p5.Color[] = [];
  var colorsRight: p5.Color[] = [];
  var tileCountX: number;
  var tileCountY: number;
  var interCol: p5.Color;
  var interpolateShortest = true;

  function shakeColors() {
    for (var i = 0; i < tileCountY; i++) {
      colorsLeft[i] = p.color(getRandomInt(0, 155), getRandomInt(0, 155), 155);
      colorsRight[i] = p.color(getRandomInt(0, 155), 55, getRandomInt(0, 55));
    }
  }
  p.setup = () => {
    p.createCanvas(800, 800);
    p.colorMode(p.HSB);
    p.noStroke();
    shakeColors();
  };

  p.draw = () => {
    // カラーモードを元コードに合わせる
    p.colorMode(p.HSB, 360, p.width, p.height);
    p.background(360, 0, p.height);

    tileCountX = p.map(p.mouseX, 0, p.width, 2, 100);
    tileCountY = p.map(p.mouseY, 0, p.height, 2, 10);
    const tileWidth = p.width / tileCountX;
    const tileHeight = p.height / tileCountY;
    const colors = [];

    // 2Dモードで色を分けるには、ループ内で三角形を一つずつ描く
    for (let gridY = 0; gridY < tileCountY; gridY++) {
      const col1 = colorsLeft[gridY];
      const col2 = colorsRight[gridY];
      for (let gridX = 0; gridX < tileCountX; gridX++) {
        const amount = p.map(gridX, 0, tileCountX - 1, 0, 1);
        if (interpolateShortest) {
          p.colorMode(p.RGB)
          if (col1 && col2) {
            interCol = p.lerpColor(col1, col2, amount);
          }
          p.colorMode(p.HSB);
        } else {
          if (col1 && col2) {
            interCol = p.lerpColor(col1, col2, amount);
          }
        }
        p.fill(interCol);
        const posX = tileWidth * gridX;
        const posY = tileHeight * gridY;
        p.rect(posX, posY, tileWidth, tileHeight);
        colors.push(interCol)
      }
    }
  };
  p.keyPressed = () => {
    if (p.key == '1') interpolateShortest = true;
    if (p.key == '2') interpolateShortest = false;
  };
  p.mouseReleased = () => {
    shakeColors();
  }
};

// 実行
const targetElement = document.getElementById("app") as HTMLElement;
new p5(sketch, targetElement);

createApp(App).mount("#app");
