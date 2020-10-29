import { SPN } from '@datune/core/pitches/symbolic/SPN';
import { MusicalDuration } from '@datune/core/tempo/MusicalDuration';
import { TemporalEvent } from './TemporalEvent';

export class NoteEvent implements TemporalEvent<MusicalDuration> {
    private _pitch: SPN;
    private _duration: MusicalDuration;

    private constructor(pitch: SPN, duration: MusicalDuration) {
        this._pitch = pitch;
        this._duration = duration;
    }

    static from(pitch: SPN, duration: MusicalDuration) {
        return new NoteEvent(pitch, duration);
    }

    get duration() {
        return this._duration;
    }

    get pitch() {
        return this._pitch;
    }
}