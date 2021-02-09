import { ChromaticArray, SPNArray } from "../../../../chords";
import { ChromaticInterval } from "../../../../intervals";
import { TonalityArray } from "../../../../tonalities/chromatic/Tonality";
import { ChromaticPatternArray } from "../../../../voicings/relative/chromatic/ChromaticPattern";

export class MotionCreatorSettings {
    minLength: number | undefined;
    maxLength: number | undefined;
    patterns: ChromaticPatternArray | undefined;
    keysAny: TonalityArray | undefined;
    keysAll: TonalityArray | undefined;
    restingNotes: ChromaticArray | undefined;
    doResolution: boolean;
    doNear: boolean;
    fromNotes: SPNArray | undefined;
    maxStep: ChromaticInterval;

    constructor() {
        this.doResolution = true;
        this.doNear = true;
        this.maxStep = 2;
    }

    readyForCalculate() {
        if (!this.fromNotes)
            throw new Error();

        if (this.minLength === undefined)
            if (this.maxLength === undefined)
                this.minLength = this.fromNotes.length;
            else
                this.minLength = Math.min(this.maxLength, this.fromNotes.length);


        if (this.maxLength === undefined)
            this.maxLength = Math.max(this.minLength, this.fromNotes.length);
    }
}