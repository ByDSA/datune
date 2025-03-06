import type { Interval } from "../Interval";
import { frac } from "@datune/utils/math";
import { from } from "../building";

export let COMMA: Interval;

export let a1: Interval;

export let d2: Interval;

export let m2: Interval;

export let d3: Interval;

export let M2: Interval;

export let m3: Interval;

export let a2: Interval;

export let d4: Interval;

export let M3: Interval;

export let P4: Interval;

export let a3: Interval;

export let d5: Interval;

export let TRITONE: Interval;

export let a4: Interval;

export let d6: Interval;

export let P5: Interval;

export let m6: Interval;

export let a5: Interval;

export let d7: Interval;

export let M6: Interval;

export let m7: Interval;

export let a6: Interval;

export let d8: Interval;

export let M7: Interval;

export let a7: Interval;

export function initialize() {
  if (COMMA)
    throw new Error("Already initialized");

  COMMA = from(frac(531441, 524288));
  a1 = from(frac(2187, 2048));
  d2 = from(frac(524288, 531441)); // lower than 1
  m2 = from(frac(256, 243));
  d3 = from(frac(65536, 59049));
  M2 = from(frac(9, 8));
  m3 = from(frac(32, 27));
  a2 = from(frac(19683, 16384));
  d4 = from(frac(8192, 6561));
  M3 = from(frac(81, 64));
  P4 = from(frac(4, 3));
  a3 = from(frac(177147, 131072));
  d5 = from(frac(1024, 729));
  TRITONE = d5;
  a4 = from(frac(729, 512));
  d6 = from(frac(262144, 177147));
  P5 = from(frac(3, 2));
  m6 = from(frac(128, 81));
  a5 = from(frac(6561, 4096));
  d7 = from(frac(32768, 19683));
  M6 = from(frac(27, 16));
  m7 = from(frac(16, 9));
  a6 = from(frac(59049, 32768));
  d8 = from(frac(4096, 2187));
  M7 = from(frac(243, 128));
  a7 = from(frac(531441, 262144));
}
