import { NonEmptyArray } from "@datune/utils";
import { StepCombiner } from "../../../../../voiceleading/steps/combiner/StepCombiner";
import { compactStepsArray } from "../../../../../voiceleading/steps/forward/multi/Utils";
import { Step, StepOrNull } from "../../../../../voiceleading/steps/Step";
import { SingleStep, SingleStepArray } from "../../../single/SingleStep";
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
        let combinations = this._calculateCombinations();
        if (combinations.length === 0)
            return [];

        return compactStepsArray(<NonEmptyArray<SingleStepArray>>combinations);
    }

    private _calculateCombinations(): SingleStepArray[] {
        if (!this._length)
            throw new Error();
        let combiner = StepCombiner.create();
        if (this._filterFunction)
            combiner.filter(this._filterFunction);
        for (let index = 0; index < this._length; index++) {
            let singleSteps: NonEmptyArray<StepOrNull> = [null]; // let pivot notes
            for (let j = -this._maxStep; j <= this._maxStep; j++) {
                if (j == 0)
                    continue;

                let singleStep = SingleStep.from(index, j);
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