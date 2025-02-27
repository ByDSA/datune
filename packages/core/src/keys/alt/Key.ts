import { IKey } from "../Key";
import { Dto } from "./building/dto/Dto";
import { Chord } from "chords/alt";
import { Interval } from "intervals/alt";
import { PitchArray, Pitch, Pitches } from "pitches/alt";
import { Scale } from "scales/alt";

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
