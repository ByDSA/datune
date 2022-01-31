import { lockr } from "@datune/utils/immutables";
import { Chord as ChordAlt, fromRootVoicing as chordFromRootVoicing } from "chords/alt";
import { Degree, toInterval as degreeAltToInterval } from "degrees/alt";
import { Key as KeyAlt } from "keys/alt";
import { add as pitchAdd, Pitch as DiatonicAlt } from "pitches/alt";
import { Voicing } from "voicings/alt";
import HarmonicFunction from "../HarmonicFunction";
import { Dto } from "./caching";

export default class DegreeFunction extends HarmonicFunction {
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

  protected calculateChord(key: KeyAlt): ChordAlt {
    const noteBase: DiatonicAlt = pitchAdd(key.root, degreeAltToInterval(this.degree));

    return chordFromRootVoicing(noteBase, this.voicing);
  }

  toString() {
    return `${this.degree} ${this.voicing}`;
  }
}
