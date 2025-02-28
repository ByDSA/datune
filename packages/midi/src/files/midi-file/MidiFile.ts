import { BPM, MusicalDuration, TimeSignature } from "@datune/core/time";
import { SIXTYFOURTH, ZERO } from "@datune/core/time/symbolic/musical-duration/constants";
import { Track } from "../track/Track";

export class MidiFile {
  bpmEvents: {
    time: MusicalDuration;
    bpm: BPM;
 }[];

  timeSignatureEvents: {
    time: MusicalDuration;
    timeSignaure: TimeSignature;
  }[];

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

  addTimeSignature(t: TimeSignature, atTime: MusicalDuration = ZERO): MidiFile {
    this.#initPPQIfNeeded(t.denominatorBeat);

    this.timeSignatureEvents.push( {
      time: atTime,
      timeSignaure: t,
    } );

    return this;
  }

  #initPPQIfNeeded(md: MusicalDuration): void {
    if (!this.ppq)
      this.ppq = getInnerTick(md);
  }

  addBPM(bpm: BPM, atTime: MusicalDuration = ZERO): MidiFile {
    this.#initPPQIfNeeded(bpm.beat);

    this.bpmEvents.push( {
      bpm,
      time: atTime,
    } );

    return this;
  }
}

export function getInnerTick(m: MusicalDuration): number {
  return m / SIXTYFOURTH;
}
