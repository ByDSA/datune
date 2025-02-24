/* eslint-disable import/no-mutable-exports */
import { lockr } from "@datune/utils/immutables";
import { frac } from "@datune/utils/math";
import { from } from "../building";
import IntervalPitch from "../Interval";

export function initialize() {
  SYNTONIC_COMMA = from(frac(81, 80));
  lockr(SYNTONIC_COMMA);
  PYTHAGOREAN_COMMA = from(frac(531441, 524288)); // lower than 1
  lockr(PYTHAGOREAN_COMMA);
}

export let SYNTONIC_COMMA: IntervalPitch;

export let PYTHAGOREAN_COMMA: IntervalPitch;
