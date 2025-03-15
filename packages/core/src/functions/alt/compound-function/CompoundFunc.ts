import type { DegreeFunc } from "../degree-function/DegreeFunc";
import type { Key as K } from "./caching/cache";
import type { Chord } from "chords/alt";
import type { DegreeArray } from "degrees/alt";
import type { Key } from "keys/alt";
import type { Interval } from "intervals/alt";
import { Chords as C } from "chords/alt";
import { Intervals as I } from "intervals/alt";
import { Func } from "../Func";

export class CompoundFunc extends Func {
  degreeFunc: DegreeFunc;

  degreeChain: DegreeArray;

  private constructor(key: K) {
    super();

    this.degreeFunc = key.degreeFunc;
    this.degreeChain = key.degreeChain;
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

    return C.shift(baseChord, accInterval);
  }

  toString() {
    return `${this.degreeFunc}/${this.degreeChain.map(String).join("/")}`;
  }
}
