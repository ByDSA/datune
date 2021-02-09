import { MusicalDuration } from "@datune/core";
import { Builder, TemporalNodeBuilder } from "@datune/utils";
import { MidiNote } from "../../note/MidiNote";
import { MidiNode } from "../MidiNode";

export class MidiNodeBuilder implements Builder<MidiNode> {
    private temporalNodeBuilder: TemporalNodeBuilder<MidiNote, MusicalDuration>;

    constructor() {
        this.temporalNodeBuilder = new TemporalNodeBuilder();
    }

    midiNote(midiNote: MidiNote): MidiNodeBuilder {
        this.temporalNodeBuilder.event(midiNote);

        return this;
    }

    from(from: MusicalDuration): MidiNodeBuilder {
        this.temporalNodeBuilder.from(from);

        return this;
    }

    create(): MidiNode {
        const event: MidiNote = (<any>this.temporalNodeBuilder)._event;
        const from: MusicalDuration = (<any>this.temporalNodeBuilder)._from;
        return (<any>MidiNode)._createMidiNode(event, from);
    }
}