import type { StepGroup, StepsGenerator } from "../StepsGenerator";
import { PitchArray } from "@datune/core/pitches/chromatic";
import { SPNArray } from "@datune/core/spns/chromatic";
import { add as spnAdd } from "@datune/core/spns/symbolic/chromatic/modifiers";
import { StepOrNull } from "voice-leading/steps/Step";
import { from as singleStepFrom } from "../../steps/single/building";

type Props = {
  base: SPNArray;
  required?: boolean;
  restingPitches: PitchArray;
  maxInterval?: number;
};

export const generate: StepsGenerator<Props> = (props) => {
  return {
    groups: new RestingNotesStepsGen(props).generateGroups(),
  };
};
class RestingNotesStepsGen {
  #base: SPNArray; // Notas a evaluar

  #restingPitches: PitchArray; // Notas de reposo. Ej: acorde de C (C-E-G) en C Mayor

  #maxInterval: number; // Distancia máxima (arriba o abajo) a evaluar

  #required: boolean;

  constructor(props: Props) {
    this.#base = props.base;
    this.#restingPitches = props.restingPitches;
    this.#maxInterval = props.maxInterval ?? 2;
    this.#required = props.required ?? true;
  }

  generateGroups(): StepGroup[] {
    const groups: StepGroup[] = [];

    for (let index = 0; index < this.#base.length; index++) {
      const n = this.#base[index];
      const group: StepOrNull[] = [];

      for (let i = -this.#maxInterval; i <= this.#maxInterval; i++) {
        if (i === 0)
          continue;

        const shiftedNote = spnAdd(n, i);

        if (shiftedNote && this.#restingPitches.includes(shiftedNote.pitch)) {
          const singleStep = singleStepFrom(index, i);

          group.push(singleStep);
        }
      }

      if (!this.#required)
        group.push(null);

      if (group.length > 0)
        groups.push(group as StepGroup);
    }

    return groups;
  }
}
