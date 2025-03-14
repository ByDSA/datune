import { SPN, SPNArray } from "@datune/core/spns/chromatic";
import { getTargetId, Target } from "../steps/Step";
import { StepCombination } from "../combiners/types";
import { CombinationApplierFilter } from "./filters";

export type CombinationApplierProps = {
  afterFilters?: CombinationApplierFilter[];
};

export function applyCombinations(
  base: SPNArray,
  combinations: StepCombination[],
  props?: CombinationApplierProps,
) {
  const targets: Target[] = [];
  const uniqueTargetIds = new Set<string>();

  for (const combination of combinations) {
    const target = applyCombination(base, combination);
    const targetId = getTargetId(target);

    if (uniqueTargetIds.has(targetId))
      continue;

    uniqueTargetIds.add(targetId);

    if (props?.afterFilters) {
      const nonNullTarget = target.filter((s: SPN | null) => !!s) as SPN[];

      if (props.afterFilters.some(f=>!f( {
        target,
        nonNullTarget,
        base,
      } )))
        continue;
    }

    targets.push(target);
  }

  return targets;
}

type Result = {
  target: Target;
  combination: StepCombination;
};
export function applyCombinationsWithMeta(
  base: SPNArray,
  combinations: StepCombination[],
  settings?: CombinationApplierProps,
) {
  const map = new Map<StepCombination, Target>();
  const results: Result[] = [];

  for (const combination of combinations) {
    const target = applyCombination(base, combination);

    if (settings?.afterFilters) {
      const nonNullTarget = target.filter((s: SPN | null) => !!s) as SPN[];

      if (settings.afterFilters.some(f=>!f( {
        target,
        nonNullTarget,
        base,
      } )))
        continue;
    }

    results.push( {
      target,
      combination,
    } );
    map.set(combination, target);
  }

  return {
    results,
    map,
  };
}

export function applyCombination(base: SPNArray, combination: StepCombination): Target {
  let target: Target = [...base];

  for (const sm of combination)
    sm.applyTo(target);

  return target;
}
