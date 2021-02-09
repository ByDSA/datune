import { MusicalDuration } from "@datune/core";
import { TemporalNode } from "@datune/utils";
import { MidiNote } from "index";
import { MidiNodeBuilder } from "./building/MidiNodeBuilder";

export class MidiNode extends TemporalNode<MidiNote, MusicalDuration> {
    static builder(): MidiNodeBuilder {
        return new MidiNodeBuilder();
    }

    protected constructor(_from: MusicalDuration, _event: MidiNote) {
        super(_from, _from.withAdd(_event.duration), _event);
    }

    private static _createMidiNode(e: MidiNote, f: MusicalDuration): MidiNode {
        return new MidiNode(f, e);
    }

    set to(to: MusicalDuration) {
        super.to = to;

        this._updateDurationEvent();
    }

    set from(from: MusicalDuration) {
        super.from = from;

        this._updateDurationEvent();
    }

    
    get from(): MusicalDuration {
        return super.from;
    }

    get to(): MusicalDuration {
        return super.to;
    }

    private _updateDurationEvent() {
        if (super.to && super.from && super.event) {
            const newDuration = super.to.withSub(super.from);
            super.event = super.event.withDuration(newDuration);
        }
    }
}