/* eslint-disable no-empty-function */
import { A as C_A, AA as C_AA, B as C_B, C as C_C, CC as C_CC, D as C_D, DD as C_DD, E as C_E, F as C_F, FF as C_FF, G as C_G, GG as C_GG, Pitch as Chromatic } from "pitches/chromatic";
import { Pitch as Diatonic, toChromatic as diatonicToChromatic } from "pitches/diatonic";
import { fromDiatonicAlts } from "..";
import Array from "../../Array";
import { A, AA, B, C, CC, D, DD, E, F, FF, G, GG } from "../../constants";
import { toChromatic } from "../../conversions";
import Pitch from "../../Pitch";
import { fixAlts } from "../../utils";

export default class DiatonicAltBuilder {
  private _note: Chromatic | undefined;

  private _diatonic: Diatonic | undefined;

  private _diatonicAltList: Array | undefined;

  // eslint-disable-next-line no-useless-constructor
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
    case C_C: return C;
    case C_CC: return CC;
    case C_D: return D;
    case C_DD: return DD;
    case C_E: return E;
    case C_F: return F;
    case C_FF: return FF;
    case C_G: return G;
    case C_GG: return GG;
    case C_A: return A;
    case C_AA: return AA;
    case C_B: return B;
    default: throw new Error();
  }
}

function getAltsFromNoteAndDiatonic(chromatic: Chromatic, diatonic: Diatonic): number {
  let alts = +chromatic - +diatonicToChromatic(diatonic);

  alts = fixAlts(alts);

  return alts;
}
