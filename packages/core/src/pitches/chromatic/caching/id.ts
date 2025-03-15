import type { Pitch } from "../Pitch";

export type Key = number;

export function getObjId(pitch: Pitch): string {
  return getId(getKey(pitch));
}

export function getKey(pitch: Pitch): Key {
  return +pitch;
}

export function getId(key: Key): string {
  return String(key);
}
