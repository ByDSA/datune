import { Interval } from "intervals/alt";
import { Pitches } from "pitches/alt";
import { Pitches as DPitches } from "pitches/diatonic";
import { fromPitchOctave } from "../building";
import SPN from "../SPN";

export default function add(obj: SPN, interval: Interval): SPN | null {
  if (interval == null)
    return null;

  const diatonicAlt = Pitches.add(obj.pitch, interval);
  const diatonicValue = obj.pitch.diatonic.valueOf() + interval.diatonicInterval.valueOf();
  const octaveShift = Math.floor(diatonicValue / DPitches.NUMBER);

  return fromPitchOctave(diatonicAlt, obj.octave + octaveShift);
}
