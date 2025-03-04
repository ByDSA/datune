import type { SPN } from "../SPN";
import type { Interval } from "intervals/alt";
import { Pitches as P } from "pitches/alt";
import { Pitches as DP } from "pitches/diatonic";
import { fromPitchOctave } from "../building";

export function add(obj: SPN, interval: Interval): SPN | null {
  if (interval === null)
    return null;

  const pitch = P.add(obj.pitch, interval);
  const diatonicValue = obj.pitch.diatonic.valueOf() + interval.diatonicInterval.valueOf();
  const octaveShift = Math.floor(diatonicValue / DP.NUMBER);

  return fromPitchOctave(pitch, obj.octave + octaveShift);
}
