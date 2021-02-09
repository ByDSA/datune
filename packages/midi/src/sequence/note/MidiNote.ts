import { TemporalEvent } from '@datune/analyzer/events/TemporalEvent';
import { MusicalDuration } from '@datune/core';
import { MidiPitch } from "../../pitch/MidiPitch";
import { MidiNoteBuilder } from './building/MidiNoteBuilder';

export class MidiNote implements TemporalEvent<MusicalDuration> {
    private constructor(private _midiPitch: MidiPitch, private _duration: MusicalDuration, private _velocity: number, private _from: MusicalDuration) {
        Object.freeze(this);
    }

    private static _create(midiPitch: MidiPitch, duration: MusicalDuration, velocity: number, from: MusicalDuration): MidiNote {
        return new MidiNote(midiPitch, duration, velocity, from);
    }

    static builder(): MidiNoteBuilder {
        return new MidiNoteBuilder();
    }

    get velocity(): number {
        return this._velocity;
    }

    get pitch(): MidiPitch {
        return this._midiPitch;
    }

    get duration(): MusicalDuration {
        return this._duration;
    }

    get from(): MusicalDuration {
        return this._from;
    }

    withPitch(pitch: MidiPitch): MidiNote {
        return MidiNote.builder()
            .base(this)
            .pitch(pitch)
            .create();
    }

    withDuration(duration: MusicalDuration): MidiNote {
        return MidiNote.builder()
            .base(this)
            .duration(duration)
            .create();
    }

    withFrom(from: MusicalDuration): MidiNote {
        return MidiNote.builder()
            .base(this)
            .from(from)
            .create();
    }

    withVelocity(velocity: number): MidiNote {
        return MidiNote.builder()
            .base(this)
            .velocity(velocity)
            .create();
    }
}