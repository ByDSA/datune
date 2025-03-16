import { SPN, SPNArray } from "@datune/core/spns/chromatic";
import { targetGetId, Target } from "../steps/Step";
import { Combination } from "../combiners/types";
import { CombinationApplierFilter } from "./filters";

export type CombinationApplierProps = {
  afterFilters?: CombinationApplierFilter[];
};

export type ApplyCombinationsResult = {
  targets: Target[];
  meta: {
    reverseMap: Map<Target, Combination>;
  };
};

export function applyCombinations(
  base: SPNArray,
  combinations: Combination[],
  props?: CombinationApplierProps,
): ApplyCombinationsResult {
  const targets: Target[] = [];
  const uniqueTargetIds = new Set<string>();
  const reverseMap = new Map<Target, Combination>();

  for (const combination of combinations) {
    const target = applyCombination(base, combination);
    const targetId = targetGetId(target);

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

    reverseMap.set(target, combination);
    targets.push(target);
  }

  return {
    targets,
    meta: {
      reverseMap,
    },
  };
}

type Result = {
  target: Target;
  combination: Combination;
};
export function applyCombinationsWithMeta(
  base: SPNArray,
  combinations: Combination[],
  settings?: CombinationApplierProps,
) {
  const map = new Map<Combination, Target>();
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

export function applyCombination(base: SPNArray, combination: Combination): Target {
  let target: Target = [...base];

  for (const sm of combination)
    sm.applyTo(target);

  return target;
}
