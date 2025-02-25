import { FIFTH } from "intervals/diatonic";
import { Pitch } from "pitches/alt";
import { betweenNext } from ".";
import { PERFECT_OCTAVE } from "../constants";
import Interval from "../Interval";
import { sub } from "../modifiers";

export default function betweenMin(pitch1: Pitch, pitch2: Pitch): Interval | null {
  const init = betweenNext(pitch1, pitch2);

  if (init === null)
    return null;

  if (init.diatonicInterval >= FIFTH)
    return sub(PERFECT_OCTAVE, init);

  return init;
}
