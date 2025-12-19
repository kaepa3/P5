import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import p5 from "p5";

// p という引数（スケッチそのもの）を受け取る関数を作る
const sketch = (p: p5) => {
  p.setup = () => {
    //    p.createCanvas(400, 400);
    //    p.noFill();
    //    console.log("hello");
    p.createCanvas(720, 720)
    p.noCursor()

    p.colorMode(p.HSB, 300, 100, 100)
    p.rectMode(p.CENTER)
    p.noStroke()
  };

  p.draw = () => {
    //    p.background(255);
    //    p.rect(p.mouseX, p.mouseY, 40, 40);
    //    p.ellipse(p.mouseX, p.mouseY, 40, 40);
    //    p.requestPointerLock
    //    p.point(50, 50)
    //    var speed = p.dist(p.mouseX)
    p.background(p.mouseX / 2, 100, 100)

    p.fill(360, 100, 100)
    p.rect(360, 360, p.mouseX + 1, p.mouseY + 1)
  };
};

// 実行
const targetElement = document.getElementById("app") as HTMLElement;
new p5(sketch, targetElement);

createApp(App).mount("#app");
