import { add as chordAdd, Chord } from "chords/chromatic";
import { Array as DegreeArray, toInterval } from "degrees/chromatic";
import { add as intervalAdd, PERFECT_UNISON } from "intervals/chromatic";
import { Key } from "keys/chromatic";
import DegreeFunction from "../degree-function/DegreeFunction";
import HarmonicFunction from "../HarmonicFunction";
import { Dto, hash } from "./caching";

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

  protected calculateChord(key: Key): Chord {
    const baseChord = this.degreeFunction.getChord(key);
    let accInterval = PERFECT_UNISON;

    for (const degree of this.degreeChain) {
      const rootInterval = toInterval(degree);

      accInterval = intervalAdd(accInterval, rootInterval);
    }

    return chordAdd(baseChord, accInterval);
  }

  hashCode(): string {
    return hash(this);
  }
}
