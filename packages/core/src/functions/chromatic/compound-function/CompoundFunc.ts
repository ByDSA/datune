import type { DegreeFunc } from "../degree-function/DegreeFunc";
import type { Degree, DegreeArray } from "degrees/chromatic";
import type { Pitch } from "chromatic";
import { Chords as C, type Chord } from "chords/chromatic";
import { Intervals as I } from "intervals/chromatic";
import { stringifyDegree } from "degrees/chromatic/stringify";
import { ICompoundFunc } from "functions/ICompoundFunc";
import { Func } from "../Func";
import { getOrCalc } from "../cache";
import { type Key as K, getId } from "./caching/key-id";

export class CompoundFunc implements
Func,
ICompoundFunc<Degree, DegreeFunc> {
  degreeFunc: DegreeFunc;

  degreeChain: Readonly<DegreeArray>;

  #string?: string;

  private constructor(key: K) {
    this.degreeFunc = key.degreeFunc;
    this.degreeChain = key.degreeChain;
  }

  getChord(root: Pitch): Chord {
    return getOrCalc( {
      calc: () => {
        const baseChord = this.degreeFunc.getChord(root);
        let accInterval = I.P1;

        for (const degree of this.degreeChain)
          accInterval = I.shift(accInterval, degree);

        return C.shift(baseChord, accInterval);
      },
      getId: ()=> `(${+root})|(${getId(this)})`,
    } );
  }

  toString() {
    if (this.#string === undefined)
      this.#string = this.degreeFunc + "/" + this.degreeChain.map(stringifyDegree).join("/");

    return this.#string;
  }
}
