import type { Combination, RawCombination } from "./types";
import type { StepCombinerTransform } from "./transforms";
import type { StepGroup } from "voice-leading/generators/StepsGenerator";
import { getCartesianProduct } from "@datune/utils/math";
import { SingleStep } from "voice-leading/steps";
import { flattenStep } from "voice-leading/steps/flattenSteps";
import { StepCombinerFilter } from "./filters";
import { CombinationToRawsMap } from "./CombinationsToRawMap";

export type StepCombinerProps = {
  // Transforms y Filters se usan para iterar una única vez el resultado
  afterFilters?: StepCombinerFilter[];
  // afterTransforms: se ejecuta antes de comprobar duplicados y después de los afterFilters
  afterTransforms?: StepCombinerTransform[];
};

export type CombinerResult = {
  combinations: Combination[];
  meta: {
    combinationToRawsMap: CombinationToRawsMap;
  };
};

export function combineStepGroups(groups: StepGroup[], props?: StepCombinerProps): CombinerResult {
  return new StepCombiner(groups, props).combine();
}
class StepCombiner {
    #stepGroups: StepGroup[];

    #afterTransforms?: StepCombinerTransform[];

    #afterFilters?: StepCombinerFilter[];

    #combinationToRawsMap: CombinationToRawsMap = new CombinationToRawsMap();

    constructor(groups: StepGroup[], props?: StepCombinerProps) {
      this.#stepGroups = groups;

      this.#afterTransforms = props?.afterTransforms;

      this.#afterFilters = props?.afterFilters;
    }

    combine(): CombinerResult {
      if (this.#stepGroups.length === 0) {
        return {
          combinations: [],
          meta: {
            combinationToRawsMap: this.#combinationToRawsMap,
          },
        };
      }

      let rawCombinations: RawCombination[] = getCartesianProduct(this.#stepGroups);

      /*
      Problemas tras el producto cartesiano:
       - Puede haber una combinación que sean todo nulls. Habría que borrarlas

      Problemas tras aplanar:
        - Puede haber una combinaciones contratictorias, con más de un step que aplique al
        mismo índice. Habría que borrar estas combinaciones
        - Puede haber combinaciones duplicadas: que tengan exactamente los mismos steps
        (tanto en el mismo orden dentro del array de cambinación como en distinto).
        Habría que añadir sólo una vez la combinación.
      */

      return this.#cleanRawCombinations(rawCombinations);
    }

    #cleanRawCombinations(
      rawCombinations: RawCombination[],
    ): CombinerResult {
      const combinations: Combination[] = [];

      rawCombinations.forEach((rawCombination) => {
        const flatRawCombination = rawCombination.map(
          step=>step
            ? flattenStep(step)
            : [], // Remove null step
        ).flat() as SingleStep[];
        let indexes = new Set<number>();

        for (const singleStep of flatRawCombination) {
          if (indexes.has(singleStep.index))
            return; // Contradiction: two steps with same index

          indexes.add(singleStep.index);
        }

        if (indexes.size === 0)
          return; // All null steps combination (empty combination at this point)

        const combination = flatRawCombination as Combination;

        if (this.#afterFilters) {
          for (const filter of this.#afterFilters) {
            if (!filter(combination))
              return;
          }
        }

        if (this.#afterTransforms) {
          for (const transform of this.#afterTransforms) {
            transform( {
              combination: combination,
              hasIndex: indexes.has.bind(indexes),
            } );
          }
        }

        const duplicatedCombination = this.#combinationToRawsMap.has(combination);

        this.#combinationToRawsMap.add(combination, rawCombination);

        if (duplicatedCombination)
          return; // Duplicated combination

        combinations.push(combination);
      } );

      return {
        combinations,
        meta: {
          combinationToRawsMap: this.#combinationToRawsMap,
        },
      };
    }
}
