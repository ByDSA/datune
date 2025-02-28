import type { Pitch } from "../Pitch";

export function hash(obj: Pitch): string {
  return `${+obj.diatonic}:${obj.alts}`;
}
