import type { StepGroup } from "../StepsGenerator";
import { PitchArray } from "@datune/core/pitches/chromatic";
import { SPN, SPNArray } from "@datune/core/spns/chromatic";
import { CombinerResult, combineStepGroups } from "voice-leading/combiners/combine-groups";
import { StepOrNull } from "../../steps/Step";
import { filterNonNullSteps, StepArray } from "../../steps/Step";
import { generate as generateToKeyResolution } from "../key-resolution/generate";
import { generate as generateToVoicingResolution } from "../voicing-resolution/generate";
import { generate as generateToNearest } from "../nearest/generate";
import { voicingFromSpnArray } from "../voicing-resolution/generate";
import { compactCombinationsUnsafe } from "../compact-combinations";
import { StepReason } from "./step-reason/StepReason";
import { StepToReasonMap } from "./step-reason/ReasonStepMap";
import { StepReasonNearInfo, StepReasonRestNotesInfo, StepReasonVoicingResolutionInfo } from "./step-reason/StepReasonInfo";
import { GroupItemToRawsMap } from "./GroupItemToRawMap";

export type MultipleGenResult = {
  groups: StepGroup[];
  meta: {
    reasonsMap: StepToReasonMap;
    groupItemToRawsMap: GroupItemToRawsMap;
  };
};

export type MultipleGenProps = {
  maxInterval?: number;
  nearest?: {
    enabled?: boolean;
    required?: boolean;
  };
  keyResolution?: {
    restingPitches?: PitchArray;
    required?: boolean;
  };
  voicingResolution?: {
    enabled?: boolean;
    required?: boolean;
  };
};

export const generateMultiple = (base: SPNArray, props?: MultipleGenProps) => {
  ensureSpnArrayIsDefinedAndSorted(base);

  return new MultipleGen(base, props).generate();
};
class MultipleGen {
  #props: MultipleGenProps;

  #base: SPNArray;

  #groupItemToRawsMap: GroupItemToRawsMap;

  #reasonsMap;

  constructor(base: SPNArray, props?: MultipleGenProps) {
    this.#props = {
      ...props,
      nearest: {
        ...props?.nearest,
        enabled: props?.nearest?.enabled ?? true,
      },
      voicingResolution: {
        ...props?.voicingResolution,
        enabled: props?.voicingResolution?.enabled ?? true,
      },
    };

    this.#groupItemToRawsMap = new GroupItemToRawsMap();

    this.#reasonsMap = new StepToReasonMap();

    this.#base = base;
  }

  toString() {
    if (!this.#base)
      return null;

    return this.#base.map((n, i) => (i === 0 ? n.toString() : `, ${n.toString()}`)).reduce((acc, current) => acc + current);
  }

  generate(): MultipleGenResult {
    const groups: StepGroup[] = [];

    if (this.#props.voicingResolution?.enabled)
      groups.push(...this.#genToVoicingResolution());

    if (this.#props.keyResolution?.restingPitches) {
      const partialGroup = this.#genToKeyResolution();

      if (partialGroup)
        groups.push(partialGroup);
    }

    if (this.#props.nearest?.enabled) {
      const partialGroup = this.#genNearest();

      if (partialGroup)
        groups.push(partialGroup);
    }

    return {
      groups,
      meta: {
        reasonsMap: this.#reasonsMap,
        groupItemToRawsMap: this.#groupItemToRawsMap,
      },
    };
  }

  #genToVoicingResolution(): StepGroup[] {
    const groups: StepGroup[] = [];
    const gen = generateToVoicingResolution( {
      voicing: voicingFromSpnArray(this.#base),
    } );

    for (const result of gen.meta.results) {
      // eslint-disable-next-line prefer-destructuring
      const steps: StepOrNull[] = result.steps;
      const reason: StepReasonVoicingResolutionInfo = {
        reason: StepReason.RESOLUTION_VOICING,
        innerVoicingResult: result.innerVoicing,
      };

      if (!this.#props.voicingResolution?.required)
        steps.push(null);

      if (steps.length === 0)
        continue;

      groups.push(steps as StepGroup);
      const atomicStepsInResult = filterNonNullSteps(steps);

      if (atomicStepsInResult.length === 0)
        continue;

      this.#reasonsMap.add(reason, ...atomicStepsInResult as StepArray);
    }

    return groups;
  }

  #genToKeyResolution(): StepGroup | null {
    const { groups } = generateToKeyResolution( {
      base: this.#base,
      required: false,
      maxInterval: this.#props.maxInterval,
      restingPitches: this.#props.keyResolution?.restingPitches as PitchArray,
    } );
    const reason: StepReasonRestNotesInfo = {
      reason: StepReason.RESOLUTION_KEY,
    };
    const atomicSteps = filterNonNullSteps(groups.flat());

    if (atomicSteps.length === 0)
      return null;

    this.#reasonsMap.add(reason, ...atomicSteps as StepArray);

    const combinerResult = combineStepGroups(groups);
    const group = compactCombinationsUnsafe(combinerResult.combinations) as StepGroup;

    this.#addToGroupItemToRawsMap(group, combinerResult);

    if (!this.#props.keyResolution?.required)
      group.push(null);

    return group;
  }

  #genNearest() {
    const { groups } = generateToNearest( {
      arrayLength: this.#base.length,
      maxInterval: this.#props.maxInterval,
    } );
    const reason: StepReasonNearInfo = {
      reason: StepReason.NEAR,
    };
    const atomicSteps = filterNonNullSteps(groups.flat());

    if (atomicSteps.length === 0)
      return null;

    this.#reasonsMap.add(reason, ...atomicSteps as StepArray);

    const combinerResult = combineStepGroups(groups);
    const group = compactCombinationsUnsafe(combinerResult.combinations) as StepGroup;

    this.#addToGroupItemToRawsMap(group, combinerResult);

    if (!this.#props.nearest?.required)
      group.push(null);

    return group;
  }

  #addToGroupItemToRawsMap(group: StepGroup, combinerResult: CombinerResult) {
    for (let i = 0; i < group.length; i++) {
      const compactedCombination = group[i];

      if (compactedCombination === null)
        continue;

      const combination = combinerResult.combinations[i];
      const rawCombinations = combinerResult.meta.combinationToRawsMap.get(combination)!;

      for (const rawCombination of rawCombinations)
        this.#groupItemToRawsMap.add(compactedCombination, rawCombination);
    }
  }
}

function ensureSpnArrayIsDefinedAndSorted(spnArray: SPN[]) {
  if (!spnArray || spnArray.length === 0)
    throw new Error("No notes");

  spnArray.sort((a, b) => a.valueOf() - b.valueOf());
}
