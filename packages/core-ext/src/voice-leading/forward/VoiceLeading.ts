import type { SPNArray } from "@datune/core/spns/chromatic";
import type { StepGroup } from "../generators/StepsGenerator";
import { voiceCrossingFilter, voiceOverlappingFilter } from "../appliers/voices-interaction-filters";
import { Combination } from "../combiners/types";
import { CombinationApplierFilter } from "../appliers/filters";
import { generateMultiple, MultipleGenProps } from "../generators/multiple/generate";
import { applyCombinations, CombinationApplierProps } from "../appliers/combination-appliers";
import { combineStepGroups, StepCombinerProps } from "../combiners/combine-groups";
import { effectiveStepsFilter } from "../combiners/filters";
import { VoiceLeadingResult } from "./Result";

type CombinationApplierConfig = CombinationApplierProps & {
  voiceOverlapping?: boolean;
  voiceCrossing?: boolean;
};
type MultipleGenConfig = MultipleGenProps;
type StepCombinerConfig = StepCombinerProps;
type Props = {
  stepCombinerConfig?: StepCombinerConfig;
  multipleGenConfig?: MultipleGenConfig;
  combinationApplierConfig?: CombinationApplierConfig;
};
export function generateVoiceLeading(initialSpnArray: SPNArray, props?: Props) {
  return new VoiceLeading(initialSpnArray, props).generate();
}
class VoiceLeading {
  #base: SPNArray;

  #stepCombinerConfig?: StepCombinerConfig;

  #combinationApplierConfig?: CombinationApplierConfig;

  #multipleGenConfig?: MultipleGenConfig;

  constructor(base: SPNArray, props?: Props) {
    this.#base = base,

    this.#stepCombinerConfig = props?.stepCombinerConfig,

    this.#multipleGenConfig = props?.multipleGenConfig;

    this.#combinationApplierConfig = props?.combinationApplierConfig;
  }

  generate(): VoiceLeadingResult {
    const multipleGenResult = generateMultiple(this.#base, this.#multipleGenConfig);
    const combinerResult = this.#combineGroups(multipleGenResult.groups);
    const applyCombinationsResult = this.#applyCombinations(combinerResult.combinations);
    const { targets, ...applyCombinationsResultRest } = applyCombinationsResult;

    return {
      targets,
      meta: {
        multipleGenResult,
        combinerResult,
        applyCombinationsMeta: applyCombinationsResultRest.meta,
      },
    };
  }

  #combineGroups(groups: StepGroup[]) {
    const afterFilters = [effectiveStepsFilter];

    if (this.#stepCombinerConfig?.afterFilters)
      afterFilters.push(...this.#stepCombinerConfig.afterFilters);

    return combineStepGroups(groups, {
      ...this.#stepCombinerConfig,
      afterFilters,
    } );
  }

  #applyCombinations(combinations: Combination[]) {
    const afterFilters: CombinationApplierFilter[] = [];

    if (!this.#combinationApplierConfig?.voiceCrossing)
      afterFilters.push(voiceCrossingFilter);

    if (!this.#combinationApplierConfig?.voiceOverlapping)
      afterFilters.push(voiceOverlappingFilter);

    if (this.#combinationApplierConfig?.afterFilters)
      afterFilters.push(...this.#combinationApplierConfig.afterFilters);

    return applyCombinations(this.#base, combinations, {
      afterFilters,
    } );
  }
}
