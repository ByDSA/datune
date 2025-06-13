import { degree } from "intervals/symbolic/alt/modifiers/cyclic-octave";
import { type DegreeArray, Intervals as I, Scales, type PitchArray } from "alt";
import { from } from "./rootScale";

export function fromPitches(...pitches: PitchArray) {
  const root = pitches[0];
  const degrees = pitches.map(
    p=> degree(I.betweenNext(root, p)),
  ) as DegreeArray;
  const scale = Scales.fromDegrees(...degrees);

  return from(root, scale);
}
