import { lockr } from "@datune/utils/immutables";
import type { MusicalDuration } from "../musical-duration";
import { Tempo } from "../tempo/Tempo";

export class BPM extends Tempo {
  bpm: number;

  beat: MusicalDuration;

  private wholeMillisDuration;

  private constructor(bpm: number, beat: MusicalDuration) {
    super();

    this.bpm = bpm;
    this.beat = beat;
    this.wholeMillisDuration = calcWholeMillisDuration(this.bpm, this.beat);

    lockr(this);
  }

  private static create(bpm: number, beat: MusicalDuration): BPM {
    return new BPM(bpm, beat);
  }

  getMillis(musicalDuration: MusicalDuration): number {
    return +musicalDuration * this.wholeMillisDuration;
  }
}

function calcWholeMillisDuration(bpm: number, beat: MusicalDuration): number {
  const msPerMin = 1000 * 60;
  const baseDuration = msPerMin / bpm;

  return baseDuration / +beat;
}
