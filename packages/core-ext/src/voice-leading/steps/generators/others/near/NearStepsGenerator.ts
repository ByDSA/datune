import { Arrays } from "@datune/utils";
import { StepCombiner } from "../../../combiner/StepCombiner";
import { compactStepsArray } from "../../../forward/multi/Utils";
import { Array as SingleStepArray, from } from "../../../single";
import { Step, StepOrNull } from "../../../Step";
import { FilterStepFunction, StepsGeneratorInterface } from "../../StepsGenerator";

export class NearStepsGen implements StepsGeneratorInterface {
  private _maxStep: number;

  private _length: number | undefined;

  private _filterFunction: FilterStepFunction | undefined;

  private constructor() {
    this._maxStep = 2;
  }

  static create(): NearStepsGen {
    return new NearStepsGen();
  }

  notesLength(length: number): NearStepsGen {
    this._length = length;

    return this;
  }

  maxStep(n: number): NearStepsGen {
    this._maxStep = n;

    return this;
  }

  generateSteps(): Step[] {
    const combinations = this._calculateCombinations();

    if (combinations.length === 0)
      return [];

    return compactStepsArray(<Arrays.NonEmpty<SingleStepArray>>combinations);
  }

  private _calculateCombinations(): SingleStepArray[] {
    if (!this._length)
      throw new Error();

    const combiner = StepCombiner.create();

    if (this._filterFunction)
      combiner.filter(this._filterFunction);

    for (let index = 0; index < this._length; index++) {
      const singleSteps: Arrays.NonEmpty<StepOrNull> = [null]; // let pivot notes

      for (let j = -this._maxStep; j <= this._maxStep; j++) {
        if (j == 0)
          continue;

        const singleStep = from(index, j);

        singleSteps.push(<Step>singleStep);
      }

      combiner.addGroup(...singleSteps);
    }

    return combiner.calcArrays();
  }

  filter(f: FilterStepFunction): NearStepsGen {
    this._filterFunction = f;

    return this;
  }
}
