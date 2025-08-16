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
import { stringifyDegree } from "degrees/alt/stringify";
import { getOrCalc } from "../cache";
import { getId, type Key as K } from "./caching/key-id";

export class CompoundFunc
implements Func, ICompoundFunc<Degree, DegreeFunc> {
  degreeFunc: DegreeFunc;

  degreeChain: Readonly<DegreeArray>;

  #string?: string;

  #degrees?: Readonly<DegreeArray>;

  #accInterval?: Interval;

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

  toChromaticFunc(): CCompoundFunc {
    const dDegreeChain = this.degreeChain.map(d=>d.toChromaticDegree()) as CDegreeArray;

    return cCompose(
      this.degreeFunc.toChromaticFunc(),
      ...dDegreeChain,
    );
  }

  #calcAccInterval(): void {
    this.#accInterval = I.P1;

    for (const degree of this.degreeChain)
      this.#accInterval = I.shift(this.#accInterval, degree);
  }

  toString() {
    if (this.#string === undefined)
      this.#string = `${this.degreeFunc}/${this.degreeChain.map(stringifyDegree).join("/")}`;

    return this.#string;
  }

  // eslint-disable-next-line accessor-pairs
  get degrees(): Readonly<DegreeArray> {
    if (this.#degrees === undefined) {
      if (this.#accInterval === undefined)
        this.#calcAccInterval();

      this.#degrees = this.degreeFunc.degrees
        .map(d=> I.shift(d, this.#accInterval!)) as DegreeArray;
    }

    return this.#degrees;
  }
}
