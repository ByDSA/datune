import type { Quality } from "../Quality";
import { a, d, da, dd, M, m, P } from "../constants";

export function fromInt(int: number, isMain: boolean): Quality | null {
  if (isMain) {
    switch (int) {
      case 0: return P;
      case 1: return a;
      case -1: return d;
      case 2: return da;
      case -2: return dd;
      default: return null;
    }
  }

  switch (int) {
    case 0: return M;
    case -1: return m;
    case 1: return a;
    case -2: return d;
    case 2: return da;
    case -3: return dd;
    default: return null;
  }
}
