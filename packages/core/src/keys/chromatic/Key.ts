import type { Dto } from "./caching/Dto";
import type { Interval } from "intervals/chromatic";
import type { Arrays } from "@datune/utils";
import type { Chord } from "chords/chromatic";
import type { PitchArray, Pitch } from "pitches/chromatic";
import type { Scale } from "scales/chromatic";
import type { IKey } from "../Key";
import { Pitches as P } from "pitches/chromatic";
import { Scales as S } from "scales/chromatic";

export class Key implements
  IKey<Interval, Pitch, Scale, Chord> {
  pitches: Arrays.NonEmpty<Pitch>;

  root: Pitch;

  scale: Scale;

  length: number;

  private constructor(dto: Dto) {
    this.root = P.fromInt(dto[0]);
    this.scale = S.fromRootIntervals(...dto[1]);
    this.length = this.scale.length;
    this.pitches = P.rootIntervals(this.root, this.scale.rootIntervals);
  }

  private static create(dto: Dto): Key {
    return new Key(dto);
  }

  hasChord(chord: Chord): boolean {
    return this.hasPitches(...chord.pitches as PitchArray);
  }

  hasPitches(...pitches: PitchArray): boolean {
    for (const chromatic of pitches) {
      if (!this.pitches.includes(chromatic))
        return false;
    }

    return true;
  }

  toString() {
    return `${this.root} ${this.scale}`;
  }
}
