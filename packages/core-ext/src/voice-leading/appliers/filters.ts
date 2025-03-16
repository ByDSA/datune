import type { Target } from "../steps/Step";
import { PitchArray, SPNArray, VoicingArray } from "@datune/core";
import { fromPitches } from "@datune/core/voicings/relative/chromatic/building/pitches";
import { findInnerVoicings } from "voicings/findInnerVoicings";
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

export function createDisallowInnerVoicingsFilter(
  ...innerVoicings: VoicingArray
): CombinationApplierFilter {
  return (props) => {
    if (props.nonNullTarget.length === 0)
      return true;

    const pitches = props.nonNullTarget.map(n=>n.pitch) as PitchArray;
    const voicing = fromPitches(...pitches);
    const r = findInnerVoicings(voicing, innerVoicings);

    return r.length === 0;
  };
}
