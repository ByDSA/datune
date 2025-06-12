import type { DegreeFunc } from "../degree-function/DegreeFunc";
import type { DegreeArray } from "degrees/chromatic";
import type { Pitch } from "chromatic";
import { Chords as C, type Chord } from "chords/chromatic";
import { Intervals as I } from "intervals/chromatic";
import { stringifyDegree } from "degrees/chromatic/stringify";
import { Func } from "../Func";
import { type Key as K, getObjId } from "./caching/key-id";

export class CompoundFunc extends Func {
  degreeFunc: DegreeFunc;

  degreeChain: DegreeArray;

  #string?: string;

  private constructor(key: K) {
    super();

    this.degreeFunc = key.degreeFunc;
    this.degreeChain = key.degreeChain;
  }

  protected calculateChord(root: Pitch): Chord {
    const baseChord = this.degreeFunc.getChord(root);
    let accInterval = I.P1;

    for (const degree of this.degreeChain) {
      const rootInterval = degree;

      accInterval = I.shift(accInterval, rootInterval);
    }

    return C.shift(baseChord, accInterval);
  }

  getId(): string {
    return getObjId(this);
  }

  toString() {
    if (this.#string === undefined)
      this.#string = this.degreeFunc + "/" + this.degreeChain.map(stringifyDegree).join("/");

    return this.#string;
  }
}
