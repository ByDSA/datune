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
}
