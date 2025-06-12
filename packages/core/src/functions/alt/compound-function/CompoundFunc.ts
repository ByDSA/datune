import type { DegreeFunc } from "../degree-function/DegreeFunc";
import type { Chord } from "chords/alt";
import type { Degree, DegreeArray } from "degrees/alt";
import type { Pitch } from "alt";
import type { Func } from "../Func";
import type { ICompoundFunc } from "functions/ICompoundFunc";
import { Chords as C } from "chords/alt";
import { Intervals as I } from "intervals/alt";
import { getOrCalc } from "../cache";
import { getId, type Key as K } from "./caching/key-id";

export class CompoundFunc
implements Func, ICompoundFunc<Degree, DegreeFunc> {
  degreeFunc: DegreeFunc;

  degreeChain: DegreeArray;

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
    return `${this.degreeFunc}/${this.degreeChain.map(String).join("/")}`;
  }
}
