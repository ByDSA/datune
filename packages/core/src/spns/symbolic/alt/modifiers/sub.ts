import { fromPitchOctave } from "../building";
import type { SPN } from "../SPN";
import type { Interval } from "intervals/alt";
import { Pitches } from "pitches/alt";
import { Pitches as DPitches } from "pitches/diatonic";

export function sub(obj: SPN, interval: Interval): SPN | null {
  if (interval === null)
    return null;

  const diatonicAlt = Pitches.sub(obj.pitch, interval);
  const diatonicValue = obj.pitch.diatonic.valueOf() - interval.diatonicInterval.valueOf();
  const octaveShift = Math.floor(diatonicValue / DPitches.NUMBER);

  return fromPitchOctave(diatonicAlt, obj.octave + octaveShift);
}
