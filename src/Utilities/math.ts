export function min(a: number, b:number) {
  return (a < b) ? a : b;
}

export function max(a: number, b: number) {
  return (a > b) ? a : b;
}

export function clamp(start:number, end: number, val: number) {
  return max(start, min(end, val));
}

export function clamp01(val: number) {
  return max(0, min(1, val));
}

export function getPercentage(start: number, end:number, val: number) {
  return (val - start) / (end - start);
}

export function lerp(start: number, end: number, t:number) {
  t = clamp01(t);
  return start * (1 - t) + end * t;
}

export function lerpUnclamped(start: number, end:number, t:number) {
  return start * (1 - t) + end * t;
}

export function easeOutSine(x:number) {
  return Math.sin((x * Math.PI) / 2);
}