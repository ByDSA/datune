import { DegreeFunction } from "../degree-function/DegreeFunction";
import HarmonicFunction from "../HarmonicFunction";
import { Dto } from "./caching";
import { Chords, Chord } from "chords/alt";
import { DegreeArray, Degrees } from "degrees/alt";
import { Intervals, Interval } from "intervals/alt";
import { Key } from "keys/alt";

export default class CompoundFunction extends HarmonicFunction {
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
