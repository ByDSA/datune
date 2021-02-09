
import { SPNArray } from "../../../chords";
import { SPN } from "../../../pitches";
import { StepCombination } from "../combiner/StepCombination";
import { StepCombiner } from "../combiner/StepCombiner";
import { SingleStep } from "../single/SingleStep";
import { Target } from "../Step";

export class StepCombinationsApplier {
    private _combinations: StepCombination[] | undefined;
    private _baseNotes: SPNArray | undefined;
    private _voiceCrossing: boolean;
    private _voiceOverlapping: boolean;

    private constructor() {
        this._voiceOverlapping = false;
        this._voiceCrossing = false;
    }

    static create(): StepCombinationsApplier {
        return new StepCombinationsApplier();
    }

    combinations(combinations: StepCombination[]): StepCombinationsApplier {
        this._combinations = combinations;

        return this;
    }

    combiner(combiner: StepCombiner): StepCombinationsApplier {
        return this.combinations(combiner.calcArrays());
    }

    notes(...notes: SPNArray): StepCombinationsApplier {
        this._baseNotes = notes;
        return this;
    }

    letVoiceOverlapping(): StepCombinationsApplier {
        this._voiceOverlapping = true;

        return this;
    }

    letVoiceCrossing(): StepCombinationsApplier {
        this._voiceCrossing = true;

        return this;
    }

    apply(): CombinationResult[] {
        if (!this._combinations)
            throw COMBINATIONS_ERROR;
        if (!this._baseNotes)
            throw NOTES_ERROR;

        const results: CombinationResult[] = [];
        for (const combination of this._combinations) {
            let target = _calcTarget(this._baseNotes, combination);

            if (!this._voiceCrossing && checkVoiceCrossing(target)
                || !this._voiceOverlapping && checkVoiceOverlapping(this._baseNotes, target))
                continue;

            results.push({ target, steps: combination });
        }

        return results;
    }
}

function _calcTarget(baseNotes: SPNArray, combination: StepCombination): Target {
    let target: Target = baseNotes;
    for (const sm of combination)
        target = sm.apply(target);

    return target;
}

export type CombinationResult = {
    target: Target,
    steps: SingleStep[]
}

const COMBINATIONS_ERROR = new Error("Combinations not assigned");
const NOTES_ERROR = new Error("Notes not assigned");

export function checkVoiceCrossing(notes: Target): boolean | null {
    if (!notes)
        return null;

    let lastPrevIndex = { i: -1 };
    for (let i = 1; i < notes.length; i++) {
        const current = notes[i];
        if (!current)
            continue;
        const prev = getPrev(notes, i, lastPrevIndex);
        if (!prev)
            continue;
        if (current.valueOf() <= prev.valueOf())
            return true;
    }

    return false;
}

function getPrev(notes: Target, currentIndex: number, lastPrevIndex: { i: number } = { i: -1 }): SPN | null {
    for (let i = currentIndex - 1; i > lastPrevIndex.i; i--)
        if (notes[i]) {
            lastPrevIndex.i = i;
            return notes[i];
        }

    return null;
}

export function checkVoiceOverlapping(baseNotes: SPN[], notes: Target): boolean | null {
    if (!baseNotes || !notes || baseNotes.length != notes.length)
        return null;

    let lastPrevIndex = { i: -1 };
    for (let i = 1; i < notes.length; i++) {
        const prev = getPrev(notes, i, lastPrevIndex);
        if (!prev)
            continue;
        if (prev.valueOf() > baseNotes[i].valueOf())
            return true;
    }

    return false;
}