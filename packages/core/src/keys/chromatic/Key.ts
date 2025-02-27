import { Arrays } from "@datune/utils";
import { IKey } from "../Key";
import { Dto } from "./caching/Dto";
import { Chord } from "chords/chromatic";
import { Interval } from "intervals/chromatic";
import { PitchArray, Pitch, Pitches } from "pitches/chromatic";
import { Scales, Scale } from "scales/chromatic";

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
