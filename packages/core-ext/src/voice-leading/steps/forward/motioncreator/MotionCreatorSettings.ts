import type { Interval as ChromaticInterval } from "@datune/core/intervals/chromatic";
import type { KeyArray } from "@datune/core/keys/chromatic";
import type { PitchArray as ChromaticArray } from "@datune/core/pitches/chromatic";
import type { SPNArray } from "@datune/core/spns/chromatic";
import type { VoicingArray as ChromaticVoicingArray } from "@datune/core/voicings/chromatic";

export class MotionCreatorSettings {
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
