import { MusicalDuration, SPN } from "@datune/core";
import { MidiNode, MidiNote } from "@datune/midi";
import { TemporalNode } from "@datune/utils";
import { Voice } from "../voice/Voice";
import { ActionNote } from "./ActionNote";

type Node = TemporalNode<MidiNote, MusicalDuration>;
export class ActionGenState {
    i: number = 0;
    times: MusicalDuration[] = [];
    voices: Voice[] = [];
    voicesNumber: number;
    lasts: (MidiNote | null)[] = [];

    constructor(voices: Voice[]) {
        this.voices = voices;
        this.voicesNumber = voices.length;
        this.lasts = [null, null, null];
        this.times = [MusicalDuration.ZERO, MusicalDuration.ZERO, MusicalDuration.ZERO];
    }

    toString() {
        return `i=${this.i} time=${this.times[this.i]}`;
    }
}

export class ActionGen extends ActionNote {
    private node: MidiNode | undefined;
    private last: MidiNote | null;
    private time: MusicalDuration;
    private i: number;

    constructor(possibilities: MidiNote[], private state: ActionGenState) {
        super(possibilities);
        this.i = state.i;
        this.last = state.lasts[this.i];
        this.time = state.times[this.i];
    }

    check(): boolean {
        let ret: boolean = true;

        // console.log(`check: ${this.state} ${this.node?.event} ${ret}`);

        return ret;
    }

    do(): boolean {
        let ok = false;
        do {
            ok = this.try();
            if (!ok)
                return false;
            if (this.check())
                break;
            else
                this.untry();
        } while (true);

        this.nextState();

        return true;
    }

    private nextState(): void {
        this.state.times[this.i] = <MusicalDuration>this.node?.to;
        this.state.i = this.getLowerTimeI();
    }

    private getLowerTimeI(): number {
        return this.state.times.map((t, i) => {
            return { time: t, i };
        }).sort((v1, v2) => {
            if (v1.time < v2.time)
                return -1;
            if (v1.time > v2.time)
                return 1;

            return 0;
        })[0].i;
    }

    try(): boolean {
        const midiNote = this.picker.pickAndRemove();
        console.log(`try: ${this.state} ${midiNote} remainingPossibilities=${this.picker.possibilities.map(a => a.toString())}`);
        if (!midiNote)
            return false;

        this.node = MidiNode.builder()
            .midiNote(midiNote)
            .from(this.time)
            .create();
        this.state.voices[this.state.i].notesSequence.addNode(this.node);
        this.state.lasts[this.state.i] = midiNote;

        return true;
    }

    untry(): void {
        this.state.voices[this.state.i].notesSequence.removeNode(<Node>this.node);
        this.node = undefined;
        this.state.lasts[this.state.i] = this.last;
        console.log("untry");
    }

    undo(): void {
        this.prevState();
    }

    private prevState(): void {
        this.state.times[this.i] = this.time;
    }
}