import { Arrays } from "@datune/utils";
import { Chord } from "chords/chromatic";
import { Interval } from "intervals/chromatic";
import { Array as PitchArray, fromInt as pitchFromInt, Pitch, rootIntervals as pitchesRootIntervals } from "pitches/chromatic";
import { fromRootIntervals as scaleFromIntervals, Scale } from "scales/chromatic";
import KeyInterface from "../Key";
import { Dto } from "./caching";

export default class Key implements
  KeyInterface<Interval, Pitch, Scale, Chord> {
  pitches: Arrays.NonEmpty<Pitch>;

  root: Pitch;

  scale: Scale;

  length: number;

  private constructor(dto: Dto) {
    this.root = pitchFromInt(dto[0]);
    this.scale = scaleFromIntervals(...dto[1]);
    this.length = this.scale.length;
    this.pitches = pitchesRootIntervals(this.root, this.scale.rootIntervals);
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
