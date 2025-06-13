import type { Interval } from "intervals/chromatic";
import type { Voicing } from "voicings/chromatic";
import type { Degree, DegreeArray } from "degrees/chromatic";
import type { IDegreeFunc } from "functions/IDegreeFunc";
import type { Func } from "../Func";
import type { Chord, Pitch } from "chromatic";
import { deepFreeze } from "datils/datatypes/objects";
import { stringifyDegree } from "degrees/chromatic/stringify";
import { Pitches as P } from "pitches/chromatic";
import { Chords as C } from "chords/chromatic";
import { getOrCalc } from "../cache";
import { baseDegree, shift, shiftDown, voicing } from "./modifiers";
import { getObjId, type Key as K } from "./caching/key-id";
import { getDegrees } from "./conversions";

export class DegreeFunc implements
Func,
IDegreeFunc<Interval, Degree, Voicing> {
  baseDegree: Degree;

  voicing: Voicing;

  #degrees?: Readonly<DegreeArray>;

  protected constructor(key: K) {
    this.baseDegree = key.degree;
    this.voicing = key.voicing;
    deepFreeze(this);
  }

  getChord(root: Pitch): Chord {
    return getOrCalc( {
      calc: () => {
        const pitchBase = P.shift(root, this.baseDegree);

        return C.fromRootVoicing(pitchBase, this.voicing);
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

  withVoicing(newVoicing: Voicing): DegreeFunc {
    return voicing(this, newVoicing);
  }

  // eslint-disable-next-line accessor-pairs
  get degrees(): Readonly<DegreeArray> {
    if (this.#degrees === undefined)
      this.#degrees = Object.freeze(getDegrees(this));

    return this.#degrees;
  }

  toString() {
    return `${stringifyDegree(this.baseDegree)} (${this.voicing})`;
  }
}
