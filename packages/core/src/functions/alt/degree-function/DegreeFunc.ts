import type { Chord } from "chords/alt";
import type { Degree, DegreeArray } from "degrees/alt";
import type { Pitch } from "pitches/alt";
import type { Voicing } from "voicings/alt";
import type { DegreeFunc as CDegreeFunc } from "functions/chromatic/degree-function/DegreeFunc";
import { deepFreeze } from "datils/datatypes/objects";
import { fromDegreeVoicing as cFromDegreeVoicing } from "functions/chromatic/degree-function/building/fromDegreeVoicing";
import { Pitches as P } from "pitches/alt";
import { Chords as C } from "chords/alt";
import { type Interval } from "intervals/alt";
import { IDegreeFunc } from "functions/IDegreeFunc";
import { Func } from "../Func";
import { getOrCalc } from "../cache";
import { getDegrees } from "./conversions";
import { degree, shift, shiftDown, voicing } from "./modifiers";
import { getObjId, type Key as K } from "./caching/key-id";

export class DegreeFunc
implements Func,
   IDegreeFunc<Interval, Degree, Voicing> {
  baseDegree: Degree;

  voicing: Voicing;

  #degrees?: Readonly<DegreeArray>;

  protected constructor(key: K) {
    this.baseDegree = key.degree;
    this.voicing = key.voicing;
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

  withVoicing(newVoicing: Voicing): DegreeFunc {
    return voicing(this, newVoicing);
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

        return C.fromRootVoicing(pitchBase, this.voicing);
      },
      getId: ()=> `(${+root})|(${getObjId(this)})`,
    } );
  }

  toChromatic(): CDegreeFunc {
    return cFromDegreeVoicing(
      this.baseDegree.toChromaticDegree(),
      this.voicing.toChromatic(),
    );
  }

  toString() {
    return `${this.baseDegree} ${this.voicing}`;
  }
}
