import { MusicalDuration } from "@datune/core";
import { MidiPitch } from "../../pitch/MidiPitch";
import { MidiNote } from "./MidiNote";

export class MidiNoteBuilder {
    private _pitch: MidiPitch;
    private _velocity: number;
    private _duration: MusicalDuration;
    private _time: MusicalDuration;

    constructor() {
        this._pitch = MidiPitch.C5;
        this._velocity = 100;
        this._duration = MusicalDuration.QUARTER;
        this._time = MusicalDuration.ZERO;
    }

    pitch(p: MidiPitch): MidiNoteBuilder {
        this._pitch = p;

        return this;
    }

    velocity(v: number): MidiNoteBuilder {
        this._velocity = _fixVelocityValue(v);

        return this;
    }

    duration(d: MusicalDuration): MidiNoteBuilder {
        this._duration = d;

        return this;
    }

    time(t: MusicalDuration): MidiNoteBuilder {
        this._time = t;

        return this;
    }

    create(): MidiNote {
        return (<any>MidiNote)._create(
            this._pitch,
            this._duration,
            this._velocity,
            this._time
        );
    }
}

function _fixVelocityValue(value: number): number {
    if (value < 0)
        return 0;
    else if (value > 127)
        return 127;

    return value;
}