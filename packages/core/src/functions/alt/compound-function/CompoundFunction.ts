import { add as chordAdd, Chord } from "chords/alt";
import { Array as DegreeArray, toInterval } from "degrees/alt";
import { add as intervalAdd, Interval, PERFECT_UNISON } from "intervals/alt";
import { Key } from "keys/alt";
import DegreeFunction from "../degree-function/DegreeFunction";
import HarmonicFunction from "../HarmonicFunction";
import { Dto } from "./caching";

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

    let accInterval = PERFECT_UNISON;

    for (const degree of this.degreeChain) {
      const rootInterval = toInterval(degree);

      accInterval = intervalAdd(accInterval, rootInterval) as Interval;

      if (!accInterval)
        return null;
    }

    return chordAdd(baseChord, accInterval);
  }

  toString() {
    return `${this.degreeFunction}/${this.degreeChain.map(String).join("/")}`;
  }
}
