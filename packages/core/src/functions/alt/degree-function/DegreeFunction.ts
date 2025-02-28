import { lockr } from "@datune/utils/immutables";
import { HarmonicFunction } from "../HarmonicFunction";
import type { Dto } from "./caching/Dto";
import type { Chord } from "chords/alt";
import { Chords } from "chords/alt";
import type { Degree } from "degrees/alt";
import { Degrees } from "degrees/alt";
import type { Key as KeyAlt } from "keys/alt";
import { Pitches } from "pitches/alt";
import type { Pitch } from "pitches/alt";
import type { Voicing } from "voicings/alt";

export class DegreeFunction extends HarmonicFunction {
  degree: Degree;

  voicing: Voicing;

  protected constructor(dto: Dto) {
    super();

    this.degree = dto.degree;
    this.voicing = dto.voicing;
    lockr(this);
  }

  private static create(dto: Dto): DegreeFunction {
    return new DegreeFunction(dto);
  }

  protected calculateChord(key: KeyAlt): Chord {
    const noteBase: Pitch = Pitches.add(key.root, Degrees.toInterval(this.degree));

    return Chords.fromRootVoicing(noteBase, this.voicing);
  }

  toString() {
    return `${this.degree} ${this.voicing}`;
  }
}
