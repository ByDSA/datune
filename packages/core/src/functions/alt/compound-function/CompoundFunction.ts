import type { DegreeFunction } from "../degree-function/DegreeFunction";
import { HarmonicFunction } from "../HarmonicFunction";
import type { Dto } from "./caching/Dto";
import type { Chord } from "chords/alt";
import { Chords } from "chords/alt";
import type { DegreeArray } from "degrees/alt";
import { Degrees } from "degrees/alt";
import type { Interval } from "intervals/alt";
import { Intervals } from "intervals/alt";
import type { Key } from "keys/alt";

export class CompoundFunction extends HarmonicFunction {
  degreeFunction: DegreeFunction;

  degreeChain: DegreeArray;

  private constructor(dto: Dto) {
    super();

    this.degreeFunction = dto.degreeFunction;
    this.degreeChain = dto.degreeChain;
  }

  private static create(dto: Dto): CompoundFunction {
    return new CompoundFunction(dto);
  }

  protected calculateChord(key: Key): Chord | null {
    const baseChord = this.degreeFunction.getChord(key);

    if (!baseChord)
      return null;

    let accInterval = Intervals.PERFECT_UNISON;

    for (const degree of this.degreeChain) {
      const rootInterval = Degrees.toInterval(degree);

      accInterval = Intervals.add(accInterval, rootInterval) as Interval;

      if (!accInterval)
        return null;
    }

    return Chords.add(baseChord, accInterval);
  }

  toString() {
    return `${this.degreeFunction}/${this.degreeChain.map(String).join("/")}`;
  }
}
