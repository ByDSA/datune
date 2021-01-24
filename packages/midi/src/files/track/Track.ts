import { MidiNote } from "../../sequence/node/MidiNote";
import { Instrument } from "../Instrument";

type ChanelNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
export class Track {
    name: string;
    private _notes: MidiNote[];
    channel: ChanelNumber;
    instrument: Instrument;

    constructor() {
        this.name = "";
        this._notes = [];
        this.channel = 0;
        this.instrument = Instrument.ACOUSTIC_PIANO;
    }

    addNotes(notes: MidiNote[]): Track {
        this._notes.push(...notes);
        return this;
    }

    get notes(): readonly MidiNote[] {
        return this._notes;
    }
}