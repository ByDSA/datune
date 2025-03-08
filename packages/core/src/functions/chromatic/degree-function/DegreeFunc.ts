import type { Interval } from "intervals/chromatic";
import type { Voicing } from "voicings/chromatic";
import type { Chord } from "chords/chromatic";
import type { Degree } from "degrees/chromatic";
import type { Key } from "keys/chromatic";
import type { Pitch } from "pitches/chromatic";
import { lockr } from "@datune/utils/immutables";
import { Chords as C } from "chords/chromatic";
import { Pitches as P } from "pitches/chromatic";
import { Func } from "../Func";
import { Dto, hashDto } from "./caching/Dto";

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
    const rootInterval = this.degree as Interval;
    const noteBase: Pitch = P.add(key.root, rootInterval);

    return C.fromRootVoicing(noteBase, this.voicing);
  }

  hashCode(): string {
    return hashDto(this);
  }
}
