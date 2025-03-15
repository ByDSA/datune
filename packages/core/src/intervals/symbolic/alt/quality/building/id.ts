import type { Quality } from "../Quality";

export type Key = string;

export function getObjId(quality: Quality): string {
  return String(quality);
}
