import type { Interval } from "intervals/chromatic";
import type { Voicing } from "voicings/chromatic";
import type { Degree } from "degrees/chromatic";
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
  degree: Degree;

  voicing: Voicing;

  #degrees?: Degree[];

  protected constructor(key: K) {
    this.degree = key.degree;
    this.voicing = key.voicing;
    deepFreeze(this);
  }

  getChord(root: Pitch): Chord {
    return getOrCalc( {
      calc: () => {
        const pitchBase = P.shift(root, this.degree);

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
  get degrees(): Degree[] {
    if (this.#degrees === undefined)
      this.#degrees = getDegrees(this);

    return this.#degrees;
  }

  toString() {
    return `${stringifyDegree(this.degree)} (${this.voicing})`;
  }
}
