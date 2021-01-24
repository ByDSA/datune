import { MidiJSON } from "@tonejs/midi";
import { ControlChangeJSON } from "@tonejs/midi/dist/ControlChange";
import { ControlChangesJSON } from "@tonejs/midi/dist/ControlChanges";
import { MidiFile } from "../../midifile/MidiFile";

export class JSONGenerator {
    constructor(private mf: MidiFile) {
    }

    generate() {
        const json: MidiJSON = {
            header: {
                name: "name",
                ppq: <number>this.mf.ppq,
                meta: [],
                tempos: this._tempos(),
                timeSignatures: this._timeSignatures(),
                keySignatures: []
            },
            tracks: this._geneateTracks()
        };

        return json;
    }

    private _tempos() {
        return this.mf.bpmEvents.map(bpmEvent => {
            return {
                ticks: this.mf.getInnerTick(bpmEvent.time),
                bpm: bpmEvent.bpm.bpm
            };
        });
    }

    private _timeSignatures() {
        return this.mf.timeSignatureEvents.map(timeSignatureEvent => {
            return {
                ticks: timeSignatureEvent.time.value,
                timeSignature: [timeSignatureEvent.timeSignaure.numerator, timeSignatureEvent.timeSignaure.denominator]
            };
        })
    }

    private _geneateTracks() {
        const controlChange: ControlChangeJSON = {
            number: 0,
            ticks: 0,
            time: 0,
            value: 0,
        }

        const controlChangeArray: ControlChangeJSON[] = [
            controlChange
        ];

        const controlChanges: ControlChangesJSON = {
            //2: controlChangeArray
        };

        return this.mf.tracks.map(t => {
            return {
                name: t.name,
                notes: t.notes.map(n => {
                    return {
                        duration: 0,
                        durationTicks: this.mf.getInnerTick(n.duration),
                        midi: n.pitch.code,
                        name: "",
                        ticks: this.mf.getInnerTick(n.time),
                        time: 0,
                        velocity: n.velocity / 127
                    }
                }),
                channel: t.channel,
                instrument: {
                    number: t.instrument,
                    name: "",
                    family: ""
                },
                controlChanges: controlChanges,
                pitchBends: []
            }
        })
    }
}