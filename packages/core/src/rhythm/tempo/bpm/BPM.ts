import type { MusicalDuration } from "../musical-duration";
import type { Key } from "./building";
import { lockr } from "@datune/utils/immutables";
import { Tempo } from "../Tempo";

export class BPM extends Tempo<MusicalDuration> {
  bpm: number;

  beat: MusicalDuration;

  private wholeMillisDuration;

  private constructor(key: Key) {
    super();

    this.bpm = key.bpm;
    this.beat = key.beat;
    this.wholeMillisDuration = calcWholeMillisDuration(this.bpm, this.beat);

    lockr(this);
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
