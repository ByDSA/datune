import type { StepGroup, SingleStepCombination } from "./types";
import type { StepCombinerTransform } from "./transforms";
import type { SingleStep } from "../steps/single/SingleStep";
import type { StepOrNull } from "../steps/Step";
import { getCartesianProduct } from "@datune/utils/math";
import { singleStepsGetObjId } from "voice-leading/steps/single/id";
import { SingleStepArray } from "voice-leading/steps";
import { flattenStep } from "../steps/flattenSteps";
import { StepCombinerFilter } from "./filters";

// Dirty = con potenciales problemas de aplicar producto cartesiano o aplanar
type DirtyCombination = StepOrNull[];

export type StepCombinerProps = {
  // Transforms y Filters se usan para iterar una única vez el resultado
  afterFilters?: StepCombinerFilter[];
  // afterTransforms: se ejecuta antes de comprobar duplicados y después de los afterFilters
  afterTransforms?: StepCombinerTransform[];
};

export function combineStepGroups(groups: StepGroup[], props?: StepCombinerProps) {
  return new StepCombiner(groups, props).calc();
}
class StepCombiner {
    #stepGroups: StepGroup[];

    #afterTransforms?: StepCombinerTransform[];

    #afterFilters?: StepCombinerFilter[];

    constructor(groups: StepGroup[], props?: StepCombinerProps) {
      this.#stepGroups = groups;

      this.#afterTransforms = props?.afterTransforms;

      this.#afterFilters = props?.afterFilters;
    }

    calc(): SingleStepCombination[] {
      if (this.#stepGroups.length === 0)
        return [];

      /*
      Problemas tras el producto cartesiano:
       - Puede haber una combinación que sean todo nulls. Habría que borrarlas
       */
      let dirtyCombinations: DirtyCombination[] = getCartesianProduct(this.#stepGroups);
      let flatDirtyNonNullCombinations = dirtyCombinations.map(dirtyCombination => {
        return dirtyCombination.map(
          step=>step
            ? flattenStep(step)
            : [], // Remove null step
        ).flat() as SingleStep[];
      } );

      /*
      Problemas tras aplanar:
        - Puede haber una combinaciones contratictorias, con más de un step que aplique al
        mismo índice. Habría que borrar estas combinaciones
        - Puede haber combinaciones duplicadas: que tengan exactamente los mismos steps
        (tanto en el mismo orden dentro del array de cambinación como en distinto).
        Habría que añadir sólo una vez la combinación.
      */

      return this.#cleanFlatDirtyCombinations(flatDirtyNonNullCombinations);
    }

    #cleanFlatDirtyCombinations(
      flatDirtyCombinations: SingleStepCombination[],
    ): SingleStepCombination[] {
      const idsAddedSets = new Set<string>();

      return flatDirtyCombinations.filter((flatDirtyCombination) => {
        let indexes = new Set<number>();

        for (const singleStep of flatDirtyCombination) {
          if (indexes.has(singleStep.index))
            return false; // Contradiction: two steps with same index

          indexes.add(singleStep.index);
        }

        if (indexes.size === 0)
          return false; // All null steps combination (empty combination at this point)

        const flatDirtyNonEmptyCombination = flatDirtyCombination as SingleStepArray;

        if (this.#afterFilters) {
          for (const filter of this.#afterFilters) {
            if (!filter(flatDirtyNonEmptyCombination))
              return false;
          }
        }

        if (this.#afterTransforms) {
          for (const transform of this.#afterTransforms) {
            transform( {
              stepCombination: flatDirtyNonEmptyCombination,
              hasIndex: indexes.has.bind(indexes),
            } );
          }
        }

        const id = singleStepsGetObjId(flatDirtyNonEmptyCombination);

        if (idsAddedSets.has(id))
          return false; // Duplicated combination

        idsAddedSets.add(id);

        return true;
      } );
    }
}
