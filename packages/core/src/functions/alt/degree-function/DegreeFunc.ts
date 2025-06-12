import type { Key as K } from "./caching/cache";
import type { Chord } from "chords/alt";
import type { Degree } from "degrees/alt";
import type { Pitch } from "pitches/alt";
import type { Voicing } from "voicings/alt";
import { deepFreeze } from "datils/datatypes/objects";
import { Pitches as P } from "pitches/alt";
import { Chords as C } from "chords/alt";
import { type Interval } from "intervals/alt";
import { IDegreeFunc } from "functions/IDegreeFunc";
import { Func } from "../Func";
import { getDegrees } from "./conversions";
import { degree, shift, shiftDown, voicing } from "./modifiers";

export class DegreeFunc
  extends Func
  implements IDegreeFunc<Interval, Degree, Voicing> {
  degree: Degree;

  voicing: Voicing;

  #degrees?: Degree[];

  protected constructor(key: K) {
    super();

    this.degree = key.degree;
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
  get degrees(): Degree[] {
    if (this.#degrees === undefined)
      this.#degrees = getDegrees(this);

    return this.#degrees;
  }

  protected calculateChord(root: Pitch): Chord {
    const pitchBase: Pitch = P.shift(root, this.degree);

    return C.fromRootVoicing(pitchBase, this.voicing);
  }

  toString() {
    return `${this.degree} ${this.voicing}`;
  }
}
