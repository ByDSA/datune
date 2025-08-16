import type { DegreeFunc } from "../degree-function/DegreeFunc";
import type { Degree, DegreeArray } from "degrees/chromatic";
import type { Interval, Pitch } from "chromatic";
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

  #degrees?: Readonly<DegreeArray>;

  #accInterval?: Interval;

  private constructor(key: K) {
    this.degreeFunc = key.degreeFunc;
    this.degreeChain = key.degreeChain;
  }

  getChord(root: Pitch): Chord {
    return getOrCalc( {
      calc: () => {
        const baseChord = this.degreeFunc.getChord(root);

        if (this.#accInterval === undefined)
          this.#calcAccInterval();

        return C.shift(baseChord, this.#accInterval!);
      },
      getId: ()=> `(${+root})|(${getId(this)})`,
    } );
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
