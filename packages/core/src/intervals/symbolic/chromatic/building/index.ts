import { cyclicMod } from "@datune/utils";
import { PERFECT_OCTAVE } from "../constants";
import type { Interval } from "../Interval";
import type { Pitch } from "pitches/chromatic/Pitch";
import { NUMBER as CNUMBER } from "pitches/chromatic/constants";
import type { SPN } from "spns/symbolic/chromatic/SPN";

export function between(n1: Pitch, n2: Pitch): Interval {
  const ret = +n2 - +n1;

  if (ret > 6)
    return ret - CNUMBER;

  if (ret <= -6)
    return ret + CNUMBER;

  return ret;
}

export function betweenNext(n1: Pitch, n2: Pitch): Interval {
  const ret = cyclicMod(+n2 - +n1, CNUMBER);

  if (ret === 0)
    return PERFECT_OCTAVE;

  return ret;
}

export function betweenSPN(n1: SPN, n2: SPN): Interval {
  return +n2 - +n1;
}
