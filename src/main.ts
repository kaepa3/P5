import p5 from 'p5';
import './lib/generative-design-library.js'; // サイドエフェクト・インポート
(p5 as any).disableFriendlyErrors = true;

// パーティクルの型定義
interface Particle {
  target: p5.Vector;    // 本来あるべき位置
  pos: p5.Vector;       // 現在の位置
  vel: p5.Vector;       // 速度
  acc: p5.Vector;       // 加速度
  angle: number;        // 回転角
  angVel: number;       // 回転速度
}
type AnimationState = 'gathering' | 'stay' | 'falling';

new p5((p: p5) => {
  let myFont: p5.Font;
  let particles: Particle[] = [];
  let state: AnimationState = 'gathering'; // gathering (集合), stay (静止), falling (落下)
  let timer = 0;

  const TEXT_STR = '放蕩息子';
  const FONT_SIZE = 250;

  p.setup = async () => {
    myFont = await p.loadFont('Cica-Regular.ttf');
    //myFont = await p.loadFont('serif');
    p.createCanvas(p.windowWidth, p.windowHeight);

    // 文字を座標の配列に変換
    p.textSize(FONT_SIZE);
    const points = myFont.textToPoints(TEXT_STR, 0, 0, {
      sampleFactor: 0.15
    }) as Array<{ x: number, y: number }>;

    // 中央配置のためのオフセット計算
    const bounds = (myFont as any).textBounds(TEXT_STR, 0, 0, FONT_SIZE) as { w: number; h: number };
    const offsetX = p.width / 2 - bounds.w / 2;
    const offsetY = p.height / 2 + bounds.h / 2;

    // パーティクルの初期化
    particles = points.map(pt => ({
      target: p.createVector(pt.x + offsetX, pt.y + offsetY),
      pos: p.createVector(p.random(-p.width, p.width * 2), p.random(-p.height, p.height * 2)),
      vel: p.createVector(0, 0),
      acc: p.createVector(0, 0),
      angle: 0,
      angVel: p.random(-0.1, 0.1)
    }));

  };

  p.draw = () => {
    p.background(15);

    let arrivedCount = 0;

    particles.forEach(part => {
      updateParticle(part);
      drawParticle(part);

      // 目的地に到達したか判定（ gathering中のみ）
      if (state === 'gathering' && p5.Vector.dist(part.pos, part.target) < 1) {
        arrivedCount++;
      }
    });

    // 状態遷移のロジック
    handleStateTransition(arrivedCount);
  };

  // 各パーティクルの挙動を更新
  const updateParticle = (part: Particle) => {
    if (state === 'gathering') {
      part.pos.lerp(part.target, 0.08);
    } else if (state === 'falling') {
      const gravity = p.createVector(0, 0.25);
      part.vel.add(gravity);
      part.pos.add(part.vel);
      part.angle += part.angVel;
    }
  };

  // 描画処理
  const drawParticle = (part: Particle) => {
    p.push();
    p.translate(part.pos.x, part.pos.y);
    p.rotate(part.angle);
    p.fill(255, 204, 0);
    p.noStroke();
    p.rect(0, 0, 3, 3);
    p.pop();
  };

  // シーン進行の管理
  const handleStateTransition = (arrivedCount: number) => {
    if (state === 'gathering' && arrivedCount > particles.length * 0.95) {
      timer++;
      if (timer > 60) {
        state = 'falling';
        particles.forEach(part => {
          part.vel = p.createVector(p.random(-2, 2), p.random(-5, -1));
        });
      }
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };

  p.mousePressed = () => {
  };


  p.keyReleased = () => {
    if (p.key == 's') p.saveCanvas("hoge", 'png')
  }
});
