import { RhythmPattern } from '../rythm/RhythmPattern';
import { MusicalDuration } from '../tempo/MusicalDuration';
import { ChordSequence } from './ChordSequence';
import { NotesTimeSequence } from './NotesTimeSequence';

export class HarmonicSequence {
    private _rhythmPattern: RhythmPattern;
    private _beat: MusicalDuration;
    private _notesTimeSequence: NotesTimeSequence;
    private _chordSequence: ChordSequence;

    private constructor() {
        this._notesTimeSequence = new NotesTimeSequence();
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

    get notesTimeSequence(): NotesTimeSequence {
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