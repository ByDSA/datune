import type { Quality } from "../Quality";
import { P, M, m, dd, da, d, a } from "../constants";

const negMap = new Map<Quality, Quality>([
  [P, P],
  [M, m],
  [m, M],
  [a, d],
  [da, dd],
  [dd, da],
  [d, a],
]);

export function neg(q: Quality): Quality {
  return negMap.get(q)!;
}
