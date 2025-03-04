import type { MusicalDuration } from "./MusicalDuration";
import { div, mult } from "@datune/utils/time";

export function dotted(obj: MusicalDuration) {
  return mult(obj, 1.5);
}

export function triplet(obj: MusicalDuration) {
  return div(obj, 1.5);
}
