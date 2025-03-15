import type { DegreeFunc } from "../degree-function/DegreeFunc";
import type { Key } from "keys/chromatic";
import type { DegreeArray } from "degrees/chromatic";
import { Chords as C, type Chord } from "chords/chromatic";
import { Intervals as I } from "intervals/chromatic";
import { Func } from "../Func";
import { type Key as K, getObjId } from "./caching/key-id";

export class CompoundFunc extends Func {
  degreeFunc: DegreeFunc;

  degreeChain: DegreeArray;

  private constructor(key: K) {
    super();

    this.degreeFunc = key.degreeFunc;
    this.degreeChain = key.degreeChain;
  }

  protected calculateChord(key: Key): Chord {
    const baseChord = this.degreeFunc.getChord(key);
    let accInterval = I.P1;

    for (const degree of this.degreeChain) {
      const rootInterval = I.fromDegree(degree);

      accInterval = I.add(accInterval, rootInterval);
    }

    return C.shift(baseChord, accInterval);
  }

  getId(): string {
    return getObjId(this);
  }
}
