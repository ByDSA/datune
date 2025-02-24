import { Interval } from "intervals/chromatic";
import { fromInt as pitchFromInt, NUMBER as C_NUMBER } from "pitches/chromatic";
import { fromPitchOctave } from "../building";
import SPN from "../SPN";

export default function add(obj: SPN, interval: Interval): SPN | null {
  const newIntValue = +obj + +interval;
  const chromatic = pitchFromInt(newIntValue);
  const octave = Math.floor(newIntValue / C_NUMBER);

  return fromPitchOctave(chromatic, octave);
}
