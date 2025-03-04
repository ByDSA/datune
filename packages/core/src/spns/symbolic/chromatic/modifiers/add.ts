import type { SPN } from "../SPN";
import type { Interval } from "intervals/chromatic";
import { Pitches as CP } from "pitches/chromatic";
import { fromPitchOctave } from "../building/pitch-octave";

export function add(obj: SPN, interval: Interval): SPN | null {
  const newIntValue = +obj + +interval;
  const chromatic = CP.fromInt(newIntValue);
  const octave = Math.floor(newIntValue / CP.NUMBER);

  return fromPitchOctave(chromatic, octave);
}
