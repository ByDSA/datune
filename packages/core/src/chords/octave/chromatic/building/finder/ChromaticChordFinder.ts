import { Chromatic } from "../../../../../pitches";
import { TonalityArray } from "../../../../../tonalities";
import { ChromaticArray, ChromaticChord } from "../../ChromaticChord";

export class ChromaticChordFinder {
    private _tonalities: TonalityArray | undefined;
    private _notes: ChromaticArray | undefined;
    private _maxLength: number;
    private _minLength: number;
    private _notInversions: boolean;
    private _bass: Chromatic | undefined;

    constructor() {
        this._maxLength = 100;
        this._minLength = 1;
        this._notInversions = false;
    }

    tonality(...tonalities: TonalityArray): ChromaticChordFinder {
        this._tonalities = tonalities;

        return this;
    }

    containsNote(...notes: ChromaticArray): ChromaticChordFinder {
        this._notes = notes;
        return this;
    }

    find(): ChromaticChord[] {
        let chords = this._notInversions ? ChromaticChord.allNonInversions() : ChromaticChord.all();
        if (this._bass)
            chords = this._filterBass(chords);
        chords = this._filterContainsAndNote(chords);
        chords = this._filterLength(chords);

        return chords;
    }

    notInversions(): ChromaticChordFinder {
        this._notInversions = true;
        return this;
    }

    maxChordLength(n: number): ChromaticChordFinder {
        this._maxLength = n;

        return this;
    }

    bass(r: Chromatic): ChromaticChordFinder {
        this._bass = r;

        return this;
    }

    minChordLength(n: number): ChromaticChordFinder {
        this._minLength = n;

        return this;
    }

    private _filterContainsAndNote(chords: ChromaticChord[]): ChromaticChord[] {
        if (!this._notes)
            return chords;

        return chords.filter(c => {
            for (const n of <Chromatic[]>this._notes)
                if (!c.has(n))
                    return false;
            return true;
        });
    }

    private _filterLength(chords: ChromaticChord[]): ChromaticChord[] {
        return chords.filter(c => {
            return c.length >= this._minLength && c.length <= this._maxLength
        });
    }

    private _filterBass(chords: ChromaticChord[]): ChromaticChord[] {
        return chords.filter(c => {
            return c.notes[0] == this._bass
        });
    }
}