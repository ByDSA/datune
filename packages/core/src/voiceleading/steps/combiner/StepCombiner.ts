import { NonEmptyArray } from "@datune/utils";
import { CompositeStep } from "../composite/CompositeStep";
import { FilterStepFunction } from "../generators/StepsGenerator";
import { SingleStep } from "../single/SingleStep";
import { Step, StepOrNull } from "../Step";
import { cartesianProduct } from "./Combiner";

type Combination = NonEmptyArray<StepOrNull>;
export class StepCombiner {
    private _stepGroups: Set<StepOrNull>[];
    private _filterFunction: FilterStepFunction | undefined;
    private _fillZeroIntervals: boolean;

    private constructor() {
        this._stepGroups = [];

        this._fillZeroIntervals = false;
    }

    static create(): StepCombiner {
        return new StepCombiner();
    }

    addGroup(...ms: Combination): StepCombiner {
        const group = new Set<Step | null>();

        if (!this._filterFunction) {
            for (const m of ms)
                group.add(m);
        } else {
            for (const m of ms)
                if (this._filterFunction(m))
                    group.add(m);
        }

        this._stepGroups.push(group);

        return this;
    }

    fillZeroIntervals(): StepCombiner {
        this._fillZeroIntervals = true;

        return this;
    }

    addCombiner(motionCombiner: StepCombiner): StepCombiner {
        let newGroups = motionCombiner._stepGroups;
        if (!this._filterFunction)
            for (const group of newGroups) {
                this._stepGroups.push(group);
            }
        else
            for (const group of newGroups) {
                let groupFiltered = new Set<Step | null>();
                for (const s of group)
                    if (this._filterFunction(s))
                        groupFiltered.add(s);
                this._stepGroups.push(groupFiltered);
            }

        return this;
    }

    calcSets(): Set<SingleStep>[] {
        if (this._stepGroups.length == 0)
            return [];
        let allCombinations: Combination[] = this._calcAllCombinations();
        const allExpandedCombinationSets = this._getExpandedSetsAndRemoveZerosIfNeeded(allCombinations);
        const fixed = this._removeConflictsDuplicatesAndNull(allExpandedCombinationSets);

        return fixed;
    }

    calcArrays(): NonEmptyArray<SingleStep>[] {
        return <NonEmptyArray<SingleStep>[]>this.calcSets().map(s => [...s]);
    }

    private _calcAllCombinations() {
        let allCombinations: Combination[];
        if (this._stepGroups.length > 1) {
            const groups = this._stepGroups.map(g => [...g]);
            allCombinations = <Combination[]>cartesianProduct(groups).filter(c => c.length > 0);
        } else
            allCombinations = [...this._stepGroups[0]].map((m: StepOrNull) => [m]);
        return allCombinations;
    }

    private _getExpandedSetsAndRemoveZerosIfNeeded(allCombinations: Combination[]): Set<SingleStep>[] {
        const allExpandedCombinationSets: Set<SingleStep>[] = allCombinations.map(c => {
            const acc = new Set<SingleStep>();
            c.forEach(step => {
                if (step == null)
                    return;
                else if (step instanceof SingleStep)
                    acc.add(step);
                else if (step instanceof CompositeStep)
                    for (const singleStep of step.singleSteps)
                        acc.add(singleStep);
            })

            return acc;
        });

        return allExpandedCombinationSets;
    }

    private _removeConflictsDuplicatesAndNull(allExpandedCombinationSets: Set<SingleStep>[]): Set<SingleStep>[] {
        let ret: Set<SingleStep>[];
        if (this._stepGroups.length > 1) {
            const hashesAddedSets = new Set<string>();
            ret = allExpandedCombinationSets.filter((singleStepSet: Set<SingleStep>) => {
                // Conflicts: differents steps with same index
                let indexes = new Set<number>();
                for (const singleStep of singleStepSet) {
                    if (singleStep == null)
                        continue;
                    if (indexes.has(singleStep.index))
                        return false;
                    indexes.add(singleStep.index);
                }

                // Nulls
                if (indexes.size == 0)
                    return false;

                // Fill zeros
                if (this._fillZeroIntervals)
                    for (let i = 0; i < singleStepSet.size; i++)
                        if (!indexes.has(i))
                            singleStepSet.add(SingleStep.from(i, 0));

                // Duplicates
                const hash = singleMotionSetHashFunction(singleStepSet);
                if (hashesAddedSets.has(hash))
                    return false;
                hashesAddedSets.add(hash)

                return true;
            });
        } else
            ret = allExpandedCombinationSets.filter((singleStepSet: Set<SingleStep>) => {
                if (singleStepSet.size == 0)
                    return false;
                return true;
            });

        return ret;
    }

    filter(f: FilterStepFunction): StepCombiner {
        this._filterFunction = f;

        return this;
    }
}

function singleMotionSetHashFunction(s: Set<SingleStep>): string {
    let hashArray: string[] = [];
    s.forEach(v => {
        hashArray.push(`${v.index}-${v.interval}|`);
    })

    return hashArray.sort((a, b) => a.localeCompare(b)).reduce((acc, current) => acc + current);
}