import type { Interval } from "../Interval";
import { frac } from "datils/math/num-exp";
import { deepFreeze } from "datils/datatypes/objects";
import { from } from "../building";

export function initialize() {
  if (SYNTONIC_COMMA)
    throw new Error("Already initialized");

  SYNTONIC_COMMA = from(frac(81, 80));
  deepFreeze(SYNTONIC_COMMA);
  PYTHAGOREAN_COMMA = from(frac(531441, 524288)); // lower than 1
  deepFreeze(PYTHAGOREAN_COMMA);
}

export let SYNTONIC_COMMA: Interval;

export let PYTHAGOREAN_COMMA: Interval;
