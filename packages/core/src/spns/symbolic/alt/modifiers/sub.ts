import type { SPN } from "../SPN";
import type { Interval } from "intervals/alt";
import { Pitches } from "pitches/alt";
import { Pitches as DPitches } from "pitches/diatonic";
import { fromPitchOctave } from "../building";

export function sub(obj: SPN, interval: Interval): SPN | null {
  if (interval === null)
    return null;

  const pitch = Pitches.sub(obj.pitch, interval);
  const diatonicValue = obj.pitch.diatonic.valueOf() - interval.diatonicInterval.valueOf();
  const octaveShift = Math.floor(diatonicValue / DPitches.NUMBER);

  return fromPitchOctave(pitch, obj.octave + octaveShift);
}
