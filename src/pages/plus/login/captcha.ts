import Taro from "@tarojs/taro";
import { getUniqueId } from "laser-utils";

import { CANVAS_ID, CAPTCHA_HEIGHT, CAPTCHA_WIDTH } from "./model";

const THRESHOLD = 150;
const CHAR_MAP = {
  1: "111100111110000111110000111111100111111100111111100111111100111111100111111100111111100111110000001110000001",
  2: "100000111000000011111111001111111001111111001111110011111000111110011111100111111001111111000000001000000001",
  3: "100000111000000011111110001111111001111110011110000111110000011111110001111111001111110001100000011100000111",
  b: "001111111001111111001111111001000011000000001000111000001111100001111100001111100000111000000000001001000011",
  c: "111111111111111111111111111110000011100000011000111111001111111001111111001111111000111111100000011110000011",
  m: "111111111111111111111111111001000011000000000000111000001111001001111001001111001001111001001111001001111001",
  n: "111111111111111111111111111001100001001000000000011100000111100001111100001111100001111100001111100001111100",
  v: "111111111111111111111111111111111011001110011001110011001110011100100111100100111100100111110001111110001111",
  x: "111111111111111111111111111001110011001110011100100111110001111110001111110001111100100111001110011001110011",
  z: "111111111111111111111111111000000011000000011111100111111001111110011111100111111001111111000000011000000011",
};

const getBinaryImageMatrix = (data: number[]) => {
  const matrix: number[][] = [];
  for (let x = 0; x < CAPTCHA_WIDTH; ++x) {
    for (let y = 0; y < CAPTCHA_HEIGHT; ++y) {
      if (!matrix[y]) matrix[y] = [];
      if (x === 0 || y === 0 || x === CAPTCHA_WIDTH - 1 || y === CAPTCHA_HEIGHT - 1) {
        matrix[y][x] = 1;
        continue;
      }
      const i = (y * CAPTCHA_WIDTH + x) * 4;
      if (data[i] < THRESHOLD && data[i + 1] < THRESHOLD && data[i + 2] < THRESHOLD) {
        matrix[y][x] = 0;
      } else {
        matrix[y][x] = 1;
      }
    }
  }
  return matrix;
};

const removeNoiseLine = (matrix: number[][]) => {
  const xCount = matrix[0].length;
  const yCount = matrix.length;
  for (let i = 1; i < yCount - 1; ++i) {
    for (let k = 1; k < xCount - 1; ++k) {
      if (matrix[i][k] === 0) {
        const countOne = matrix[i][k - 1] + matrix[i][k + 1] + matrix[i - 1][k] + matrix[i + 1][k];
        if (countOne > 2) matrix[i][k] = 1;
      }
    }
  }
  return matrix;
};

const detachedNodes = (matrix: number[][], sizeX: number[][], sizeY: number[][], n: number) => {
  const matrixGroup: number[][][] = [];
  for (let i = 0; i < n; ++i) {
    const item: number[][] = [];
    for (let j = sizeY[i][0]; j < sizeY[i][1]; ++j) {
      if (!item[j]) item[j - sizeY[i][0]] = [];
      for (let k = sizeX[i][0]; k < sizeX[i][1]; ++k) {
        item[j - sizeY[i][0]][k - sizeX[i][0]] = matrix[j][k];
      }
    }
    matrixGroup.push(item);
  }
  return matrixGroup;
};

const getString = (matrix: number[][]) => {
  let s = "";
  matrix.forEach(vx => {
    vx.forEach(vy => (s = s + vy));
  });
  return s;
};

function comparedText(s1, s2) {
  let percent = 0;
  const n = s1.length;
  for (let i = 0; i < n; ++i) {
    if (s1[i] === s2[i]) ++percent;
  }
  return percent;
}

const matchCode = (nodes: number[][][]) => {
  let record = "";
  nodes.forEach(imgArr => {
    let maxMatch = 0;
    let tempRecord = "";
    for (const char in CHAR_MAP) {
      const percent = comparedText(getString(imgArr), CHAR_MAP[char]);
      if (percent > maxMatch) {
        maxMatch = percent;
        tempRecord = char;
      }
    }
    record += tempRecord;
  });
  return record;
};

export const identifyCaptcha = (base64: string): Promise<string | null> => {
  if (!base64) return Promise.resolve(null);
  return new Promise<string | null>(resolve => {
    const path = `${Taro.env.USER_DATA_PATH || ""}/${getUniqueId()}.jpg`;
    const ctx = Taro.createCanvasContext(CANVAS_ID);
    const fs = Taro.getFileSystemManager();
    fs.writeFileSync(path, base64, "base64");
    ctx.drawImage(path, 0, 0, CAPTCHA_WIDTH, CAPTCHA_HEIGHT);
    ctx.draw(false, () => {
      Taro.canvasGetImageData({
        canvasId: CANVAS_ID,
        x: 0,
        y: 0,
        width: CAPTCHA_WIDTH,
        height: CAPTCHA_HEIGHT,
      })
        .then(res => {
          const data = [...res.data];
          let matrix = getBinaryImageMatrix(data);
          matrix = removeNoiseLine(matrix);
          const nodes = detachedNodes(
            matrix,
            [
              [4, 13],
              [14, 23],
              [24, 33],
              [34, 43],
            ],
            [
              [4, 16],
              [4, 16],
              [4, 16],
              [4, 16],
            ],
            4
          );
          const result = matchCode(nodes);
          console.log("验证码识别为：", result);
          resolve(result);
        })
        .catch(error => {
          console.log("IdentifyCaptcha Error", error);
          resolve(null);
        })
        .finally(() => {
          fs.unlink({ filePath: path });
        });
    });
  }).catch(error => {
    console.log("IdentifyCaptcha Error", error);
    return null;
  });
};
