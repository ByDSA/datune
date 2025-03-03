import { lockr } from "@datune/utils/immutables";
import { frac } from "@datune/utils/math";
import { from } from "../building";
import type { Interval } from "../Interval";

export function initialize() {
  SYNTONIC_COMMA = from(frac(81, 80));
  lockr(SYNTONIC_COMMA);
  PYTHAGOREAN_COMMA = from(frac(531441, 524288)); // lower than 1
  lockr(PYTHAGOREAN_COMMA);
}

export let SYNTONIC_COMMA: Interval;

export let PYTHAGOREAN_COMMA: Interval;
