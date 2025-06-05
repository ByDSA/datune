import type { Spn } from "../Spn";
import type { Interval } from "intervals/alt";
import { Pitches as P } from "pitches/alt";
import { Pitches as DP } from "pitches/diatonic";
import { fromPitchOctave } from "../building";

export function shift(obj: Spn, interval: Interval): Spn | null {
  if (interval === null)
    return null;

  const pitch = P.shift(obj.pitch, interval);
  const diatonicValue = obj.pitch.diatonic.valueOf() + interval.diatonicInterval.valueOf();
  const octaveShift = Math.floor(diatonicValue / DP.NUMBER);

  return fromPitchOctave(pitch, obj.octave + octaveShift);
}
