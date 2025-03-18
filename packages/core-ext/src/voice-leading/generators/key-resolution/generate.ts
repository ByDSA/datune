import type { StepGroup, StepsGenerator } from "../StepsGenerator";
import type { StepOrNull } from "voice-leading/steps/Step";
import type { SingleStep } from "voice-leading/steps";
import type { StepFilter } from "../filters";
import { PitchArray } from "@datune/core/pitches/chromatic";
import { SpnArray } from "@datune/core/spns/chromatic";
import { add as spnAdd } from "@datune/core/spns/symbolic/chromatic/modifiers";
import { from as singleStepFrom } from "../../steps/single/building";

export type KeyResolutionGeneratorProps = {
  base: SpnArray;
  required?: boolean;
  restingPitches: PitchArray;
  maxInterval?: number;
  filters?: StepFilter[];
};

export const generate: StepsGenerator<KeyResolutionGeneratorProps> = (props) => {
  return {
    groups: new RestingNotesStepsGen(props).generateGroups(),
  };
};
class RestingNotesStepsGen {
  #base: SpnArray; // Notas a evaluar

  #restingPitches: PitchArray; // Notas de reposo. Ej: acorde de C (C-E-G) en C Mayor

  #maxInterval: number; // Distancia máxima (arriba o abajo) a evaluar

  #required: boolean;

  #filters?: StepFilter[];

  constructor(props: KeyResolutionGeneratorProps) {
    this.#base = props.base;
    this.#restingPitches = props.restingPitches;
    this.#maxInterval = props.maxInterval ?? 2;
    this.#required = props.required ?? true;
    this.#filters = props.filters;
  }

  #shouldAdd(singleStep: SingleStep): boolean {
    if (this.#filters) {
      for (const f of this.#filters) {
        if (!f(singleStep))
          return false;
      }
    }

    return true;
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

          if (!this.#shouldAdd(singleStep))
            continue;

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
