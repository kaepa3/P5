// src/lib/generative-design-library.d.ts
declare var gd: any; // 一番手っ取り早い解決策

declare global {
  // もし個別に型を定義したい場合はこちら
  const gd: {
    sortColors: (p: any, colors: any[], mode: any) => void;
    ase: { encode: (colors: any[]) => any };
    timestamp: () => string;
    HUE: any;
    SATURATION: any;
    BRIGHTNESS: any;
    GRAYSCALE: any;
  };
  function writeFile(data: any[], filename: string, extension: string): void;
}

export { };

