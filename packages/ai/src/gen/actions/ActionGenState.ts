import { MusicalDuration } from "@datune/core";
import { MusicalDurations as MD } from "@datune/core";
import { MidiNote } from "@datune/midi";
import { Voice } from "../voice/Voice";

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
    this.times = [MD.ZERO, MD.ZERO, MD.ZERO];
  }

  toString() {
    return `i=${this.i} time=${this.times[this.i]}`;
  }
}
