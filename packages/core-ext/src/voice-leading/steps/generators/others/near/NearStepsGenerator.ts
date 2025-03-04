import type { Arrays } from "@datune/utils";
import { StepCombiner } from "../../../combiner/StepCombiner";
import { compactStepsArray } from "../../../forward/multi/Utils";
import { Array as SingleStepArray, from } from "../../../single";
import { Step, StepOrNull } from "../../../Step";
import { FilterStepFunction, StepsGeneratorInterface } from "../../StepsGenerator";

export class NearStepsGen implements StepsGeneratorInterface {
  #maxStep: number;

  #length: number | undefined;

  #filterFunction: FilterStepFunction | undefined;

  private constructor() {
    this.#maxStep = 2;
  }

  static create(): NearStepsGen {
    return new NearStepsGen();
  }

  notesLength(length: number): NearStepsGen {
    this.#length = length;

    return this;
  }

  maxStep(n: number): NearStepsGen {
    this.#maxStep = n;

    return this;
  }

  generateSteps(): Step[] {
    const combinations = this.#calculateCombinations();

    if (combinations.length === 0)
      return [];

    return compactStepsArray(<Arrays.NonEmpty<SingleStepArray>>combinations);
  }

  #calculateCombinations(): SingleStepArray[] {
    if (!this.#length)
      throw new Error();

    const combiner = StepCombiner.create();

    if (this.#filterFunction)
      combiner.filter(this.#filterFunction);

    for (let index = 0; index < this.#length; index++) {
      const singleSteps: Arrays.NonEmpty<StepOrNull> = [null]; // let pivot notes

      for (let j = -this.#maxStep; j <= this.#maxStep; j++) {
        if (j === 0)
          // eslint-disable-next-line no-continue
          continue;

        const singleStep = from(index, j);

        singleSteps.push(<Step>singleStep);
      }

      combiner.addGroup(...singleSteps);
    }

    return combiner.calcArrays();
  }

  filter(f: FilterStepFunction): NearStepsGen {
    this.#filterFunction = f;

    return this;
  }
}
