const zlib = require('zlib');
const fs = require('fs');

const buf = fs.readFileSync('favicon/icon.png');
let offset = 8;
const idatChunks = [];
while(offset < buf.length) {
  const length = buf.readUInt32BE(offset);
  const type = buf.toString('ascii', offset + 4, offset + 8);
  if (type === 'IDAT') idatChunks.push(buf.subarray(offset + 8, offset + 8 + length));
  offset += 12 + length;
}
const raw = zlib.inflateSync(Buffer.concat(idatChunks));
const width = 1024, height = 1024;
const stride = 1 + width * 3;
const pixels = new Uint8Array(width * height * 3);

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

for (let y = 0; y < height; y++) {
  const filter = raw[y * stride];
  for (let x = 0; x < width * 3; x++) {
    const rawVal = raw[y * stride + 1 + x];
    const a = x >= 3 ? pixels[y * width * 3 + x - 3] : 0;
    const b = y > 0 ? pixels[(y - 1) * width * 3 + x] : 0;
    const c = (y > 0 && x >= 3) ? pixels[(y - 1) * width * 3 + x - 3] : 0;
    let val = 0;
    if (filter === 0) val = rawVal;
    else if (filter === 1) val = (rawVal + a) & 0xff;
    else if (filter === 2) val = (rawVal + b) & 0xff;
    else if (filter === 3) val = (rawVal + Math.floor((a + b) / 2)) & 0xff;
    else if (filter === 4) val = (rawVal + paeth(a, b, c)) & 0xff;
    pixels[y * width * 3 + x] = val;
  }
}

const grid = new Uint8Array(width * height);
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const r = pixels[(y * width + x) * 3];
    const g = pixels[(y * width + x) * 3 + 1];
    const b = pixels[(y * width + x) * 3 + 2];
    if (g > 80 && g > r + 30 && g > b + 30) grid[y * width + x] = 1;
  }
}

let startX = -1, startY = -1;
for (let y = 0; y < height && startY === -1; y++) {
  for (let x = 0; x < width; x++) {
    if (grid[y * width + x]) {
      startX = x;
      startY = y;
      break;
    }
  }
}

const dx = [1, 1, 0, -1, -1, -1, 0, 1];
const dy = [0, 1, 1, 1, 0, -1, -1, -1];
const contour = [];
let currX = startX, currY = startY;
let dir = 7;
let steps = 0;
do {
  contour.push([currX, currY]);
  let found = false;
  let checkDir = (dir + 5) % 8;
  for (let i = 0; i < 8; i++) {
    const d = (checkDir + i) % 8;
    const nx = currX + dx[d];
    const ny = currY + dy[d];
    if (nx >= 0 && nx < width && ny >= 0 && ny < height && grid[ny * width + nx]) {
      currX = nx;
      currY = ny;
      dir = d;
      found = true;
      break;
    }
  }
  if (!found) break;
  steps++;
} while (!(currX === startX && currY === startY) && steps < 50000);

function rdp(points, epsilon) {
  if (points.length < 3) return points;
  let maxDist = 0;
  let index = 0;
  const end = points.length - 1;
  const p1 = points[0];
  const p2 = points[end];

  const dX = p2[0] - p1[0];
  const dY = p2[1] - p1[1];
  const lenSq = dX * dX + dY * dY;

  for (let i = 1; i < end; i++) {
    const p = points[i];
    let dist;
    if (lenSq === 0) {
      dist = Math.hypot(p[0] - p1[0], p[1] - p1[1]);
    } else {
      const u = Math.max(0, Math.min(1, ((p[0] - p1[0]) * dX + (p[1] - p1[1]) * dY) / lenSq));
      const projX = p1[0] + u * dX;
      const projY = p1[1] + u * dY;
      dist = Math.hypot(p[0] - projX, p[1] - projY);
    }
    if (dist > maxDist) {
      maxDist = dist;
      index = i;
    }
  }

  if (maxDist > epsilon) {
    const left = rdp(points.slice(0, index + 1), epsilon);
    const right = rdp(points.slice(index), epsilon);
    return left.slice(0, left.length - 1).concat(right);
  } else {
    return [p1, p2];
  }
}

const pts = rdp(contour, 2.5);

function catmullRomToBezier(points) {
  const n = points.length;
  let d = 'M ' + points[0][0] + ' ' + points[0][1];
  for (let i = 0; i < n; i++) {
    const p0 = points[(i - 1 + n) % n];
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    const p3 = points[(i + 2) % n];

    const cp1x = p1[0] + (p2[0] - p0[0]) / 6;
    const cp1y = p1[1] + (p2[1] - p0[1]) / 6;

    const cp2x = p2[0] - (p3[0] - p1[0]) / 6;
    const cp2y = p2[1] - (p3[1] - p1[1]) / 6;

    d += ' C ' + cp1x.toFixed(1) + ' ' + cp1y.toFixed(1) + ', ' +
                 cp2x.toFixed(1) + ' ' + cp2y.toFixed(1) + ', ' +
                 p2[0] + ' ' + p2[1];
  }
  d += ' Z';
  return d;
}

const pathD = catmullRomToBezier(pts);
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="currentColor">
  <path d="${pathD}" />
</svg>`;
fs.writeFileSync('assets/images/brand-icon.svg', svg);
console.log('Saved assets/images/brand-icon.svg, points:', pts.length, 'file length:', svg.length);
