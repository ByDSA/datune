import { RhythmPattern } from '../rythm/RhythmPattern';
import { MusicalDuration } from '../tempo/MusicalDuration';
import { NotesSequence } from './NotesSequence';

export class HarmonicSequence {
    private _rhythmPattern: RhythmPattern;
    private _beat: MusicalDuration;

    private _notesSequence: NotesSequence;

    private constructor() {
        this._notesSequence = new NotesSequence();
    }

    static create(rhythmPattern: RhythmPattern, beat: MusicalDuration): HarmonicSequence {
        let rhythmSequence = new HarmonicSequence();
        rhythmSequence._rhythmPattern = rhythmPattern;
        rhythmSequence._beat = beat;

        return rhythmSequence;
    }

    get notesSequence(): NotesSequence {
        return this._notesSequence;
    }

    get beat(): MusicalDuration {
        return this._beat
    }

    get rhythmPattern(): RhythmPattern {
        return this._rhythmPattern;
    }
}