import type { Degree } from "./Degree";

type Key = number;

export function getObjId(degree: Degree): string {
  return getId(getKey(degree));
}

export function getId(key: Key): string {
  return String(key);
}

export function getKey(degree: Degree): Key {
  return +degree;
}
