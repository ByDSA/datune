import type { DegreeFunc } from "../degree-function/DegreeFunc";
import type { Chord } from "chords/alt";
import type { Degree, DegreeArray } from "degrees/alt";
import type { Interval, Pitch } from "alt";
import type { Func } from "../Func";
import type { ICompoundFunc } from "functions/ICompoundFunc";
import type { CompoundFunc as CCompoundFunc } from "functions/chromatic/compound-function/CompoundFunc";
import type { DegreeArray as CDegreeArray } from "chromatic";
import { compose as cCompose } from "functions/chromatic/compound-function/building/compose";
import { Chords as C } from "chords/alt";
import { Intervals as I } from "intervals/alt";
import { getOrCalc } from "../cache";
import { getId, type Key as K } from "./caching/key-id";

export class CompoundFunc
implements Func, ICompoundFunc<Degree, DegreeFunc> {
  degreeFunc: DegreeFunc;

  degreeChain: Readonly<DegreeArray>;

  private constructor(key: K) {
    this.degreeFunc = Object.freeze(key.degreeFunc);
    this.degreeChain = Object.freeze(key.degreeChain);
  }

  getChord(root: Pitch): Chord {
    return getOrCalc( {
      calc: () => {
        const baseChord = this.degreeFunc.getChord(root);
        let accInterval: Interval = I.P1;

        for (const degree of this.degreeChain)
          accInterval = I.shift(accInterval, degree);

        return C.shift(baseChord, accInterval);
      },
      getId: ()=> `(${+root})|(${getId(this)})`,
    } );
  }

  toChromatic(): CCompoundFunc {
    const dDegreeChain = this.degreeChain.map(d=>d.toChromaticDegree()) as CDegreeArray;

    return cCompose(
      this.degreeFunc.toChromatic(),
      ...dDegreeChain,
    );
  }

  toString() {
    return `${this.degreeFunc}/${this.degreeChain.map(String).join("/")}`;
  }
}
