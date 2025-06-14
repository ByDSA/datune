import type { Target } from "voice-leading/steps/Target";
import { PitchArray, SpnArray, IntervalSetArray } from "@datune/core";
import { fromPitches } from "@datune/core/sets/interval-sets/chromatic/building/pitches";
import { findInnerIntervalSets } from "interval-sets/findInnerIntervalSets";
import { intervalSetFromSpnArray } from "../../generators/interval-set-resolution/generate";

type CombinationApplierFilterProps = {
  base: SpnArray;
  target: Target;
  nonNullTarget: NonNullable<Target[0]>[];
};
export type CombinationApplierFilter = (props: CombinationApplierFilterProps)=> boolean;

export function createHasSomeIntervalSetFilter(
  ...intervalSets: IntervalSetArray
): CombinationApplierFilter {
  return ( { nonNullTarget } ) => {
    if (nonNullTarget.length === 0)
      return false;

    const intervalSet = intervalSetFromSpnArray(nonNullTarget as SpnArray);

    return intervalSets.includes(intervalSet);
  };
}

export function createDisallowInnerIntervalSetsFilter(
  ...innerIntervalSets: IntervalSetArray
): CombinationApplierFilter {
  return (props) => {
    if (props.nonNullTarget.length === 0)
      return true;

    const pitches = props.nonNullTarget.map(n=>n.pitch) as PitchArray;
    const intervalSet = fromPitches(...pitches);
    const r = findInnerIntervalSets(intervalSet, innerIntervalSets);

    return r.length === 0;
  };
}
