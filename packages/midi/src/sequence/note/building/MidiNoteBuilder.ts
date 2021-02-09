import { MusicalDuration } from "@datune/core";
import { Builder } from "@datune/utils";
import { MidiPitch } from "../../../pitch/MidiPitch";
import { MidiNote } from "../MidiNote";

export class MidiNoteBuilder implements Builder<MidiNote> {
    private _pitch: MidiPitch | undefined;
    private _velocity: number | undefined;
    private _duration: MusicalDuration | undefined;
    private _from: MusicalDuration | undefined;
    private _base: MidiNote;

    constructor() {
        const base = (<any>MidiNote)._create(
            MidiPitch.C5,
            MusicalDuration.QUARTER,
            100,
            MusicalDuration.ZERO
        );
        this._base = base;
    }

    pitch(p: MidiPitch): MidiNoteBuilder {
        this._pitch = p;

        return this;
    }

    base(midiNote: MidiNote): MidiNoteBuilder {
        this._base = midiNote;

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

    from(t: MusicalDuration): MidiNoteBuilder {
        this._from = t;

        return this;
    }

    create(): MidiNote {
        return (<any>MidiNote)._create(
            this._pitch || this._base.pitch,
            this._duration || this._base.duration,
            this._velocity === undefined ? this._base.velocity : this._velocity,
            this._from || this._base.from
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