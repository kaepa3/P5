import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import p5 from "p5";

// p という引数（スケッチそのもの）を受け取る関数を作る
const sketch = (p: p5) => {
  p.setup = () => {
    p.createCanvas(800, 400)
    p.noStroke()
    p.colorMode(p.HSB, p.width, p.height, 100)
  };

  p.draw = () => {
    var stepX = p.mouseX + 2;
    var stepY = p.mouseY + 2;
    if (stepX < 10 || stepY < 10) {
      return
    }
    for (var gridY = 0; gridY < p.height; gridY += stepY) {
      for (var gridX = 0; gridX < p.width; gridX += stepX) {
        p.fill(gridX, p.height - gridY, 100);
        p.rect(gridX, gridY, stepX, stepY);
      }
    }
  };
};

// 実行
const targetElement = document.getElementById("app") as HTMLElement;
new p5(sketch, targetElement);

createApp(App).mount("#app");
