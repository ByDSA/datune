import { Interval as ChromaticInterval } from "intervals/chromatic";
import { Array as KeyArray } from "keys/chromatic";
import { Array as ChromaticArray } from "pitches/chromatic";
import { Array as SPNArray } from "spns/chromatic";
import { Array as ChromaticVoicingArray } from "voicings/chromatic";

export default class MotionCreatorSettings {
  minLength: number | undefined;

  maxLength: number | undefined;

  voicings: ChromaticVoicingArray | undefined;

  keysAny: KeyArray | undefined;

  keysAll: KeyArray | undefined;

  restingNotes: ChromaticArray | undefined;

  doResolution: boolean;

  doNear: boolean;

  fromNotes: SPNArray | undefined;

  maxStep: ChromaticInterval;

  constructor() {
    this.doResolution = true;
    this.doNear = true;
    this.maxStep = 2;
  }

  readyForCalculate() {
    if (!this.fromNotes)
      throw new Error();

    if (this.minLength === undefined) {
      if (this.maxLength === undefined)
        this.minLength = this.fromNotes.length;
      else
        this.minLength = Math.min(this.maxLength, this.fromNotes.length);
    }

    if (this.maxLength === undefined)
      this.maxLength = Math.max(this.minLength, this.fromNotes.length);
  }
}
