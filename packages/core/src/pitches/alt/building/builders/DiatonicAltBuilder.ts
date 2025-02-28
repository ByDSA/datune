import { fromDiatonicAlts } from "../diatonicAlts";
import type { PitchArray } from "../../Array";
import { A, AA, B, C, CC, D, DD, E, F, FF, G, GG } from "../../constants";
import { toChromatic } from "../../conversions";
import type { Pitch } from "../../Pitch";
import { fixAlts } from "../../fixAlts";
import type { Pitch as Diatonic } from "pitches/diatonic";
import { Pitches as DPitches } from "pitches/diatonic";
import type { Pitch as Chromatic } from "pitches/chromatic";
import { Pitches as CPitches } from "pitches/chromatic";

export class DiatonicAltBuilder {
  #note: Chromatic | undefined;

  #diatonic: Diatonic | undefined;

  #diatonicAltList: PitchArray | undefined;

  private constructor() {
  }

  static create(): DiatonicAltBuilder {
    return new DiatonicAltBuilder();
  }

  setNote(c: Chromatic): DiatonicAltBuilder {
    this.#note = c;

    return this;
  }

  setDiatonic(d: Diatonic): DiatonicAltBuilder {
    this.#diatonic = d;

    return this;
  }

  setNoteAltList(...l: PitchArray): DiatonicAltBuilder {
    this.#diatonicAltList = l;

    return this;
  }

  build(): Pitch | null {
    if (!this.#note)
      return null;

    if (!this.#diatonic) {
      if (this.#diatonicAltList)
        return getDiatonicAltInListFromNote(this.#note, this.#diatonicAltList);

      const diatonicAlt = getDiatonicAltFromNote(this.#note);

      return diatonicAlt;
    }

    const alts = getAltsFromNoteAndDiatonic(this.#note, this.#diatonic);

    return fromDiatonicAlts(this.#diatonic, alts);
  }
}

function getDiatonicAltInListFromNote(
  chromatic: Chromatic,
  list: Pitch[],
): Pitch | null {
  for (const diatonicAlt of list) {
    if (toChromatic(diatonicAlt) === chromatic)
      return diatonicAlt;
  }

  return null;
}

function getDiatonicAltFromNote(c: Chromatic): Pitch {
  switch (c) {
    case CPitches.C: return C;
    case CPitches.CC: return CC;
    case CPitches.D: return D;
    case CPitches.DD: return DD;
    case CPitches.E: return E;
    case CPitches.F: return F;
    case CPitches.FF: return FF;
    case CPitches.G: return G;
    case CPitches.GG: return GG;
    case CPitches.A: return A;
    case CPitches.AA: return AA;
    case CPitches.B: return B;
    default: throw new Error();
  }
}

function getAltsFromNoteAndDiatonic(chromatic: Chromatic, diatonic: Diatonic): number {
  let alts = +chromatic - +DPitches.toChromatic(diatonic);

  alts = fixAlts(alts);

  return alts;
}
