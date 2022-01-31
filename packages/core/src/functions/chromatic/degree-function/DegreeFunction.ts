import { lockr } from "@datune/utils/immutables";
import { Chord as ChromaticChord, fromRootVoicing as chordFromRootVoicing } from "chords/chromatic";
import { add as degreeAdd, Array as DegreeArray, Degree } from "degrees/chromatic";
import { Interval } from "intervals/chromatic";
import { Key } from "keys/chromatic";
import { add as pitchAdd, Pitch } from "pitches/chromatic";
import { Voicing } from "voicings/chromatic";
import HarmonicFunction from "../HarmonicFunction";
import { Dto, hash } from "./caching";

export default class DegreeFunction extends HarmonicFunction {
  degree: Degree;

  voicing: Voicing;

  degrees: DegreeArray;

  protected constructor(dto: Dto) {
    super();

    this.degree = dto.degree;
    this.voicing = dto.voicing;
    this.degrees = calcDegrees(this);
    lockr(this);
  }

  private static create(dto: Dto): DegreeFunction {
    return new DegreeFunction(dto);
  }

  protected calculateChord(key: Key): ChromaticChord {
    const rootInterval = this.degree as Interval;
    const noteBase: Pitch = pitchAdd(key.root, rootInterval);

    return chordFromRootVoicing(noteBase, this.voicing);
  }

  hashCode(): string {
    return hash(this);
  }
}

function calcDegrees(obj: DegreeFunction): DegreeArray {
  const degrees = [];
  const initialDegree = obj.degree;

  for (const rootIntervalVoicing of obj.voicing) {
    const degree = degreeAdd(initialDegree, rootIntervalVoicing);

    degrees.push(degree);
  }

  return degrees as DegreeArray;
}
