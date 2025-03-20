import type { MusicalDuration } from "../musical-duration";
import type { Key } from "./caching/cache";
import { deepFreeze } from "datils/datatypes/objects";

export class TimeSignature {
  numerators: number[];

  numerator: number;

  denominator: number;

  denominatorBeat: MusicalDuration;

  private constructor(key: Key) {
    this.denominator = musicalDurationToDen(key.beat);
    this.denominatorBeat = key.beat;
    this.numerators = key.nums;
    this.numerator = calcNumerator(this.numerators);

    deepFreeze(this);
  }
}

function musicalDurationToDen(md: MusicalDuration): number {
  return 1 / +md;
}

function calcNumerator(numerators: number[]): number {
  return numerators.reduce((p, c) => p + c);
}
