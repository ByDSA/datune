import type { Dto } from "./caching/Dto";
import type { Chord } from "chords/alt";
import type { Degree } from "degrees/alt";
import type { Key } from "keys/alt";
import type { Pitch } from "pitches/alt";
import type { Voicing } from "voicings/alt";
import { lockr } from "@datune/utils/immutables";
import { Pitches as P } from "pitches/alt";
import { Chords as C } from "chords/alt";
import { Intervals as I } from "intervals/alt";
import { Func } from "../Func";

export class DegreeFunc extends Func {
  degree: Degree;

  voicing: Voicing;

  protected constructor(dto: Dto) {
    super();

    this.degree = dto.degree;
    this.voicing = dto.voicing;
    lockr(this);
  }

  private static create(dto: Dto): DegreeFunc {
    return new DegreeFunc(dto);
  }

  protected calculateChord(key: Key): Chord {
    const noteBase: Pitch = P.add(key.root, I.fromDegree(this.degree));

    return C.fromRootVoicing(noteBase, this.voicing);
  }

  toString() {
    return `${this.degree} ${this.voicing}`;
  }
}
