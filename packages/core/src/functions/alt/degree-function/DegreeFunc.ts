import type { Chord } from "chords/alt";
import type { Degree, DegreeArray } from "degrees/alt";
import type { Pitch } from "pitches/alt";
import type { IntervalSet } from "sets/interval-sets/alt";
import type { DegreeFunc as CDegreeFunc } from "functions/chromatic/degree-function/DegreeFunc";
import { deepFreeze } from "datils/datatypes/objects";
import { fromDegreeIntervalSet as cFromDegreeIntervalSet } from "functions/chromatic/degree-function/building/fromDegreeIntervalSet";
import { Pitches as P } from "pitches/alt";
import { Chords as C } from "chords/alt";
import { type Interval } from "intervals/alt";
import { IDegreeFunc } from "functions/IDegreeFunc";
import { stringifyDegree } from "degrees/alt/stringify";
import { Func } from "../Func";
import { getOrCalc } from "../cache";
import { getDegrees } from "./conversions";
import { degree, shift, shiftDown, intervalSet } from "./modifiers";
import { getObjId, type Key as K } from "./caching/key-id";

export class DegreeFunc
implements Func,
   IDegreeFunc<Interval, Degree, IntervalSet> {
  baseDegree: Degree;

  intervalSet: IntervalSet;

  #degrees?: Readonly<DegreeArray>;

  protected constructor(key: K) {
    this.baseDegree = key.degree;
    this.intervalSet = key.intervalSet;
    deepFreeze(this);
  }

  withShifted(interval: Interval): DegreeFunc {
    return shift(this, interval);
  }

  withShiftedDown(interval: Interval): DegreeFunc {
    return shiftDown(this, interval);
  }

  withBaseDegree(newDegree: Degree): DegreeFunc {
    return degree(this, newDegree);
  }

  withIntervalSet(newIntervalSet: IntervalSet): DegreeFunc {
    return intervalSet(this, newIntervalSet);
  }

  // eslint-disable-next-line accessor-pairs
  get degrees(): Readonly<DegreeArray> {
    if (this.#degrees === undefined)
      this.#degrees = Object.freeze(getDegrees(this));

    return this.#degrees;
  }

  getChord(root: Pitch): Chord {
    return getOrCalc( {
      calc: () => {
        const pitchBase = P.shift(root, this.baseDegree);

        return C.fromRootIntervalSet(pitchBase, this.intervalSet);
      },
      getId: ()=> `(${+root})|(${getObjId(this)})`,
    } );
  }

  toChromaticFunc(): CDegreeFunc {
    return cFromDegreeIntervalSet(
      this.baseDegree.toChromaticDegree(),
      this.intervalSet.toChromaticIntervalSet(),
    );
  }

  toString() {
    return `${stringifyDegree(this.baseDegree)}(${this.intervalSet})`;
  }
}
