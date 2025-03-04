import type { Dto } from "./building/caching/Dto";
import type { Interval } from "intervals/alt";
import { Chord } from "chords/alt";
import { PitchArray, Pitch, Pitches } from "pitches/alt";
import { Scale } from "scales/alt";
import { IKey } from "../Key";

export class Key implements
  IKey<Interval, Pitch, Scale, Chord> {
  pitches: PitchArray;

  root: Pitch;

  scale: Scale;

  length: number;

  private constructor(dto: Dto) {
    this.root = dto.root;
    this.scale = dto.scale;
    this.length = this.scale.length;
    this.pitches = Pitches.rootIntervals(this.root, this.scale.rootIntervals);
  }

  private static create(dto: Dto): Key {
    return new Key(dto);
  }

  hasChord(chord: Chord): boolean {
    return this.hasPitches(...chord.pitches);
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
