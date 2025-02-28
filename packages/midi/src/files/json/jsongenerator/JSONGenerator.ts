import { MidiJSON } from "@tonejs/midi";
import { ControlChangeJSON } from "@tonejs/midi/dist/ControlChange";
import { ControlChangesJSON } from "@tonejs/midi/dist/ControlChanges";
import { MidiFile, getInnerTick } from "../../midi-file/MidiFile";
import { MidiNode } from "sequence";

export class JSONGenerator {
  private mf: MidiFile;

  constructor(mf: MidiFile) {
    this.mf = mf;
  }

  generate() {
    const json: MidiJSON = {
      header: {
        name: "name",
        ppq: <number> this.mf.ppq,
        meta: [],
        tempos: this.#tempos(),
        timeSignatures: this.#timeSignatures(),
        keySignatures: [],
      },
      tracks: this.#generateTracks(),
    };

    return json;
  }

  #tempos() {
    return this.mf.bpmEvents.map((bpmEvent) => ( {
      ticks: getInnerTick(bpmEvent.time),
      bpm: bpmEvent.bpm.bpm,
    } ));
  }

  #timeSignatures() {
    return this.mf.timeSignatureEvents.map((timeSignatureEvent) => ( {
      ticks: timeSignatureEvent.time,
      timeSignature: [
        timeSignatureEvent.timeSignaure.numerator,
        timeSignatureEvent.timeSignaure.denominator,
      ],
    } ));
  }

  #generateTracks() {
    const controlChange: ControlChangeJSON = {
      number: 0,
      ticks: 0,
      time: 0,
      value: 0,
    };
    const controlChangeArray: ControlChangeJSON[] = [
      controlChange,
    ];
    const controlChanges: ControlChangesJSON = {
      // 2: controlChangeArray
    };

    return this.mf.tracks.map((t) => ( {
      name: t.name,
      notes: t.nodes.map((node: MidiNode) => ( {
        duration: 0,
        durationTicks: getInnerTick(node.event.duration),
        midi: +node.event.pitch,
        name: "",
        ticks: getInnerTick(node.interval.from),
        time: 0,
        velocity: node.event.velocity / 127,
      } )),
      channel: t.channel,
      instrument: {
        number: t.instrument,
        name: "",
        family: "",
      },
      controlChanges,
      pitchBends: [],
    } ));
  }
}
