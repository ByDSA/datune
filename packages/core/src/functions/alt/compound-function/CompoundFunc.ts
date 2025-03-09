import type { DegreeFunc } from "../degree-function/DegreeFunc";
import type { Dto } from "./caching/Dto";
import type { Chord } from "chords/alt";
import type { DegreeArray } from "degrees/alt";
import type { Key } from "keys/alt";
import { Interval } from "intervals/alt";
import { Chords } from "chords/alt";
import { Intervals as I } from "intervals/alt";
import { Func } from "../Func";

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

  protected calculateChord(key: Key): Chord | null {
    const baseChord = this.degreeFunc.getChord(key);

    if (!baseChord)
      return null;

    let accInterval = I.P1;

    for (const degree of this.degreeChain) {
      const rootInterval = I.fromDegree(degree);

      accInterval = I.add(accInterval, rootInterval) as Interval;

      if (!accInterval)
        return null;
    }

    return Chords.add(baseChord, accInterval);
  }

  toString() {
    return `${this.degreeFunc}/${this.degreeChain.map(String).join("/")}`;
  }
}
