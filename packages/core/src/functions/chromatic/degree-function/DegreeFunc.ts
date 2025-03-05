import type { Interval } from "intervals/chromatic";
import type { Voicing } from "voicings/chromatic";
import { lockr } from "@datune/utils/immutables";
import { Chord, Chords } from "chords/chromatic";
import { Degrees, DegreeArray, Degree } from "degrees/chromatic";
import { Key } from "keys/chromatic";
import { Pitches, Pitch } from "pitches/chromatic";
import { Func } from "../Func";
import { Dto, hashDto } from "./caching/Dto";

export class DegreeFunc extends Func {
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

  private static create(dto: Dto): DegreeFunc {
    return new DegreeFunc(dto);
  }

  protected calculateChord(key: Key): Chord {
    const rootInterval = this.degree as Interval;
    const noteBase: Pitch = Pitches.add(key.root, rootInterval);

    return Chords.fromRootVoicing(noteBase, this.voicing);
  }

  hashCode(): string {
    return hashDto(this);
  }
}

function calcDegrees(obj: DegreeFunc): DegreeArray {
  const degrees = [];
  const initialDegree = obj.degree;

  for (const rootIntervalVoicing of obj.voicing) {
    const degree = Degrees.add(initialDegree, rootIntervalVoicing);

    degrees.push(degree);
  }

  return degrees as DegreeArray;
}
