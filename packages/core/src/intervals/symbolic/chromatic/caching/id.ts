import type { Interval } from "../Interval";

type Key = number;

export function getKey(interval: Interval): Key {
  return +interval;
}

export function getId(key: Key): string {
  return String(key);
}

export function getObjId(interval: Interval): string {
  return getId(getKey(interval));
}
