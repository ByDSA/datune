import type { Step } from "voice-leading/steps/Step";
import type { SingleStep } from "../../steps/single/SingleStep";
import type { StepsGenerator } from "../StepsGenerator";
import { IntervalArray, Voicing, SPNArray, Voicings as V, VoicingArray } from "@datune/core";
import { betweenSPN } from "@datune/core/intervals/symbolic/chromatic/building";
import { compactStepCombinationsUnsafe } from "../compact-combinations";
import { reIndex } from "../../steps/single/modifiers";
import { findInnerVoicings } from "../../../voicings/findInnerVoicings";
import { DEFAULT_AUGMENTED_RESOLUTION, DEFAULT_M2_RESOLUTION, DEFAULT_MINOR7_RESOLUTION, DEFAULT_TRITONE_RESOLUTION } from "./constants";

type Props = {
  voicing: Voicing;
};
type Meta = {
  results: {
    steps: Step[];
    tensionVoicing: Voicing;
  }[];
};
export const generate: StepsGenerator<Props, Meta> = (props) => {
  const obj = new IntervalStepsGen(props);

  return obj.generateSteps();
};
class IntervalStepsGen {
  #map: Map<Voicing, SingleStep[][]>;

  #voicing: Voicing;

  #tensionVoicings: VoicingArray;

  constructor(props: Props) {
    this.#voicing = props.voicing;

    if (!defaultResolutionMap) {
      defaultResolutionMap = new Map([
        [V.M2, DEFAULT_M2_RESOLUTION],
        [V.m7, DEFAULT_MINOR7_RESOLUTION],
        [V.TRITONE, DEFAULT_TRITONE_RESOLUTION],
        [V.TRIAD_AUGMENTED, DEFAULT_AUGMENTED_RESOLUTION],
      ]);
    }

    this.#map = defaultResolutionMap;

    this.#tensionVoicings = Array.from(this.#map.keys()) as VoicingArray;
  }

  #solveTensionVoicing(tensionVoicing: Voicing, indexMapping: number[]): Step[] {
    let resolutionSteps = this.#map.get(tensionVoicing);

    if (!resolutionSteps)
      return [];

    // Mapear de índice de voicing tensión-resolución a índice de voicing original
    resolutionSteps = resolutionSteps
      .map(c=> (c.map((s)=> {
        return reIndex(s, indexMapping[s.index]);
      } )));

    return compactStepCombinationsUnsafe(resolutionSteps);
  }

  generateSteps(): ReturnType<typeof generate> {
    const meta: ReturnType<typeof generate>["meta"] = {
      results: [],
    };
    const steps: ReturnType<typeof generate>["steps"] = [];
    const innerVoicings = findInnerVoicings(this.#voicing, this.#tensionVoicings);

    for (const innerVoicing of innerVoicings) {
      let resolutionTensionVoicingSteps = this.#solveTensionVoicing(
        innerVoicing.innerVoicing,
        innerVoicing.indexMap,
      );

      steps.push(...resolutionTensionVoicingSteps);
      const result: ReturnType<typeof generate>["meta"]["results"][0] = {
        tensionVoicing: innerVoicing.innerVoicing,
        steps: resolutionTensionVoicingSteps,
      };

      meta.results.push(result);
    }

    return {
      meta,
      steps,
    };
  }
}

export function voicingFromSpnArray(spnArray: SPNArray): Voicing {
  const intervals = spnArray.map(
    (s, _, a)=>betweenSPN(a[0], s),
  ) as IntervalArray;

  return V.fromRootIntervals(...intervals);
}

export function voicingFromIndexes(voicing: Voicing, indexes: number[]): Voicing {
  const intervals = indexes.map(
    (i, _, a)=>(+voicing.rootIntervals[i] - +voicing.rootIntervals[a[0]]),
  ) as IntervalArray;

  return V.fromRootIntervals(...intervals);
}

let defaultResolutionMap: Map<Voicing, SingleStep[][]>;
