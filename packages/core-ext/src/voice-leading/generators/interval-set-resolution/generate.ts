import type { Step, StepArray } from "voice-leading/steps/Step";
import type { StepsGenerator } from "../StepsGenerator";
import type { StepFilter } from "../processors/filters";
import { IntervalArray, IntervalSet, SpnArray, IntervalSets as IS, IntervalSetArray } from "@datune/core";
import { betweenSpn } from "@datune/core/intervals/symbolic/chromatic/building";
import { SingleStepArray } from "voice-leading/steps";
import { compactCombinationsUnsafe } from "../compact-combinations";
import { singleStepReIndex } from "../../steps/single/modifiers";
import { findInnerIntervalSets, InnerIntervalSetResult } from "../../../interval-sets/findInnerIntervalSets";
import { DEFAULT_AUGMENTED_RESOLUTION, DEFAULT_M2_RESOLUTION, DEFAULT_MINOR7_RESOLUTION, DEFAULT_TRITONE_RESOLUTION, ResolutionSteps } from "./constants";

export type IntervalSetResolutionGeneratorProps = {
  intervalSet: IntervalSet;
  required?: boolean;
  filters?: StepFilter[];
};
type Meta = {
  results: {
    steps: Step[];
    innerIntervalSet: InnerIntervalSetResult;
  }[];
};
export const toIntervalSetResolution: StepsGenerator<
  IntervalSetResolutionGeneratorProps,
  Meta
> = (props) => {
  const obj = new IntervalStepsGen(props);

  return obj.generateGroups();
};

class IntervalStepsGen {
  #map: Map<IntervalSet, ResolutionSteps>;

  #intervalSet: IntervalSet;

  #tensionIntervalSets: IntervalSetArray;

  #filters?: StepFilter[];

  constructor(props: IntervalSetResolutionGeneratorProps) {
    this.#intervalSet = props.intervalSet;

    this.#filters = props.filters;

    if (!defaultResolutionMap) {
      defaultResolutionMap = new Map<IntervalSet, ResolutionSteps>([
        [IS.M2, DEFAULT_M2_RESOLUTION],
        [IS.m7, DEFAULT_MINOR7_RESOLUTION],
        [IS.TRITONE, DEFAULT_TRITONE_RESOLUTION],
        [IS.TRIAD_AUGMENTED, DEFAULT_AUGMENTED_RESOLUTION],
      ]);
    }

    this.#map = defaultResolutionMap;

    this.#tensionIntervalSets = Array.from(this.#map.keys()) as IntervalSetArray;
  }

  #solveTensionIntervalSet(
    tensionIntervalSet: IntervalSet,
    indexMapping: number[],
  ): SingleStepArray[] {
    let resolutionSteps: ResolutionSteps | undefined = this.#map.get(tensionIntervalSet);

    if (!resolutionSteps)
      return [];

    // Mapear de índice de intervalSet tensión-resolución a índice de intervalSet original
    resolutionSteps = resolutionSteps
      .map(c=> (c.map((s)=> {
        return singleStepReIndex(s, indexMapping[s.index]);
      } ))) as ResolutionSteps;

    return resolutionSteps;
  }

  #shouldAdd(atomicResolution: Step): boolean {
    for (const f of this.#filters!) {
      if (!f(atomicResolution))
        return false;
    }

    return true;
  }

  generateGroups(): ReturnType<typeof toIntervalSetResolution> {
    const meta: ReturnType<typeof toIntervalSetResolution>["meta"] = {
      results: [],
    };
    const groups: ReturnType<typeof toIntervalSetResolution>["groups"] = [];
    const innerIntervalSets = findInnerIntervalSets(this.#intervalSet, this.#tensionIntervalSets);

    for (const innerIntervalSet of innerIntervalSets) {
      let resolutionTensionIntervalSetSubatomicSteps = this.#solveTensionIntervalSet(
        innerIntervalSet.innerIntervalSet,
        innerIntervalSet.indexMap,
      );

      if (resolutionTensionIntervalSetSubatomicSteps.length === 0)
        continue;

      const resolutionTensionIntervalSetAtomicSteps = compactCombinationsUnsafe(
        resolutionTensionIntervalSetSubatomicSteps,
      ) as StepArray;

      if (this.#filters) {
        for (let i = 0; i < resolutionTensionIntervalSetAtomicSteps.length; i++) {
          const atomicResolution = resolutionTensionIntervalSetAtomicSteps[i];

          if (!this.#shouldAdd(atomicResolution)) {
            resolutionTensionIntervalSetAtomicSteps.splice(i, 1);
            i--;
          }
        }
      }

      if (resolutionTensionIntervalSetAtomicSteps.length === 0)
        continue;

      groups.push(resolutionTensionIntervalSetAtomicSteps);
      const result: ReturnType<typeof toIntervalSetResolution>["meta"]["results"][0] = {
        innerIntervalSet: innerIntervalSet,
        steps: resolutionTensionIntervalSetAtomicSteps,
      };

      meta.results.push(result);
    }

    return {
      meta,
      groups,
    };
  }
}

export function intervalSetFromSpnArray(spnArray: SpnArray): IntervalSet {
  const intervals = spnArray.map(
    (s, _, a)=>betweenSpn(a[0], s),
  ) as IntervalArray;

  return IS.fromRootIntervals(...intervals);
}

export function intervalSetFromIndexes(intervalSet: IntervalSet, indexes: number[]): IntervalSet {
  const intervals = indexes.map(
    (i, _, a)=>(+intervalSet.rootIntervals[i] - +intervalSet.rootIntervals[a[0]]),
  ) as IntervalArray;

  return IS.fromRootIntervals(...intervals);
}

let defaultResolutionMap: Map<IntervalSet, ResolutionSteps>;
