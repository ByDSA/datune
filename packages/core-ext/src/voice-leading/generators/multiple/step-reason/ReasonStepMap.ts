import { SingleStep, CompositeStep } from "voice-leading/steps";
import { Step, StepArray } from "../../../steps/Step";
import { StepReasonInfo } from "./StepReasonInfo";

export class StepToReasonMap {
    #map = new Map<Step, StepReasonInfo[]>();

    add(reasonInfo: StepReasonInfo, ...steps: StepArray) {
      for (const step of steps) {
        let result = this.#map.get(step);

        if (!result) {
          result = [];
          this.#map.set(step, result);
        }

        result.push(reasonInfo);
      }
    }

    addMap(mapObj: StepToReasonMap) {
      const newEntries = mapObj.#map.entries();

      for (const [key, value] of newEntries) {
        const result = this.#map.get(key);

        if (result)
          result.push(...value);
        else
          this.#map.set(key, value);
      }
    }

    get(sm: Step): StepReasonInfo[] | null {
      return this.#map.get(sm) ?? null;
    }

    entries() {
      return this.#map.entries();
    }
}

export function getStepReasonsByIndex(steps: Step[], reasonsMap: StepToReasonMap) {
  const reasonsByIndex: Record<number, StepReasonInfo[] | undefined> = {};

  for (const step of steps) {
    const reasons = reasonsMap.get(step);

    if (!reasons)
      continue;

    if (step instanceof SingleStep) {
      reasonsByIndex[step.index] ??= [];

      reasonsByIndex[step.index]?.push(...reasons);
    } else if (step instanceof CompositeStep) {
      for (const singleStep of step.singleSteps) {
        reasonsByIndex[singleStep.index] ??= [];

        reasonsByIndex[singleStep.index]?.push(...reasons);
      }
    }
  }

  return reasonsByIndex;
}
