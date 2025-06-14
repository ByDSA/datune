import type { Interval } from "intervals/chromatic";
import type { IntervalSet } from "sets/interval-sets/chromatic";
import type { Degree, DegreeArray } from "degrees/chromatic";
import type { IDegreeFunc } from "functions/IDegreeFunc";
import type { Func } from "../Func";
import type { Chord, Pitch } from "chromatic";
import { deepFreeze } from "datils/datatypes/objects";
import { stringifyDegree } from "degrees/chromatic/stringify";
import { Pitches as P } from "pitches/chromatic";
import { Chords as C } from "chords/chromatic";
import { getOrCalc } from "../cache";
import { baseDegree, shift, shiftDown, intervalSets } from "./modifiers";
import { getObjId, type Key as K } from "./caching/key-id";
import { getDegrees } from "./conversions";

export class DegreeFunc implements
Func,
IDegreeFunc<Interval, Degree, IntervalSet> {
  baseDegree: Degree;

  intervalSet: IntervalSet;

  #degrees?: Readonly<DegreeArray>;

  protected constructor(key: K) {
    this.baseDegree = key.degree;
    this.intervalSet = key.intervalSet;
    deepFreeze(this);
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

  withShifted(interval: Interval): DegreeFunc {
    return shift(this, interval);
  }

  withShiftedDown(interval: Interval): DegreeFunc {
    return shiftDown(this, interval);
  }

  withBaseDegree(degree: Degree): DegreeFunc {
    return baseDegree(this, degree);
  }

  withIntervalSet(newIntervalSet: IntervalSet): DegreeFunc {
    return intervalSets(this, newIntervalSet);
  }

  // eslint-disable-next-line accessor-pairs
  get degrees(): Readonly<DegreeArray> {
    if (this.#degrees === undefined)
      this.#degrees = Object.freeze(getDegrees(this));

    return this.#degrees;
  }

  toString() {
    return `${stringifyDegree(this.baseDegree)} (${this.intervalSet})`;
  }
}
