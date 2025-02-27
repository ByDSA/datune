import { lockr } from "@datune/utils/immutables";
import { Chord, Chords } from "chords/alt";
import { Degree, Degrees } from "degrees/alt";
import { Key as KeyAlt } from "keys/alt";
import { Pitches, Pitch } from "pitches/alt";
import { Voicing } from "voicings/alt";
import HarmonicFunction from "../HarmonicFunction";
import { Dto } from "./caching";

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
