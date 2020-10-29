import { DiatonicAltChord } from '@datune/core';
import { MusicalDuration } from '@datune/core/tempo/MusicalDuration';
import { TemporalEvent } from 'events/TemporalEvent';

export class ChordEvent implements TemporalEvent<MusicalDuration> {
    private _chord: DiatonicAltChord;
    private _duration: MusicalDuration;

    private constructor(chord: DiatonicAltChord, duration: MusicalDuration) {
        this._chord = chord;
        this._duration = duration;
    }

    static from(chord: DiatonicAltChord, duration: MusicalDuration) {
        return new ChordEvent(chord, duration);
    }

    get duration() {
        return this._duration;
    }

    get chord() {
        return this._chord;
    }
}