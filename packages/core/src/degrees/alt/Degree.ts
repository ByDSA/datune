import { a1, a2, a3, a4, a5, a6,
  m2, m3, d5, m6, m7,
  da1, da2, da3, da4, da5, da6,
  dd3, dd4, dd5, dd6, dd7,
  d2, d3, d4, d6, d7,
  P1, M2, M3, P4, P5, M6, M7 } from "intervals/symbolic/alt/constants";

export type Degree =
  typeof a1 | typeof a2 | typeof a3 | typeof a4 | typeof a5
  | typeof a6 | typeof d2 | typeof d3 | typeof d4 | typeof d5
  | typeof d5 | typeof d6 | typeof d7 | typeof da1 | typeof da2
  | typeof da3 | typeof da4 | typeof da5 | typeof da6 | typeof dd3
  | typeof dd4 | typeof dd5 | typeof dd6 | typeof dd7 | typeof M2
  | typeof m2 | typeof M3 | typeof m3 | typeof M6 | typeof m6
  | typeof M7 | typeof m7 | typeof P1 | typeof P4 | typeof P5;
