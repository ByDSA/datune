import { TemporalEvent } from '@datune/analyzer/events/TemporalEvent';
import { MusicalDuration } from '@datune/core';
import { TemporalNode } from '@datune/utils';
import { MidiPitch } from "../../pitch/MidiPitch";
import { MidiNoteBuilder } from './MidiNoteBuilder';

export type MidiNoteNode = TemporalNode<MidiNote, MusicalDuration>;
export class MidiNote implements TemporalEvent<MusicalDuration> {
    private constructor(private _midiPitch: MidiPitch, private _duration: MusicalDuration, private _velocity: number, private _time: MusicalDuration) {
        Object.freeze(this);
    }

    private static _create(midiPitch: MidiPitch, duration: MusicalDuration, velocity: number, time: MusicalDuration): MidiNote {
        return new MidiNote(midiPitch, duration, velocity, time);
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

    get time(): MusicalDuration {
        return this._time;
    }
}