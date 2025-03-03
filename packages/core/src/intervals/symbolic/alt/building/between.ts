import { PERFECT_OCTAVE } from "../constants";
import type { Interval } from "../Interval";
import { sub } from "../modifiers/sub";
import { neg } from "../modifiers/neg";
import { betweenNext } from "./betweenNext";
import type { Pitch } from "pitches/alt";
import { Intervals } from "intervals/diatonic";

export function between(pitch1: Pitch, pitch2: Pitch): Interval | null {
  const init = betweenNext(pitch1, pitch2);

  if (init === null)
    return null;

  if (init.diatonicInterval >= Intervals.FIFTH) {
    const s = sub(PERFECT_OCTAVE, init);

    if (s === null)
      return null;

    return neg(s);
  }

  return init;
}
