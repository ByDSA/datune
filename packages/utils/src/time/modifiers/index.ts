import { Time } from "../Time";

export function add<T extends Time>(self: T, other: T): T {
  return +self + +other as T;
}

export function sub<T extends Time>(self: T, other: T): T {
  return +self - +other as T;
}

export function mult<T extends Time>(self: T, factor: number): T {
  return +self * factor as T;
}

export function divCell<T extends Time>(self: T, cellSize: T): number {
  return Math.trunc(+self / +cellSize);
}

export function div<T extends Time>(self: T, n: number): T {
  return +self / n as T;
}
