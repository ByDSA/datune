import { Spn, SpnArray } from "@datune/core/spns/chromatic";
import { Target, targetGetId } from "voice-leading/steps/Target";
import { Combination } from "../combiners/types";
import { CombinationApplierFilter } from "./processors/filters";

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
  base: SpnArray,
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
      const nonNullTarget = target.filter((s: Spn | null) => !!s) as Spn[];

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
  base: SpnArray,
  combinations: Combination[],
  settings?: CombinationApplierProps,
) {
  const map = new Map<Combination, Target>();
  const results: Result[] = [];

  for (const combination of combinations) {
    const target = applyCombination(base, combination);

    if (settings?.afterFilters) {
      const nonNullTarget = target.filter((s: Spn | null) => !!s) as Spn[];

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

export function applyCombination(base: SpnArray, combination: Combination): Target {
  let target: Target = [...base];

  for (const sm of combination)
    sm.applyTo(target);

  return target;
}
