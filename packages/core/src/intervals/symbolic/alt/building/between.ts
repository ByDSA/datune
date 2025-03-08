/* eslint-disable no-redeclare */
import type { Interval } from "../Interval";
import type { Pitch } from "pitches/alt";
import { Intervals } from "intervals/diatonic";
import { Degree } from "alt";
import { P8 } from "../constants";
import { sub } from "../modifiers/sub";
import { neg } from "../modifiers/neg";
import { betweenNext } from "./betweenNext";

export function between(from: Pitch, to: Pitch): Interval | null;

export function between(from: Degree, to: Degree): Interval | null;

export function between(from: Degree | Pitch, to: Degree | Pitch): Interval | null {
  const init = betweenNext(from as any, to as any);

  if (init === null)
    return null;

  if (init.diatonicInterval >= Intervals.FIFTH) {
    const s = sub(P8, init);

    if (s === null)
      return null;

    return neg(s);
  }

  return init;
}
