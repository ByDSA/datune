import { PitchArray } from "@datune/core/pitches/chromatic";
import { SPN, SPNArray } from "@datune/core/spns/chromatic";
import { StepGroup } from "../../combiners/types";
import { StepOrNull } from "../../steps/Step";
import { filterNonNullSteps, StepArray } from "../../steps/Step";
import { generate as generateToKeyResolution } from "../key-resolution/generate";
import { generate as generateToVoicingResolution } from "../voicing-resolution/generate";
import { generate as generateToNearest } from "../nearest/generate";
import { voicingFromSpnArray } from "../voicing-resolution/generate";
import { StepReason } from "./step-reason/StepReason";
import { StepToReasonMap } from "./step-reason/ReasonStepMap";
import { StepReasonNearInfo, StepReasonRestNotesInfo, StepReasonVoicingResolutionInfo } from "./step-reason/StepReasonInfo";

export type MultipleGenResult = {
  groups: StepGroup[];
  reasonsMap: StepToReasonMap;
};

export type MultipleGenProps = {
  maxDistance?: number;
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

    this.#base = base;
  }

  toString() {
    if (!this.#base)
      return null;

    return this.#base.map((n, i) => (i === 0 ? n.toString() : `, ${n.toString()}`)).reduce((acc, current) => acc + current);
  }

  generate(): MultipleGenResult {
    const reasonsMap = new StepToReasonMap();
    const groups: StepGroup[] = [];

    if (this.#props.voicingResolution?.enabled) {
      groups.push(...this.#genToVoicingResolution(
        reasonsMap,
        !!this.#props.voicingResolution?.required,
      ));
    }

    if (this.#props.keyResolution?.restingPitches)
      groups.push(this.#genToKeyResolution(reasonsMap, !!this.#props.keyResolution.required));

    if (this.#props.nearest?.enabled)
      groups.push(this.#genNearest(reasonsMap, !!this.#props.nearest.required));

    return {
      groups,
      reasonsMap,
    };
  }

  #genToVoicingResolution(reasonsMap: StepToReasonMap, required: boolean): StepGroup[] {
    const groups: StepGroup[] = [];
    const gen = generateToVoicingResolution( {
      voicing: voicingFromSpnArray(this.#base),
    } );

    for (const result of gen.meta.results) {
      // eslint-disable-next-line prefer-destructuring
      const steps: StepOrNull[] = result.steps;
      const reason: StepReasonVoicingResolutionInfo = {
        reason: StepReason.RESOLUTION_VOICING,
        tensionVoicing: result.tensionVoicing,
      };

      if (!required)
        steps.push(null);

      if (steps.length === 0)
        continue;

      groups.push(steps);
      const validSteps = filterNonNullSteps(steps);

      if (validSteps.length > 0)
        reasonsMap.add(reason, ...validSteps as StepArray);
    }

    return groups;
  }

  #genToKeyResolution(reasonsMap: StepToReasonMap, required: boolean): StepGroup {
    // eslint-disable-next-line prefer-destructuring
    const steps: StepOrNull[] = generateToKeyResolution( {
      base: this.#base,
      maxInterval: this.#props.maxDistance,
      restingPitches: this.#props.keyResolution?.restingPitches as PitchArray,
    } ).steps;
    const reason: StepReasonRestNotesInfo = {
      reason: StepReason.RESOLUTION_KEY,
    };

    if (!required)
      steps.push(null);

    if (steps.length === 0)
      return [];

    const group = steps;
    const validSteps = filterNonNullSteps(steps);

    if (validSteps.length > 0)
      reasonsMap.add(reason, ...validSteps as StepArray);

    return group;
  }

  #genNearest(reasonsMap: StepToReasonMap, required: boolean): StepGroup {
    // eslint-disable-next-line prefer-destructuring
    const steps: StepOrNull[] = generateToNearest( {
      arrayLength: this.#base.length,
      maxInterval: this.#props.maxDistance,
    } ).steps;
    const reason: StepReasonNearInfo = {
      reason: StepReason.NEAR,
    };

    if (!required)
      steps.push(null);

    if (steps.length === 0)
      return [];

    const group = steps;
    const validSteps = filterNonNullSteps(steps);

    if (validSteps.length > 0)
      reasonsMap.add(reason, ...<StepArray>validSteps);

    return group;
  }
}

function ensureSpnArrayIsDefinedAndSorted(spnArray: SPN[]) {
  if (!spnArray || spnArray.length === 0)
    throw new Error("No notes");

  spnArray.sort((a, b) => a.valueOf() - b.valueOf());
}
