import type { Interval } from "intervals/chromatic";
import type { Voicing } from "voicings/chromatic";
import type { Chord } from "chords/chromatic";
import type { Degree } from "degrees/chromatic";
import type { Key } from "keys/chromatic";
import type { Pitch } from "pitches/chromatic";
import { deepFreeze } from "datils/datatypes/objects";
import { Chords as C } from "chords/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { Func } from "../Func";
import { type Key as K, getObjId } from "./caching/key-id";

export class DegreeFunc extends Func {
  degree: Degree;

  voicing: Voicing;

  protected constructor(key: K) {
    super();

    this.degree = key.degree;
    this.voicing = key.voicing;
    deepFreeze(this);
  }

  protected calculateChord(key: Key): Chord {
    const rootInterval = this.degree as Interval;
    const noteBase: Pitch = P.add(key.root, rootInterval);

    return C.fromRootVoicing(noteBase, this.voicing);
  }

  getId(): string {
    return getObjId(this);
  }
}
