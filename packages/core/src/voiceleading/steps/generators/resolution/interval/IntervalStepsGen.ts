import { Immutables, NumberArray } from "@datune/utils";
import { SPNArray } from "../../../../../chords";
import { SPN } from "../../../../../pitches";
import { CompositeStep } from "../../../../../voiceleading/steps/composite/CompositeStep";
import { compactStepsArray } from "../../../../../voiceleading/steps/forward/multi/Utils";
import { ChromaticPattern } from "../../../../../voicings/relative/chromatic/ChromaticPattern";
import { SingleStep, SingleStepArray } from "../../../single/SingleStep";
import { Step } from "../../../Step";
import { FilterStepFunction, StepsGeneratorInterface } from "../../StepsGenerator";

export class IntervalStepsGen implements StepsGeneratorInterface {
    private _intervalResolutionsMap = new Map<ChromaticPattern, SingleStep[][]>();
    private _results: IntervalResults | undefined;
    private _notes: SPNArray | undefined;
    private _indexes: NumberArray | undefined;
    private _filterFunction: FilterStepFunction | undefined;

    private constructor() {
    }

    static create(): IntervalStepsGen {
        return new IntervalStepsGen();
    }

    notes(...notes: SPNArray): IntervalStepsGen {
        this._notes = notes;
        return this;
    }

    indexes(...indexes: NumberArray): IntervalStepsGen {
        this._indexes = indexes;
        return this;
    }

    filter(f: FilterStepFunction): IntervalStepsGen {
        this._filterFunction = f;
        return this;
    }

    private _solvePattern(pattern: ChromaticPattern): Step[] {
        let resolutionSteps = this._intervalResolutionsMap.get(pattern)
            || this._getDefaultResolutionsForPattern(pattern);
        resolutionSteps = this._getFixedIndexes(resolutionSteps);
        if (resolutionSteps.length === 0)
            return [];
        return <Step[]>compactStepsArray(<SingleStepArray[]>resolutionSteps);
    }

    private _getDefaultResolutionsForPattern(pattern: ChromaticPattern): SingleStep[][] {
        switch (pattern) {
            case ChromaticPattern.MAJOR_SECOND:
                return [
                    CompositeStep.fromIntervalsKeepZero(-1, 0).singleSteps,
                    CompositeStep.fromIntervalsKeepZero(-2, 0).singleSteps,
                    CompositeStep.fromIntervalsKeepZero(0, 1).singleSteps,
                    CompositeStep.fromIntervalsKeepZero(0, 2).singleSteps,
                ];
            case ChromaticPattern.MAJOR_SECOND.withInv():
                return [
                    CompositeStep.fromIntervalsKeepZero(1, 0).singleSteps,
                    CompositeStep.fromIntervalsKeepZero(2, 0).singleSteps,
                    CompositeStep.fromIntervalsKeepZero(0, -1).singleSteps,
                    CompositeStep.fromIntervalsKeepZero(0, -2).singleSteps,
                ];
            case ChromaticPattern.TRITONE:
                let ret = DEFAULT_TRITONE_RESOLUTION;

                if (this._filterFunction)
                    ret = ret.filter(this._filterFunction);

                return ret;
            case ChromaticPattern.TRIAD_AUGMENTED:
                if (!this._filterFunction)
                    return DEFAULT_AUGMENTED_RESOLUTION;
                else
                    return DEFAULT_AUGMENTED_RESOLUTION.filter(this._filterFunction);
            default: return [];
        }
    }

    private _getFixedIndexes(motions: SingleStep[][]): SingleStep[][] {
        let ret = [];
        for (const m of motions) {
            let ret_m = [];
            for (let i = 0; i < m.length; i++) {
                const sm = m[i];
                const newIndex = (<number[]>this._indexes)[sm.index];
                if (newIndex === undefined)
                    throw new Error(`Invalid newIndex. indexes=${this._indexes} sm.index=${sm.index}`);
                ret_m.push(sm.withIndex(newIndex));
            }
            ret.push(ret_m);
        }

        return ret;
    }

    generateSteps(): Step[] {
        if (!this._notes)
            throw new Error();
        if (!this._indexes)
            this._indexes = <NumberArray>this._notes.map((n, i) => i);

        const firstNote = this._notes[this._indexes[0]];
        let patternInt = <NumberArray>this._indexes.map((index, i, indexes) => {
            const noteIndex = (<SPN[]>this._notes)[index];
            return noteIndex.valueOf() - firstNote.valueOf()
        });

        const pattern = ChromaticPattern.fromRootIntervals(...patternInt);

        this._results = {
            pattern,
            possibilities: this._solvePattern(pattern)
        }

        return this._results.possibilities;
    }

    get results(): IntervalResults | undefined {
        return this._results;
    }
}

const DEFAULT_TRITONE_RESOLUTION = [
    [SingleStep._0_1, SingleStep._1_2],
    [SingleStep._0_1, SingleStep._1_S1],
    [SingleStep._0_1, SingleStep._1_S2],
    [SingleStep._0_2, SingleStep._1_1],
    [SingleStep._0_2, SingleStep._1_S1],
    [SingleStep._0_2, SingleStep._1_S2],
    [SingleStep._0_S1, SingleStep._1_1],
    [SingleStep._0_S1, SingleStep._1_2],
    [SingleStep._0_S1, SingleStep._1_S2],
    [SingleStep._0_S2, SingleStep._1_1],
    [SingleStep._0_S2, SingleStep._1_2],
    [SingleStep._0_S2, SingleStep._1_S1]
];
Immutables.lockr(DEFAULT_TRITONE_RESOLUTION);

const DEFAULT_AUGMENTED_RESOLUTION = [
    [SingleStep._0_1],
    [SingleStep._0_S1],
    [SingleStep._1_1],
    [SingleStep._1_S1],
    [SingleStep._2_1],
    [SingleStep._2_S1],
    [SingleStep._0_1, SingleStep._1_1],
    [SingleStep._1_1, SingleStep._2_1],
    [SingleStep._0_1, SingleStep._2_1],
    [SingleStep._0_S1, SingleStep._1_S1],
    [SingleStep._1_S1, SingleStep._2_S1],
    [SingleStep._0_S1, SingleStep._2_S1],
    [SingleStep._0_1, SingleStep._1_S1],
    [SingleStep._0_S1, SingleStep._1_1],
    [SingleStep._1_1, SingleStep._2_S1],
    [SingleStep._1_S1, SingleStep._2_1],
    [SingleStep._0_1, SingleStep._2_S1],
    [SingleStep._0_S1, SingleStep._2_1],
];
Immutables.lockr(DEFAULT_AUGMENTED_RESOLUTION);

export type IntervalResults = {
    pattern: ChromaticPattern,
    possibilities: Step[]
}