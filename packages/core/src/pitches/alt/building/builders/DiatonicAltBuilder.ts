import type { PitchArray } from "../../Array";
import type { Pitch } from "../../Pitch";
import type { Pitch as DPitch } from "pitches/diatonic";
import type { Pitch as CPitch } from "pitches/chromatic";
import { Pitches as DP } from "pitches/diatonic";
import { Pitches as CP } from "pitches/chromatic";
import { fixAlts } from "../../fixAlts";
import { toChromatic } from "../../conversions";
import { A, AA, B, C, CC, D, DD, E, F, FF, G, GG } from "../../constants";
import { fromDiatonicAlts } from "../diatonicAlts";

export class DiatonicAltBuilder {
  #note: CPitch | undefined;

  #diatonic: DPitch | undefined;

  #diatonicAltList: PitchArray | undefined;

  private constructor() {
  }

  static create(): DiatonicAltBuilder {
    return new DiatonicAltBuilder();
  }

  setNote(c: CPitch): DiatonicAltBuilder {
    this.#note = c;

    return this;
  }

  setDiatonic(d: DPitch): DiatonicAltBuilder {
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

      const pitch = getDiatonicAltFromNote(this.#note);

      return pitch;
    }

    const alts = getAltsFromNoteAndDiatonic(this.#note, this.#diatonic);

    return fromDiatonicAlts(this.#diatonic, alts);
  }
}

function getDiatonicAltInListFromNote(
  chromatic: CPitch,
  list: Pitch[],
): Pitch | null {
  for (const diatonicAlt of list) {
    if (toChromatic(diatonicAlt) === chromatic)
      return diatonicAlt;
  }

  return null;
}

function getDiatonicAltFromNote(c: CPitch): Pitch {
  switch (c) {
    case CP.C: return C;
    case CP.CC: return CC;
    case CP.D: return D;
    case CP.DD: return DD;
    case CP.E: return E;
    case CP.F: return F;
    case CP.FF: return FF;
    case CP.G: return G;
    case CP.GG: return GG;
    case CP.A: return A;
    case CP.AA: return AA;
    case CP.B: return B;
    default: throw new Error();
  }
}

function getAltsFromNoteAndDiatonic(chromatic: CPitch, diatonic: DPitch): number {
  let alts = +chromatic - +DP.toChromatic(diatonic);

  alts = fixAlts(alts);

  return alts;
}
