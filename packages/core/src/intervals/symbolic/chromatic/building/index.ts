import { cyclicMod } from "@datune/utils";
import { NUMBER, Pitch } from "pitches/chromatic";
import { SPN } from "spns/chromatic";
import { PERFECT_OCTAVE } from "../constants";
import Interval from "../Interval";

export function between(n1: Pitch, n2: Pitch): Interval {
  const ret = +n2 - +n1;

  if (ret > 6)
    return ret - NUMBER;

  if (ret <= -6)
    return ret + NUMBER;

  return ret;
}

export function betweenNext(n1: Pitch, n2: Pitch): Interval {
  const ret = cyclicMod(+n2 - +n1, NUMBER);

  if (ret === 0)
    return PERFECT_OCTAVE;

  return ret;
}

export function betweenSPN(n1: SPN, n2: SPN): Interval {
  return +n2 - +n1;
}
