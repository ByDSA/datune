import { SPN } from "@datune/core";
import { MidiNote } from "@datune/midi";
import { Action } from "./Action";

export abstract class ActionNote extends Action<MidiNote> {
    constructor(possibilities: MidiNote[]) {
        super(possibilities);
    }
}