import { RhythmPattern } from '@datune/core/rythm/RhythmPattern';
import { MusicalDuration } from '@datune/core/tempo/MusicalDuration';
import { ChordSequence } from './ChordSequence';
import { NotesSequence } from './NotesSequence';

export class HarmonicSequence {
    private _rhythmPattern: RhythmPattern;
    private _beat: MusicalDuration;
    private _notesTimeSequence: NotesSequence;
    private _chordSequence: ChordSequence;

    private constructor() {
        this._notesTimeSequence = new NotesSequence();
        this._chordSequence = new ChordSequence();
    }

    calculateChords() {
        this._chordSequence.calculateFrom(this);
    }

    static create(rhythmPattern: RhythmPattern, beat: MusicalDuration): HarmonicSequence {
        let rhythmSequence = new HarmonicSequence();
        rhythmSequence._rhythmPattern = rhythmPattern;
        rhythmSequence._beat = beat;

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