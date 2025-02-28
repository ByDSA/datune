import { Arrays } from "@datune/utils";
import { CompositeStep } from "../composite/CompositeStep";
import { FilterStepFunction } from "../generators/StepsGenerator";
import { from, SingleStep } from "../single";
import { Step, StepOrNull } from "../Step";
import { cartesianProduct } from "./Combiner";

type Combination = Arrays.NonEmpty<StepOrNull>;
export class StepCombiner {
    #stepGroups: Set<StepOrNull>[];

    #filterFunction: FilterStepFunction | undefined;

    #fillZeroIntervals: boolean;

    private constructor() {
      this.#stepGroups = [];

      this.#fillZeroIntervals = false;
    }

    static create(): StepCombiner {
      return new StepCombiner();
    }

    addGroup(...ms: Combination): StepCombiner {
      const group = new Set<Step | null>();

      if (!this.#filterFunction) {
        for (const m of ms)
          group.add(m);
      } else {
        for (const m of ms) {
          if (this.#filterFunction(m))
            group.add(m);
        }
      }

      this.#stepGroups.push(group);

      return this;
    }

    fillZeroIntervals(): StepCombiner {
      this.#fillZeroIntervals = true;

      return this;
    }

    addCombiner(motionCombiner: StepCombiner): StepCombiner {
      let newGroups = motionCombiner.#stepGroups;

      if (!this.#filterFunction) {
        for (const group of newGroups)
          this.#stepGroups.push(group);
      } else {
        for (const group of newGroups) {
          let groupFiltered = new Set<Step | null>();

          for (const s of group) {
            if (this.#filterFunction(s))
              groupFiltered.add(s);
          }

          this.#stepGroups.push(groupFiltered);
        }
      }

      return this;
    }

    calcSets(): Set<SingleStep>[] {
      if (this.#stepGroups.length === 0)
        return [];

      let allCombinations: Combination[] = this.#calcAllCombinations();
      const allExpandedCombinationSets = this.#getExpandedSetsAndRemoveZerosIfNeeded(
        allCombinations,
      );
      const fixed = this.#removeConflictsDuplicatesAndNull(allExpandedCombinationSets);

      return fixed;
    }

    calcArrays(): Arrays.NonEmpty<SingleStep>[] {
      return <Arrays.NonEmpty<SingleStep>[]> this.calcSets().map(s => [...s]);
    }

    #calcAllCombinations() {
      let allCombinations: Combination[];

      if (this.#stepGroups.length > 1) {
        const groups = this.#stepGroups.map(g => [...g]);

        allCombinations = <Combination[]>cartesianProduct(groups).filter(c => c.length > 0);
      } else
        allCombinations = [...this.#stepGroups[0]].map((m: StepOrNull) => [m]);

      return allCombinations;
    }

    #getExpandedSetsAndRemoveZerosIfNeeded(allCombinations: Combination[]): Set<SingleStep>[] {
      const allExpandedCombinationSets: Set<SingleStep>[] = allCombinations.map(c => {
        const acc = new Set<SingleStep>();

        c.forEach(step => {
          if (step === null)
            return;
          else if (step instanceof SingleStep)
            acc.add(step);
          else if (step instanceof CompositeStep) {
            for (const singleStep of step.singleSteps)
              acc.add(singleStep);
          }
        } );

        return acc;
      } );

      return allExpandedCombinationSets;
    }

    #removeConflictsDuplicatesAndNull(
      allExpandedCombinationSets: Set<SingleStep>[],
    ): Set<SingleStep>[] {
      let ret: Set<SingleStep>[];

      if (this.#stepGroups.length > 1) {
        const hashesAddedSets = new Set<string>();

        ret = allExpandedCombinationSets.filter((singleStepSet: Set<SingleStep>) => {
          // Conflicts: differents steps with same index
          let indexes = new Set<number>();

          for (const singleStep of singleStepSet) {
            if (singleStep === null)
              // eslint-disable-next-line no-continue
              continue;

            if (indexes.has(singleStep.index))
              return false;

            indexes.add(singleStep.index);
          }

          // Nulls
          if (indexes.size === 0)
            return false;

          // Fill zeros
          if (this.#fillZeroIntervals) {
            for (let i = 0; i < singleStepSet.size; i++) {
              if (!indexes.has(i))
                singleStepSet.add(from(i, 0));
            }
          }

          // Duplicates
          const hash = singleMotionSetHashFunction(singleStepSet);

          if (hashesAddedSets.has(hash))
            return false;

          hashesAddedSets.add(hash);

          return true;
        } );
      } else {
        ret = allExpandedCombinationSets.filter((singleStepSet: Set<SingleStep>) => {
          if (singleStepSet.size === 0)
            return false;

          return true;
        } );
      }

      return ret;
    }

    filter(f: FilterStepFunction): StepCombiner {
      this.#filterFunction = f;

      return this;
    }
}

function singleMotionSetHashFunction(s: Set<SingleStep>): string {
  let hashArray: string[] = [];

  s.forEach(v => {
    hashArray.push(`${v.index}-${v.interval}|`);
  } );

  return hashArray.sort((a, b) => a.localeCompare(b)).reduce((acc, current) => acc + current);
}
