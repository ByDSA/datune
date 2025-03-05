import type { DegreeFunc } from "../degree-function/DegreeFunc";
import { Chords, Chord } from "chords/chromatic";
import { Intervals } from "intervals/chromatic";
import { Key } from "keys/chromatic";
import { DegreeArray, Degrees } from "degrees/chromatic";
import { Func } from "../Func";
import { Dto, hash } from "./caching/Dto";

export class CompoundFunc extends Func {
  degreeFunc: DegreeFunc;

  degreeChain: DegreeArray;

  private constructor(dto: Dto) {
    super();

    this.degreeFunc = dto.degreeFunc;
    this.degreeChain = dto.degreeChain;
  }

  private static create(dto: Dto): CompoundFunc {
    return new CompoundFunc(dto);
  }

  protected calculateChord(key: Key): Chord {
    const baseChord = this.degreeFunc.getChord(key);
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
