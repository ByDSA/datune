/* eslint-disable no-redeclare */
import type { Interval } from "../Interval";
import type { Pitch } from "pitches/chromatic/Pitch";
import type { SPN } from "spns/symbolic/chromatic/SPN";
import type { Degree } from "chromatic";
import { cyclicMod } from "@datune/utils";
import { NUMBER as CNUMBER } from "pitches/chromatic/constants/Number";
import { P8 } from "../constants";

export function between(n1: Degree, n2: Degree): Interval;

export function between(n1: Pitch, n2: Pitch): Interval;

export function between(n1: Degree | Pitch, n2: Degree | Pitch): Interval {
  const ret = +n2 - +n1;

  if (ret > 6)
    return ret - CNUMBER;

  if (ret <= -6)
    return ret + CNUMBER;

  return ret;
}

export function betweenNext(n1: Degree, n2: Degree): Interval;

export function betweenNext(n1: Pitch, n2: Pitch): Interval;

export function betweenNext(n1: Degree | Pitch, n2: Degree | Pitch): Interval {
  const ret = cyclicMod(+n2 - +n1, CNUMBER);

  if (ret === 0)
    return P8;

  return ret;
}

export function betweenSPN(n1: SPN, n2: SPN): Interval {
  return +n2 - +n1;
}
