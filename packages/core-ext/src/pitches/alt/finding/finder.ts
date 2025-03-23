import type { Pitch as CPitch } from "@datune/core/pitches/chromatic";
import type { PitchArray as DPitchArray } from "@datune/core/pitches/diatonic";
import { Pitches as P, type Pitch } from "@datune/core/pitches/alt";
import { fromAltPitch } from "@datune/core/pitches/chromatic/building";
import { Pitches as DP } from "@datune/core/pitches/diatonic";

type Props = {
  possibleDPitches: DPitchArray;
  maxFlats: number;
  maxSharps: number;
};
function findByDiatonicsAndAlts( { possibleDPitches, maxFlats, maxSharps }: Props) {
  const ret: Pitch[] = [];

  for (const diatonic of possibleDPitches ?? []) {
    for (let alts = -maxFlats; alts <= maxSharps; alts++) {
      const pitch: Pitch = P.fromDPitchAlts(diatonic, alts);

      ret.push(pitch);
    }
  }

  return ret;
}

type FindCPitchAndAltRangeProps = {
  cPitch?: CPitch;
  possibleDPitches?: DPitchArray;
  maxFlats?: number;
  maxSharps?: number;
};
export function find( { cPitch,
  maxFlats = 2,
  maxSharps = 2,
  possibleDPitches = [...DP.ALL] as DPitchArray }: FindCPitchAndAltRangeProps) {
  if (!cPitch) {
    return findByDiatonicsAndAlts( {
      maxFlats,
      maxSharps,
      possibleDPitches,
    } );
  }

  const ret: Pitch[] = [];

  for (const diatonic of possibleDPitches) {
    for (let alts = -maxFlats; alts <= maxSharps; alts++) {
      const pitch: Pitch = P.fromDPitchAlts(diatonic, alts);

      if (fromAltPitch(pitch) === cPitch)
        ret.push(pitch);
    }
  }

  return ret;
}
