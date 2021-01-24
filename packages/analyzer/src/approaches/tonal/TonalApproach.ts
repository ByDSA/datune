import { MusicalDuration, RhythmPattern } from '@datune/core';
import { ChordSequence } from '../../sequences/chordsequence/ChordSequence';
import { NotesSequence } from '../../sequences/notessequence/NotesSequence';

export class TonalApporach {
    private _rhythmPattern: RhythmPattern;
    private _beat: MusicalDuration;
    private _notesTimeSequence: NotesSequence;
    private _chordSequence: ChordSequence;

    private constructor(rhythmPattern: RhythmPattern, beat: MusicalDuration) {
        this._notesTimeSequence = new NotesSequence();
        this._chordSequence = new ChordSequence();
        this._rhythmPattern = rhythmPattern;
        this._beat = beat;
    }

    calculateChords() {
        this._chordSequence.calculateFrom(this);
    }

    static create(rhythmPattern: RhythmPattern, beat: MusicalDuration): TonalApporach {
        let rhythmSequence = new TonalApporach(rhythmPattern, beat);

        return rhythmSequence;
    }

    get notesTimeSequence(): NotesSequence {
        return this._notesTimeSequence;
    }

    get chordSequence(): ChordSequence {
        return this._chordSequence;
    }

    get beat(): MusicalDuration {
        return this._beat
    }

    get rhythmPattern(): RhythmPattern {
        return this._rhythmPattern;
    }
}