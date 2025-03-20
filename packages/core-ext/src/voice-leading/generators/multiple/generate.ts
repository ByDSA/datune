import type { StepGroup } from "../StepsGenerator";
import type { StepOrNull } from "../../steps/Step";
import type { StepReasonNearInfo, StepReasonRestNotesInfo, StepReasonVoicingResolutionInfo } from "./step-reason/StepReasonInfo";
import type { StepFilter } from "../processors/filters";
import { Spn, SpnArray } from "@datune/core/spns/chromatic";
import { type CombinerResult, combineStepGroups } from "voice-leading/combiners/combine-groups";
import { SingleStep } from "voice-leading/steps";
import { filterNonNullSteps, type StepArray } from "../../steps/Step";
import { toKeyResolution as generateToKeyResolution, KeyResolutionGeneratorProps } from "../key-resolution/generate";
import { toVoicingResolution as generateToVoicingResolution, VoicingResolutionGeneratorProps } from "../voicing-resolution/generate";
import { toNear as generateToNear, NearGeneratorProps } from "../near/generate";
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
  requireAnyResolution?: boolean;
  near?: Omit<NearGeneratorProps, "arrayLength"> & {
    enabled?: boolean;
  };
  keyResolution?: Omit<KeyResolutionGeneratorProps, "base">;
  voicingResolution?: Omit<VoicingResolutionGeneratorProps, "voicing"> & {
    enabled?: boolean;
  };
};

export const multiple = (base: SpnArray, props?: MultipleGenProps) => {
  ensureSpnArrayIsDefinedAndSorted(base);

  return new MultipleGen(base, props).generate();
};
class MultipleGen {
  #props: MultipleGenProps;

  #base: SpnArray;

  #groupItemToRawsMap: GroupItemToRawsMap;

  #reasonsMap;

  constructor(base: SpnArray, props?: MultipleGenProps) {
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

    if (this.#props.near?.enabled) {
      const partialGroup = this.#genNear();

      if (partialGroup)
        groups.push(partialGroup);
    }

    const resolutionGroups: StepGroup[] = [];

    if (this.#props.voicingResolution?.enabled) {
      const partialGroup = this.#genToVoicingResolution();

      if (partialGroup)
        resolutionGroups.push(partialGroup);
    }

    if (this.#props.keyResolution?.restingPitches) {
      const partialGroup = this.#genToKeyResolution();

      if (partialGroup)
        resolutionGroups.push(partialGroup);
    }

    const resolutionCombinedGroup: StepOrNull[] = compactCombinationsUnsafe(
      combineStepGroups(resolutionGroups).combinations,
    );

    if (resolutionCombinedGroup.length > 0) {
      if (!this.#props.requireAnyResolution
        && groups.length > 0
        && resolutionGroups.length > 1
      )
        resolutionCombinedGroup.push(null);

      groups.push(resolutionCombinedGroup as StepGroup);
    }

    return {
      groups,
      meta: {
        reasonsMap: this.#reasonsMap,
        groupItemToRawsMap: this.#groupItemToRawsMap,
      },
    };
  }

  #genToVoicingResolution(): StepGroup | null {
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

      if (steps.length === 0)
        continue;

      steps.push(null); // Para no obligar a que resuelva todas las tensiones
      groups.push(steps as StepGroup);
      const atomicStepsInResult = filterNonNullSteps(steps);

      if (atomicStepsInResult.length === 0)
        continue;

      this.#reasonsMap.add(reason, ...atomicStepsInResult as StepArray);
    }

    const combinerResult = combineStepGroups(groups);
    const group: StepOrNull[] = compactCombinationsUnsafe(combinerResult.combinations);

    if (group.length === 0)
      return null;

    if (!voicingResolutionProps.required)
      group.push(null);

    return group as StepGroup;
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
    const atomicSteps = filterNonNullSteps(groups.flat());

    if (atomicSteps.length === 0)
      return null;

    for (const s of atomicSteps) {
      const reason: StepReasonNearInfo = {
        reason: StepReason.NEAR,
        interval: (s as SingleStep).interval!,
      };

      this.#reasonsMap.add(reason, s);
    }

    const combinerResult = combineStepGroups(groups);
    const group = compactCombinationsUnsafe(combinerResult.combinations) as StepGroup;

    this.#addToGroupItemToRawsMap(group, combinerResult);

    group.push(null); // Never is required

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

function ensureSpnArrayIsDefinedAndSorted(spnArray: Spn[]) {
  if (!spnArray || spnArray.length === 0)
    throw new Error("No notes");

  spnArray.sort((a, b) => a.valueOf() - b.valueOf());
}

function mergeArrays<T>(...groups: (T[] | undefined)[]): T[] | undefined {
  const result = groups.flatMap(g => g ?? []);

  return result.length ? result : undefined;
}
