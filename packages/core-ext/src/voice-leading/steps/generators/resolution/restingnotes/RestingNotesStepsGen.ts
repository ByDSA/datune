import { Arrays } from "@datune/utils";
import { Interval as ChromaticInterval } from "@datune/core/intervals/chromatic";
import { Array as PitchArray } from "@datune/core/pitches/chromatic";
import { add as SPNAdd, Array as SPNArray } from "@datune/core/spns/chromatic";
import { StepCombiner } from "../../../combiner/StepCombiner";
import { compactStepsArray } from "../../../forward/multi/Utils";
import { from, SingleStep } from "../../../single";
import { Step } from "../../../Step";
import { StepsGeneratorInterface } from "../../StepsGenerator";

export default class RestingNotesStepsGen implements StepsGeneratorInterface {
  private _notes: SPNArray | undefined;

  private _restingNotes: PitchArray | undefined;

  private _maxStep: number;

  private constructor() {
    this._maxStep = 2;
  }

  static create(): RestingNotesStepsGen {
    return new RestingNotesStepsGen();
  }

  notes(...notes: SPNArray): RestingNotesStepsGen {
    this._notes = notes;

    return this;
  }

  restingNotes(...notes: PitchArray): RestingNotesStepsGen {
    this._restingNotes = notes;

    return this;
  }

  maxStep(n: ChromaticInterval): RestingNotesStepsGen {
    this._maxStep = n;

    return this;
  }

  generateSteps(): Step[] {
    const combiner = this._initializeCombiner();
    const arrays = combiner.filter((a) => !!a).calcArrays();

    return <Step[]>compactStepsArray(arrays);
  }

  private _initializeCombiner(): StepCombiner {
    if (!this._notes
        || !Arrays.isDefined(this._notes)
        || !this._restingNotes
        || !Arrays.isDefined(this._restingNotes))
      throw new Error();

    const combiner = StepCombiner.create();

    for (let index = 0; index < this._notes.length; index++) {
      const n = this._notes[index];
      const group: Arrays.NonEmpty<SingleStep | null> = [null];

      for (let i = -this._maxStep; i <= this._maxStep; i++) {
        const shiftedNote = SPNAdd(n, i);

        if (shiftedNote && this._restingNotes.includes(shiftedNote.pitch)) {
          const singleStep = from(index, i);

          group.push(singleStep);
        }
      }

      combiner.addGroup(...group);
    }

    return combiner;
  }
}
