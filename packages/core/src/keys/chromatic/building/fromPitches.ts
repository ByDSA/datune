import { type DegreeArray, Intervals as I, Scales, type PitchArray } from "chromatic";
import { cyclicOctave } from "intervals/symbolic/chromatic/modifiers";
import { from } from "./rootScale";

export function fromPitches(...pitches: PitchArray) {
  const root = pitches[0];
  const rootIntervals = pitches.map(
    p=> cyclicOctave(I.betweenNext(root, p)),
  ) as DegreeArray;
  const scale = Scales.fromDegrees(...rootIntervals);

  return from(root, scale);
}
