import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import p5 from "p5";

// p という引数（スケッチそのもの）を受け取る関数を作る
var segmentCount = 360;
var radius = 150;
const sketch = (p: p5) => {

  p.setup = () => {
    p.createCanvas(800, 400);
    p.noStroke();
    // colorMode は setup で 1 回だけ設定するのがベスト
    // H(0-360), S(0-width), B(0-height)
    p.colorMode(p.HSB, 360, p.width, p.height);
  };

  p.draw = () => {
    // カラーモードを元コードに合わせる
    p.colorMode(p.HSB, 360, p.width, p.height);
    p.background(360, 0, p.height);

    const angleStep = 360 / segmentCount;

    // 2Dモードで色を分けるには、ループ内で三角形を一つずつ描く
    for (let angle = 0; angle < 360; angle += angleStep) {
      const vx1 = p.width / 2 + p.cos(p.radians(angle)) * radius;
      const vy1 = p.height / 2 + p.sin(p.radians(angle)) * radius;
      const vx2 = p.width / 2 + p.cos(p.radians(angle + angleStep)) * radius;
      const vy2 = p.height / 2 + p.sin(p.radians(angle + angleStep)) * radius;

      // 1スライスごとに色を指定
      p.fill(angle, p.mouseX, p.mouseY);

      p.beginShape();
      p.vertex(p.width / 2, p.height / 2); // 中心
      p.vertex(vx1, vy1);                 // 現在の角度の点
      p.vertex(vx2, vy2);                 // 次の角度の点
      p.endShape(p.CLOSE);
    }
  };
  p.keyPressed = () => {
    switch (p.key) {
      case '1':
        segmentCount = 360;
        break;
      case '2':
        segmentCount = 45;
        break;
      case '3':
        segmentCount = 20;
        break;
      case '4':
        segmentCount = 12;
        break;
      case '5':
        segmentCount = 6;
        break;

    }
  };
};

// 実行
const targetElement = document.getElementById("app") as HTMLElement;
new p5(sketch, targetElement);

createApp(App).mount("#app");
