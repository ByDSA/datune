import { NonEmptyArray } from "@datune/utils";
import { ChromaticInterval, ChromaticIntervalArray } from "../../../intervals";
import { Chromatic, SPN, SPNAlt } from "../../../pitches";
import { ChromaticPattern, DiatonicAltPattern } from "../../../voicings";
import { AbsoluteChordInterface } from "../AbsoluteChordInterface";
import { HashingObjectType, SPNChordCache } from "./building/cache/SPNChordCache";

export type SPNArray = NonEmptyArray<SPN>;
export class SPNChord implements AbsoluteChordInterface<SPN, Chromatic, ChromaticPattern> {
    private static _cache = new SPNChordCache((hashingObject: HashingObjectType) => new SPNChord(hashingObject));

    private _pattern: ChromaticPattern | undefined;

    private constructor(private _notes: SPNArray) {
    }

    static fromRootPattern(base: SPN, pattern: ChromaticPattern): SPNChord | null {
        let notes: SPN[] = [];

        for (let i of pattern) {
            let shiftedSPN = base.withShift(i);
            if (!shiftedSPN)
                return null;
            notes.push(shiftedSPN);
        }

        if (notes.length === 0)
            return null;

        return this._innerFromNotes(pattern, ...<SPNArray>notes);
    }

    static fromNotes(...notes: SPNArray): SPNChord {
        return this._innerFromNotes(undefined, ...notes);
    }

    private static _innerFromNotes(pattern: ChromaticPattern | undefined, ...notes: SPNArray): SPNChord {
        const ret = this._cache.getOrCreate(notes, (hash, obj) => {
            if (pattern)
                obj._pattern = pattern;
        });
        return ret;
    }

    has(note: SPN): boolean {
        return this._notes.includes(note);
    }

    get length(): number {
        return this._notes.length;
    }

    get pattern(): ChromaticPattern {
        if (!this._pattern)
            this._pattern = this._calcPattern();
        return this._pattern;
    }

    private _calcPattern(): ChromaticPattern {
        let rootIntervals: ChromaticIntervalArray = [0];
        const firstNote = this._notes[0];
        for (let i = 1; i < this._notes.length; i++) {
            const n = this._notes[i];
            const rootInterval: ChromaticInterval = ChromaticInterval.betweenSPN(firstNote, n);
            rootIntervals.push(rootInterval);
        }
        return ChromaticPattern.fromRootIntervals(...rootIntervals);
    }

    get notes(): SPNArray {
        return this._notes;
    }
}

function createAbsoluteVoicingAlt(base: SPNAlt, pattern: DiatonicAltPattern): SPNAlt[] | null {
    let ret: SPNAlt[] = [];

    for (let i of pattern) {
        let shiftedSPN = base.withAdd(i);
        if (!shiftedSPN)
            return null;
        ret.push(shiftedSPN);
    }

    return ret;
}
