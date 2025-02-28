import { Arrays } from "@datune/utils";
import { Interval as ChromaticInterval } from "@datune/core/intervals/chromatic";
import { PitchArray } from "@datune/core/pitches/chromatic";
import { SPNArray } from "@datune/core/spns/chromatic";
import { add as SPNAdd } from "@datune/core/spns/symbolic/chromatic/modifiers";
import { StepCombiner } from "../../../combiner/StepCombiner";
import { compactStepsArray } from "../../../forward/multi/Utils";
import { from, SingleStep } from "../../../single";
import { Step } from "../../../Step";
import { StepsGeneratorInterface } from "../../StepsGenerator";

export class RestingNotesStepsGen implements StepsGeneratorInterface {
  #notes: SPNArray | undefined;

  #restingNotes: PitchArray | undefined;

  #maxStep: number;

  private constructor() {
    this.#maxStep = 2;
  }

  static create(): RestingNotesStepsGen {
    return new RestingNotesStepsGen();
  }

  notes(...notes: SPNArray): RestingNotesStepsGen {
    this.#notes = notes;

    return this;
  }

  restingNotes(...notes: PitchArray): RestingNotesStepsGen {
    this.#restingNotes = notes;

    return this;
  }

  maxStep(n: ChromaticInterval): RestingNotesStepsGen {
    this.#maxStep = n;

    return this;
  }

  generateSteps(): Step[] {
    const combiner = this.#initializeCombiner();
    const arrays = combiner.filter((a) => !!a).calcArrays();

    return <Step[]>compactStepsArray(arrays);
  }

  #initializeCombiner(): StepCombiner {
    if (!this.#notes
        || !Arrays.isDefined(this.#notes)
        || !this.#restingNotes
        || !Arrays.isDefined(this.#restingNotes))
      throw new Error();

    const combiner = StepCombiner.create();

    for (let index = 0; index < this.#notes.length; index++) {
      const n = this.#notes[index];
      const group: Arrays.NonEmpty<SingleStep | null> = [null];

      for (let i = -this.#maxStep; i <= this.#maxStep; i++) {
        const shiftedNote = SPNAdd(n, i);

        if (shiftedNote && this.#restingNotes.includes(shiftedNote.pitch)) {
          const singleStep = from(index, i);

          group.push(singleStep);
        }
      }

      combiner.addGroup(...group);
    }

    return combiner;
  }
}
