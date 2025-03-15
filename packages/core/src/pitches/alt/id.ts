import type { Pitch } from "./Pitch";

export function getObjId(obj: Pitch): string {
  return `${+obj.diatonic}:${obj.alts}`;
}
