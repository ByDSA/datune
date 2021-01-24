import { BPM, MusicalDuration, TimeSignature } from "@datune/core";
import { Midi } from "@tonejs/midi";
import * as fs from "fs";
import { JSONGenerator } from "../json/jsongenerator/JSONGenerator";
import { Track } from "../track/Track";
import { MidiAdapter } from "./builders/MidiAdapter";

export class MidiFile {
    bpmEvents: { time: MusicalDuration, bpm: BPM }[];
    timeSignatureEvents: { time: MusicalDuration, timeSignaure: TimeSignature }[];
    tracks: Track[];
    ppq: number | undefined;

    private constructor() {
        this.bpmEvents = [];
        this.tracks = [];
        this.timeSignatureEvents = [];
    }

    static create(): MidiFile {
        return new MidiFile();
    }

    addTrack(t: Track): MidiFile {
        this.tracks.push(t);
        return this;
    }

    getInnerTick(m: MusicalDuration): number {
        return m.value / MusicalDuration.SIXTYFOURTH.value;
    }

    addTimeSignature(t: TimeSignature, atTime: MusicalDuration = MusicalDuration.ZERO): MidiFile {
        this._initPPQIfNeeded(t.denominatorBeat);

        this.timeSignatureEvents.push({ time: atTime, timeSignaure: t });

        return this;
    }

    private _initPPQIfNeeded(md: MusicalDuration): void {
        if (!this.ppq) {
            this.ppq = this.getInnerTick(md);
        }
    }

    addBPM(bpm: BPM, atTime: MusicalDuration = MusicalDuration.ZERO): MidiFile {
        this._initPPQIfNeeded(bpm.beat);

        this.bpmEvents.push({ bpm: bpm, time: atTime });

        return this;
    }

    private _setUninitializedValues() {
        if (this.bpmEvents.length == 0)
            this.addBPM(BPM.QUARTER_120);

        if (this.timeSignatureEvents.length == 0)
            this.addTimeSignature(TimeSignature.fromFrac(4));
    }

    save(path: string): boolean {
        const midi = new Midi();
        this._setUninitializedValues();
        const json = new JSONGenerator(this).generate();
        midi.fromJSON(json);
        const array = midi.toArray();
        try {
            fs.writeFileSync(path, array);
        } catch (err) {
            return false;
        }

        return true;
    }

    static load(path: string): MidiFile | null {
        try {
            const fileBuffer = fs.readFileSync(path);
            const midi = new Midi(fileBuffer);
            return new MidiAdapter(midi).adapt();
        } catch (err) {
            return null;
        }
    }
}