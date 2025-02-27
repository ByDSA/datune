import { fromPitchOctave } from "../building/pitch-octave";
import type { SPN } from "../SPN";
import type { Interval } from "intervals/chromatic";
import { Pitches as CPitches } from "pitches/chromatic";

export function add(obj: SPN, interval: Interval): SPN | null {
  const newIntValue = +obj + +interval;
  const chromatic = CPitches.fromInt(newIntValue);
  const octave = Math.floor(newIntValue / CPitches.NUMBER);

  return fromPitchOctave(chromatic, octave);
}
