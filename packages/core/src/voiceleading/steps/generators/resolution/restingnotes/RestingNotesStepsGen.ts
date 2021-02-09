import { Arrays, NonEmptyArray } from "@datune/utils";
import { ChromaticArray, SPNArray } from "../../../../../chords";
import { ChromaticInterval } from "../../../../../intervals";
import { StepCombiner } from "../../../../../voiceleading/steps/combiner/StepCombiner";
import { compactStepsArray } from "../../../../../voiceleading/steps/forward/multi/Utils";
import { Step } from "../../../../../voiceleading/steps/Step";
import { SingleStep } from "../../../single/SingleStep";
import { StepsGeneratorInterface } from "../../StepsGenerator";

export class RestingNotesStepsGen implements StepsGeneratorInterface {
    private _notes: SPNArray | undefined;
    private _restingNotes: ChromaticArray | undefined;
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

    restingNotes(...notes: ChromaticArray): RestingNotesStepsGen {
        this._restingNotes = notes;
        return this;
    }

    maxStep(n: ChromaticInterval): RestingNotesStepsGen {
        this._maxStep = n;

        return this;
    }

    generateSteps(): Step[] {
        let combiner = this._initializeCombiner();
        let arrays = combiner.filter(a => !!a).calcArrays();

        return <Step[]>compactStepsArray(arrays);
    }

    private _initializeCombiner(): StepCombiner {
        if (!this._notes || !Arrays.isDefined(this._notes) || !this._restingNotes || !Arrays.isDefined(this._restingNotes))
            throw new Error();
        let combiner = StepCombiner.create();
        for (let index = 0; index < this._notes.length; index++) {
            const n = this._notes[index];
            let group: NonEmptyArray<SingleStep | null> = [null];
            for (let i = -this._maxStep; i <= this._maxStep; i++) {
                const shiftedNote = n.withShift(i);

                if (shiftedNote && this._restingNotes.includes(shiftedNote.degree)) {
                    const singleStep = SingleStep.from(index, i);
                    group.push(singleStep);
                }
            }
            combiner.addGroup(...group);
        }

        return combiner;
    }
}