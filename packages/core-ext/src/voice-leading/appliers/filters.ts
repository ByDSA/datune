import { KeyArray, PitchArray, SPNArray, VoicingArray } from "@datune/core";
import { Target } from "../steps/Step";
import { voicingFromSpnArray } from "../generators/voicing-resolution/generate";

type CombinationApplierFilterProps = {
  base: SPNArray;
  target: Target;
  nonNullTarget: NonNullable<Target[0]>[];
};
export type CombinationApplierFilter = (props: CombinationApplierFilterProps)=> boolean;

export function createHasSomeVoicingFilter(...voicings: VoicingArray): CombinationApplierFilter {
  return ( { nonNullTarget } ) => {
    if (nonNullTarget.length === 0)
      return false;

    const voicing = voicingFromSpnArray(nonNullTarget as SPNArray);

    return voicings.includes(voicing);
  };
}

export function createAllPitchesInSomeKeyFilter(...keys: KeyArray): CombinationApplierFilter {
  return ( { nonNullTarget } ) => {
    if (nonNullTarget.length === 0)
      return false;

    return keys.some(k => {
      return k.hasPitches(...nonNullTarget.map((s) => s.pitch) as PitchArray);
    } );
  };
}

export function createAllPitchesInEveryKeyFilter(...keys: KeyArray): CombinationApplierFilter {
  return ( { nonNullTarget } ) => {
    if (nonNullTarget.length === 0)
      return false;

    return keys.every(k => {
      return k.hasPitches(...nonNullTarget.map((s) => s.pitch) as PitchArray);
    } );
  };
}
