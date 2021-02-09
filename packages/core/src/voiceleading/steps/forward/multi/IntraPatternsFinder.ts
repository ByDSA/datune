import { NumberArray } from "@datune/utils";
import { SPNArray } from "../../../../chords";
import { ChromaticPattern, ChromaticPatternArray } from "../../../../voicings/relative/chromatic/ChromaticPattern";

export class IntraPatternsFinder {
    private _notes: SPNArray | undefined;
    private _patterns: ChromaticPatternArray | undefined;

    private constructor() {
    }

    static create(): IntraPatternsFinder {
        return new IntraPatternsFinder();
    }

    notes(...notes: SPNArray): IntraPatternsFinder {
        this._notes = notes;

        return this;
    }

    referencePatterns(...patterns: ChromaticPatternArray): IntraPatternsFinder {
        this._patterns = patterns;

        return this;
    }

    find(): IntraPattern[] {
        if (!this._notes || !this._patterns)
            throw new Error();
        let intraPatterns: IntraPattern[] = [];
        for (const pattern of this._patterns) {
            spnFor: for (const spn of this._notes) {
                const notesIndex = [];
                for (const interval of pattern) {
                    const shiftedNote = spn.withShift(interval);
                    if (!shiftedNote)
                        continue;
                    const index = this._notes.indexOf(shiftedNote);
                    if (index < 0)
                        continue spnFor;
                    notesIndex.push(index);
                }
                intraPatterns.push({ notesIndex: <NumberArray>notesIndex, pattern })
            }
        }

        return intraPatterns;
    }
}

export type IntraPattern = { notesIndex: NumberArray, pattern: ChromaticPattern };