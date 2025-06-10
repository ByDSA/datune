import type { Interval } from "intervals/chromatic";
import type { Voicing } from "voicings/chromatic";
import type { Chord } from "chords/chromatic";
import type { Degree } from "degrees/chromatic";
import type { Key } from "keys/chromatic";
import type { Pitch } from "pitches/chromatic";
import type { IDegreeFunc } from "functions/IDegreeFunc";
import { deepFreeze } from "datils/datatypes/objects";
import { Chords as C } from "chords/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { stringifyDegree } from "degrees/chromatic/stringify";
import { Func } from "../Func";
import { degree, shift, shiftDown, voicing } from "./modifiers";
import { type Key as K, getObjId } from "./caching/key-id";
import { getDegrees } from "./conversions";

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

  withDegree(newDegree: Degree): DegreeFunc {
    return degree(this, newDegree);
  }

  withVoicing(newVoicing: Voicing): DegreeFunc {
    return voicing(this, newVoicing);
  }

  protected calculateChord(key: Key): Chord {
    const rootInterval = this.degree as Interval;
    const noteBase: Pitch = P.shift(key.root, rootInterval);

    return C.fromRootVoicing(noteBase, this.voicing);
  }

  // eslint-disable-next-line accessor-pairs
  get degrees(): Degree[] {
    if (this.#degrees === undefined)
      this.#degrees = getDegrees(this);

    return this.#degrees;
  }

  getId(): string {
    return getObjId(this);
  }

  toString() {
    return `${stringifyDegree(this.degree)} (${this.voicing})`;
  }
}
