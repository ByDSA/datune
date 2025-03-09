import { fixAlts } from "pitches/alt/fixAlts";
import { Quality } from "../Quality";
import { a, d, da, dd, M, m, P } from "../constants";

export function fromInt(int: number, isMain: boolean): Quality {
  if (isMain) {
    switch (int) {
      case 0: return P;
      case 1: return a;
      case -1: return d;
      case 2: return da;
      case -2: return dd;
      default: return getOrCreate(int);
    }
  }

  switch (int) {
    case 0: return M;
    case -1: return m;
    case 1: return a;
    case -2: return d;
    case 2: return da;
    case -3: return dd;
    default: return getOrCreate(int);
  }
}

const map: Record<number, Quality> = {};

function getOrCreate(int: number): Quality {
  int = fixAlts(int);
  let ret = map[int];

  if (!ret) {
    const str = int > 0 ? "+" + int : int;

    map[int] = new (Quality as any)(`(${str})`);

    ret = map[int];
  }

  return ret;
}
