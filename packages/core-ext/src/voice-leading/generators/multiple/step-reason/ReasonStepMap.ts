import { CompositeStep } from "../../../steps/composite/CompositeStep";
import { SingleStep } from "../../../steps/single/SingleStep";
import { StepArray } from "../../../steps/Step";
import { SingleStepReasonInfo } from "./SingleStepReasonInfo";

export class SingleStepsToReasonMap {
    #map = new Map<SingleStep, SingleStepReasonInfo[]>();

    add(reasonInfo: SingleStepReasonInfo, ...steps: StepArray) {
      for (const step of steps) {
        if (step instanceof SingleStep)
          this.#addSingleStep(reasonInfo, step);
        else if (step instanceof CompositeStep) {
          for (const singleSteps of step.singleSteps)
            this.add(reasonInfo, singleSteps);
        }
      }
    }

    #addSingleStep(reasonInfo: SingleStepReasonInfo, singleStep: SingleStep) {
      let result = this.#map.get(singleStep) ?? [];

      this.#map.set(singleStep, result);
      result.push(reasonInfo);
    }

    addMap(mapObj: SingleStepsToReasonMap) {
      const newEntries = mapObj.#map.entries();

      for (const [key, value] of newEntries) {
        const result = this.#map.get(key);

        if (result)
          result.push(...value);
        else
          this.#map.set(key, value);
      }
    }

    get(sm: SingleStep): SingleStepReasonInfo[] | null {
      return this.#map.get(sm) ?? null;
    }
}
