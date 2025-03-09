/* eslint-disable no-redeclare */
import type { Interval } from "../Interval";
import type { Pitch } from "pitches/alt";
import type { Degree } from "alt";
import { Intervals as I } from "intervals/diatonic";
import { P8 } from "../constants";
import { sub } from "../modifiers/sub";
import { neg } from "../modifiers/neg";
import { betweenNext } from "./betweenNext";

export function between(from: Pitch, to: Pitch): Interval;

export function between(from: Degree, to: Degree): Interval;

export function between(from: Degree | Pitch, to: Degree | Pitch): Interval {
  const init = betweenNext(from as any, to as any);

  if (init.diatonicInterval >= I.FIFTH) {
    const s = sub(P8, init);

    return neg(s);
  }

  return init;
}
