import type { Quality } from "../Quality";
import { a, d, da, dd, M, m, P } from "../constants";

export function toInt(quality: Quality, isMain: boolean): number | null {
  if (isMain) {
    switch (quality) {
      case P: return 0;
      case d: return -1;
      case a: return 1;
      case dd: return -2;
      case da: return 2;
      default: return null;
    }
  }

  switch (quality) {
    case M: return 0;
    case m: return -1;
    case a: return 1;
    case d: return -2;
    case dd: return -3;
    case da: return 2;
    default: return null;
  }
}
