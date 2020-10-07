import { SPN } from '../pitches/symbolic/SPN';
import { MusicalDuration } from '../tempo/MusicalDuration';
import { TemporalEvent } from './TemporalEvent';

export class Note implements TemporalEvent<MusicalDuration> {
    private _pitch: SPN;
    private _duration: MusicalDuration;

    private constructor(pitch: SPN, duration: MusicalDuration) {
        this._pitch = pitch;
        this._duration = duration;
    }

    static from(pitch: SPN, duration: MusicalDuration) {
        return new Note(pitch, duration);
    }

    get duration() {
        return this._duration;
    }

    get pitch() {
        return this._pitch;
    }
}