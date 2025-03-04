import type { DegreeFunction } from "../degree-function/DegreeFunction";
import { Chords, Chord } from "chords/chromatic";
import { DegreeArray, Degrees } from "degrees/chromatic";
import { Intervals } from "intervals/chromatic";
import { Key } from "keys/chromatic";
import { HarmonicFunction } from "../HarmonicFunction";
import { Dto, hash } from "./caching/Dto";

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

  protected calculateChord(key: Key): Chord {
    const baseChord = this.degreeFunction.getChord(key);
    let accInterval = Intervals.P1;

    for (const degree of this.degreeChain) {
      const rootInterval = Degrees.toInterval(degree);

      accInterval = Intervals.add(accInterval, rootInterval);
    }

    return Chords.add(baseChord, accInterval);
  }

  hashCode(): string {
    return hash(this);
  }
}
