import type { Spn } from "../Spn";
import type { Interval } from "intervals/chromatic";
import { NUMBER as CNUMBER } from "pitches/chromatic/constants/Number";
import { fromInt as cPitchFromInt } from "pitches/chromatic/building";
import { fromPitchOctave } from "../building/pitch-octave";

export function add(obj: Spn, interval: Interval): Spn | null {
  const newIntValue = +obj + +interval;
  const chromatic = cPitchFromInt(newIntValue);
  const octave = Math.floor(newIntValue / CNUMBER);

  return fromPitchOctave(chromatic, octave);
}
