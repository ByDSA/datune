import { fromDiatonicAlts } from "../diatonicAlts";
import Array from "../../Array";
import { A, AA, B, C, CC, D, DD, E, F, FF, G, GG } from "../../constants";
import { toChromatic } from "../../conversions";
import Pitch from "../../Pitch";
import { fixAlts } from "../../fixAlts";
import { Pitch as Diatonic, Pitches as DPitches } from "pitches/diatonic";
import { Pitches as CPitches, Pitch as Chromatic } from "pitches/chromatic";

export default class DiatonicAltBuilder {
  private _note: Chromatic | undefined;

  private _diatonic: Diatonic | undefined;

  private _diatonicAltList: Array | undefined;

  private constructor() {
  }

  static create(): DiatonicAltBuilder {
    return new DiatonicAltBuilder();
  }

  setNote(c: Chromatic): DiatonicAltBuilder {
    this._note = c;

    return this;
  }

  setDiatonic(d: Diatonic): DiatonicAltBuilder {
    this._diatonic = d;

    return this;
  }

  setNoteAltList(...l: Array): DiatonicAltBuilder {
    this._diatonicAltList = l;

    return this;
  }

  build(): Pitch | null {
    if (!this._note)
      return null;

    if (!this._diatonic) {
      if (this._diatonicAltList)
        return getDiatonicAltInListFromNote(this._note, this._diatonicAltList);

      const diatonicAlt = getDiatonicAltFromNote(this._note);

      return diatonicAlt;
    }

    const alts = getAltsFromNoteAndDiatonic(this._note, this._diatonic);

    return fromDiatonicAlts(this._diatonic, alts);
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
