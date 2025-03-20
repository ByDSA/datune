import { MidiJSON } from "@tonejs/midi";
import { ControlChangeJSON } from "@tonejs/midi/dist/ControlChange";
import { ControlChangesJSON } from "@tonejs/midi/dist/ControlChanges";
import { MidiNode } from "sequence";
import { MidiFile, getInnerTick } from "../../midi-file/MidiFile";

export class JSONGenerator {
  #midiFile: MidiFile;

  constructor(mf: MidiFile) {
    this.#midiFile = mf;
  }

  generate(): MidiJSON {
    const json: MidiJSON = {
      header: {
        name: "name",
        ppq: this.#midiFile.ppq as number,
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
    return this.#midiFile.bpmEvents.map((bpmEvent) => ( {
      ticks: getInnerTick(bpmEvent.time),
      bpm: bpmEvent.bpm.bpm,
    } ));
  }

  #timeSignatures() {
    return this.#midiFile.timeSignatureEvents.map((timeSignatureEvent) => ( {
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
    // TODO ??
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const controlChangeArray: ControlChangeJSON[] = [
      controlChange,
    ];
    // eslint-disable-next-line @stylistic/ts/object-curly-newline
    const controlChanges: ControlChangesJSON = {
      // 2: controlChangeArray
    // eslint-disable-next-line @stylistic/ts/object-curly-newline
    };

    return this.#midiFile.tracks.map((t) => ( {
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
