import { Chord, MusicalDuration } from '@datune/core';
import { TemporalEvent } from '../../events/TemporalEvent';

export class ChordEvent implements TemporalEvent<MusicalDuration> {
    private _chord: Chord;
    private _duration: MusicalDuration;

    private constructor(chord: Chord, duration: MusicalDuration) {
        this._chord = chord;
        this._duration = duration;
    }

    static from(chord: Chord, duration: MusicalDuration) {
        return new ChordEvent(chord, duration);
    }

    get duration() {
        return this._duration;
    }

    get chord() {
        return this._chord;
    }
}