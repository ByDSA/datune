import type { PitchArray } from "../Array";
import type { Pitch } from "../Pitch";
import { lockr } from "@datune/utils/immutables";
import { Pitches as DPitches } from "pitches/diatonic";
import { fromDiatonicAlts } from "../building/diatonicAlts";

export function initialize() {
  if (C)
    throw new TypeError("C is already initialized");

  C = fromDiatonicAlts(DPitches.C, 0);
  CC = fromDiatonicAlts(DPitches.C, 1);
  CCC = fromDiatonicAlts(DPitches.C, 2);
  CCCC = fromDiatonicAlts(DPitches.C, 3);
  Cb = fromDiatonicAlts(DPitches.C, -1);
  Cbb = fromDiatonicAlts(DPitches.C, -2);
  Cbbb = fromDiatonicAlts(DPitches.C, -3);
  D = fromDiatonicAlts(DPitches.D, 0);
  DD = fromDiatonicAlts(DPitches.D, 1);
  DDD = fromDiatonicAlts(DPitches.D, 2);
  DDDD = fromDiatonicAlts(DPitches.D, 3);
  Db = fromDiatonicAlts(DPitches.D, -1);
  Dbb = fromDiatonicAlts(DPitches.D, -2);
  Dbbb = fromDiatonicAlts(DPitches.D, -3);
  E = fromDiatonicAlts(DPitches.E, 0);
  EE = fromDiatonicAlts(DPitches.E, 1);
  EEE = fromDiatonicAlts(DPitches.E, 2);
  EEEE = fromDiatonicAlts(DPitches.E, 3);
  Eb = fromDiatonicAlts(DPitches.E, -1);
  Ebb = fromDiatonicAlts(DPitches.E, -2);
  Ebbb = fromDiatonicAlts(DPitches.E, -3);
  F = fromDiatonicAlts(DPitches.F, 0);
  FF = fromDiatonicAlts(DPitches.F, 1);
  FFF = fromDiatonicAlts(DPitches.F, 2);
  FFFF = fromDiatonicAlts(DPitches.F, 3);
  Fb = fromDiatonicAlts(DPitches.F, -1);
  Fbb = fromDiatonicAlts(DPitches.F, -2);
  Fbbb = fromDiatonicAlts(DPitches.F, -3);
  G = fromDiatonicAlts(DPitches.G, 0);
  GG = fromDiatonicAlts(DPitches.G, 1);
  GGG = fromDiatonicAlts(DPitches.G, 2);
  GGGG = fromDiatonicAlts(DPitches.G, 3);
  Gb = fromDiatonicAlts(DPitches.G, -1);
  Gbb = fromDiatonicAlts(DPitches.G, -2);
  Gbbb = fromDiatonicAlts(DPitches.G, -3);
  A = fromDiatonicAlts(DPitches.A, 0);
  AA = fromDiatonicAlts(DPitches.A, 1);
  AAA = fromDiatonicAlts(DPitches.A, 2);
  AAAA = fromDiatonicAlts(DPitches.A, 3);
  Ab = fromDiatonicAlts(DPitches.A, -1);
  Abb = fromDiatonicAlts(DPitches.A, -2);
  Abbb = fromDiatonicAlts(DPitches.A, -3);
  B = fromDiatonicAlts(DPitches.B, 0);
  BB = fromDiatonicAlts(DPitches.B, 1);
  BBB = fromDiatonicAlts(DPitches.B, 2);
  BBBB = fromDiatonicAlts(DPitches.B, 3);
  Bb = fromDiatonicAlts(DPitches.B, -1);
  Bbb = fromDiatonicAlts(DPitches.B, -2);
  Bbbb = fromDiatonicAlts(DPitches.B, -3);

  ALL = [] as any;

  for (const diatonic of DPitches.ALL) {
    for (let i = -3; i <= 3; i++)
      ALL.push(fromDiatonicAlts(diatonic, i));
  }

  lockr(ALL);
}

export let C: Pitch;

export let CC: Pitch;

export let CCC: Pitch;

export let CCCC: Pitch;

export let Cb: Pitch;

export let Cbb: Pitch;

export let Cbbb: Pitch;

export let D: Pitch;

export let DD: Pitch;

export let DDD: Pitch;

export let DDDD: Pitch;

export let Db: Pitch;

export let Dbb: Pitch;

export let Dbbb: Pitch;

export let E: Pitch;

export let EE: Pitch;

export let EEE: Pitch;

export let EEEE: Pitch;

export let Eb: Pitch;

export let Ebb: Pitch;

export let Ebbb: Pitch;

export let F: Pitch;

export let FF: Pitch;

export let FFF: Pitch;

export let FFFF: Pitch;

export let Fb: Pitch;

export let Fbb: Pitch;

export let Fbbb: Pitch;

export let G: Pitch;

export let GG: Pitch;

export let GGG: Pitch;

export let GGGG: Pitch;

export let Gb: Pitch;

export let Gbb: Pitch;

export let Gbbb: Pitch;

export let A: Pitch;

export let AA: Pitch;

export let AAA: Pitch;

export let AAAA: Pitch;

export let Ab: Pitch;

export let Abb: Pitch;

export let Abbb: Pitch;

export let B: Pitch;

export let BB: Pitch;

export let BBB: Pitch;

export let BBBB: Pitch;

export let Bb: Pitch;

export let Bbb: Pitch;

export let Bbbb: Pitch;

export let ALL: PitchArray;
