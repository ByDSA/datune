import type { Dto } from "./caching/Dto";
import type { Interval } from "intervals/chromatic";
import type { Arrays } from "@datune/utils";
import { Chord } from "chords/chromatic";
import { PitchArray, Pitch, Pitches } from "pitches/chromatic";
import { Scales, Scale } from "scales/chromatic";
import { IKey } from "../Key";

export class Key implements
  IKey<Interval, Pitch, Scale, Chord> {
  pitches: Arrays.NonEmpty<Pitch>;

  root: Pitch;

  scale: Scale;

  length: number;

  private constructor(dto: Dto) {
    this.root = Pitches.fromInt(dto[0]);
    this.scale = Scales.fromRootIntervals(...dto[1]);
    this.length = this.scale.length;
    this.pitches = Pitches.rootIntervals(this.root, this.scale.rootIntervals);
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
