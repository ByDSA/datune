import type { SPN } from "../SPN";
import type { Interval } from "intervals/chromatic";
import { NUMBER as CNUMBER } from "pitches/chromatic/constants/Number";
import { fromInt as cPitchFromInt } from "pitches/chromatic/building";
import { fromPitchOctave } from "../building/pitch-octave";

export function add(obj: SPN, interval: Interval): SPN | null {
  const newIntValue = +obj + +interval;
  const chromatic = cPitchFromInt(newIntValue);
  const octave = Math.floor(newIntValue / CNUMBER);

  return fromPitchOctave(chromatic, octave);
}
