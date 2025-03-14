import { PitchArray } from "@datune/core/pitches/chromatic";
import { SPNArray } from "@datune/core/spns/chromatic";
import { add as spnAdd } from "@datune/core/spns/symbolic/chromatic/modifiers";
import { StepGroup } from "voice-leading/combiners/types";
import { combineStepGroups } from "../../combiners/combine-groups";
import { compactStepCombinationsUnsafe } from "../compact-combinations";
import { from as singleStepFrom } from "../../steps/single/building";
import { Step } from "../../steps/Step";
import { StepsGenerator } from "../StepsGenerator";

type Props = {
  base: SPNArray;
  restingPitches: PitchArray;
  maxInterval?: number;
};

export const generate: StepsGenerator<Props> = (props) => {
  return {
    steps: new RestingNotesStepsGen(props).generateSteps(),
  };
};
class RestingNotesStepsGen {
  #base: SPNArray; // Notas a evaluar

  #restingPitches: PitchArray; // Notas de reposo. Ej: acorde de C (C-E-G) en C Mayor

  #maxInterval: number; // Distancia máxima (arriba o abajo) a evaluar

  constructor(props: Props) {
    this.#base = props.base;
    this.#restingPitches = props.restingPitches;
    this.#maxInterval = props.maxInterval ?? 2;
  }

  generateSteps(): Step[] {
    const groups = this.#generateGroups();
    const singleStepCombinations = combineStepGroups(groups);

    if (singleStepCombinations.length === 0)
      return [];

    return compactStepCombinationsUnsafe(singleStepCombinations);
  }

  #generateGroups(): StepGroup[] {
    const groups: StepGroup[] = [];

    for (let index = 0; index < this.#base.length; index++) {
      const n = this.#base[index];
      const group: StepGroup = [null];

      for (let i = -this.#maxInterval; i <= this.#maxInterval; i++) {
        const shiftedNote = spnAdd(n, i);

        if (shiftedNote && this.#restingPitches.includes(shiftedNote.pitch)) {
          const singleStep = singleStepFrom(index, i);

          group.push(singleStep);
        }
      }

      groups.push(group);
    }

    return groups;
  }
}
