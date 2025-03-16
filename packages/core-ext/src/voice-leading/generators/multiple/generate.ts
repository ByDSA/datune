import type { StepGroup } from "../StepsGenerator";
import type { StepOrNull } from "../../steps/Step";
import type { StepReasonNearInfo, StepReasonRestNotesInfo, StepReasonVoicingResolutionInfo } from "./step-reason/StepReasonInfo";
import type { StepFilter } from "../filters";
import { SPN, SPNArray } from "@datune/core/spns/chromatic";
import { type CombinerResult, combineStepGroups } from "voice-leading/combiners/combine-groups";
import { filterNonNullSteps, type StepArray } from "../../steps/Step";
import { generate as generateToKeyResolution, KeyResolutionGeneratorProps } from "../key-resolution/generate";
import { generate as generateToVoicingResolution, VoicingResolutionGeneratorProps } from "../voicing-resolution/generate";
import { generate as generateToNear, NearGeneratorProps } from "../near/generate";
import { voicingFromSpnArray } from "../voicing-resolution/generate";
import { compactCombinationsUnsafe } from "../compact-combinations";
import { StepReason } from "./step-reason/StepReason";
import { StepToReasonMap } from "./step-reason/ReasonStepMap";
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
  filters?: StepFilter[];
  near?: Omit<NearGeneratorProps, "arrayLength"> & {
    enabled?: boolean;
    required?: boolean;
  };
  keyResolution?: Omit<KeyResolutionGeneratorProps, "base">;
  voicingResolution?: Omit<VoicingResolutionGeneratorProps, "voicing"> & {
    enabled?: boolean;
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
    const voicingResolutionEnabled = props?.voicingResolution?.enabled ?? true;
    const nearEnabled = props?.near?.enabled ?? true;

    this.#props = {
      ...props,
      near: nearEnabled
        ? {
          ...props?.near,
          filters: mergeArrays(props?.filters, props?.near?.filters),
          enabled: nearEnabled,
        }
        : undefined,
      voicingResolution: voicingResolutionEnabled
        ? {
          ...props?.voicingResolution,
          filters: mergeArrays(props?.filters, props?.voicingResolution?.filters),
          enabled: voicingResolutionEnabled,
        }
        : undefined,
      keyResolution: props?.keyResolution?.restingPitches
        ? {
          ...props?.keyResolution,
          filters: mergeArrays(props?.filters, props?.keyResolution?.filters),
        }
        : undefined,
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

    if (this.#props.near?.enabled) {
      const partialGroup = this.#genNear();

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
    const { enabled: _, ...voicingResolutionProps } = this.#props.voicingResolution!;
    const groups: StepGroup[] = [];
    const gen = generateToVoicingResolution( {
      ...voicingResolutionProps,
      voicing: voicingFromSpnArray(this.#base),
    } );

    for (const result of gen.meta.results) {
      // eslint-disable-next-line prefer-destructuring
      const steps: StepOrNull[] = result.steps;
      const reason: StepReasonVoicingResolutionInfo = {
        reason: StepReason.RESOLUTION_VOICING,
        innerVoicingResult: result.innerVoicing,
      };

      if (!voicingResolutionProps.required)
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
    const { required: _, ...keyResolutionProps } = this.#props.keyResolution!;
    const { groups } = generateToKeyResolution( {
      base: this.#base,
      maxInterval: this.#props.maxInterval,
      ...keyResolutionProps,
      required: false,
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

  #genNear() {
    const { enabled: _, ...nearProps } = this.#props.near!;
    const { groups } = generateToNear( {
      arrayLength: this.#base.length,
      maxInterval: this.#props.maxInterval,
      ...nearProps,
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

    if (!nearProps.required)
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

function mergeArrays<T>(...groups: (T[] | undefined)[]): T[] | undefined {
  const result = groups.flatMap(g => g ?? []);

  return result.length ? result : undefined;
}
