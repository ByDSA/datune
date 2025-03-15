import type { Degree } from "./Degree";

type Key = number;

export function getObjId(obj: Degree): string {
  return getId(getKey(obj));
}

export function getKey(obj: Degree): Key {
  return +obj;
}

export function getId(key: Key): string {
  return String(key);
}
