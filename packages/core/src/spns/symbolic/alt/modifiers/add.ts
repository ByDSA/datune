import { Interval } from "intervals/alt";
import { add as pitchAdd } from "pitches/alt";
import { NUMBER as D_NUMBER } from "pitches/diatonic";
import { fromPitchOctave } from "../building";
import SPN from "../SPN";

export default function add(obj: SPN, interval: Interval): SPN | null {
  if (interval == null)
    return null;

  const diatonicAlt = pitchAdd(obj.pitch, interval);
  const diatonicValue = obj.pitch.diatonic.valueOf() + interval.diatonicInterval.valueOf();
  const octaveShift = Math.floor(diatonicValue / D_NUMBER);

  return fromPitchOctave(diatonicAlt, obj.octave + octaveShift);
}
