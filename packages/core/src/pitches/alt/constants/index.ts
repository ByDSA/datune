import type { PitchArray } from "../Array";
import type { Pitch } from "../Pitch";
import { lockr } from "@datune/utils/immutables";
import * as DP from "pitches/diatonic/constants";
import { fromDiatonicAlts } from "../building/diatonicAlts";

export function initialize() {
  if (C)
    throw new Error("Already initialized");

  C = fromDiatonicAlts(DP.C, 0);
  CC = fromDiatonicAlts(DP.C, 1);
  CCC = fromDiatonicAlts(DP.C, 2);
  CCCC = fromDiatonicAlts(DP.C, 3);
  Cb = fromDiatonicAlts(DP.C, -1);
  Cbb = fromDiatonicAlts(DP.C, -2);
  Cbbb = fromDiatonicAlts(DP.C, -3);
  D = fromDiatonicAlts(DP.D, 0);
  DD = fromDiatonicAlts(DP.D, 1);
  DDD = fromDiatonicAlts(DP.D, 2);
  DDDD = fromDiatonicAlts(DP.D, 3);
  Db = fromDiatonicAlts(DP.D, -1);
  Dbb = fromDiatonicAlts(DP.D, -2);
  Dbbb = fromDiatonicAlts(DP.D, -3);
  E = fromDiatonicAlts(DP.E, 0);
  EE = fromDiatonicAlts(DP.E, 1);
  EEE = fromDiatonicAlts(DP.E, 2);
  EEEE = fromDiatonicAlts(DP.E, 3);
  Eb = fromDiatonicAlts(DP.E, -1);
  Ebb = fromDiatonicAlts(DP.E, -2);
  Ebbb = fromDiatonicAlts(DP.E, -3);
  F = fromDiatonicAlts(DP.F, 0);
  FF = fromDiatonicAlts(DP.F, 1);
  FFF = fromDiatonicAlts(DP.F, 2);
  FFFF = fromDiatonicAlts(DP.F, 3);
  Fb = fromDiatonicAlts(DP.F, -1);
  Fbb = fromDiatonicAlts(DP.F, -2);
  Fbbb = fromDiatonicAlts(DP.F, -3);
  G = fromDiatonicAlts(DP.G, 0);
  GG = fromDiatonicAlts(DP.G, 1);
  GGG = fromDiatonicAlts(DP.G, 2);
  GGGG = fromDiatonicAlts(DP.G, 3);
  Gb = fromDiatonicAlts(DP.G, -1);
  Gbb = fromDiatonicAlts(DP.G, -2);
  Gbbb = fromDiatonicAlts(DP.G, -3);
  A = fromDiatonicAlts(DP.A, 0);
  AA = fromDiatonicAlts(DP.A, 1);
  AAA = fromDiatonicAlts(DP.A, 2);
  AAAA = fromDiatonicAlts(DP.A, 3);
  Ab = fromDiatonicAlts(DP.A, -1);
  Abb = fromDiatonicAlts(DP.A, -2);
  Abbb = fromDiatonicAlts(DP.A, -3);
  B = fromDiatonicAlts(DP.B, 0);
  BB = fromDiatonicAlts(DP.B, 1);
  BBB = fromDiatonicAlts(DP.B, 2);
  BBBB = fromDiatonicAlts(DP.B, 3);
  Bb = fromDiatonicAlts(DP.B, -1);
  Bbb = fromDiatonicAlts(DP.B, -2);
  Bbbb = fromDiatonicAlts(DP.B, -3);

  ALL = [] as any;

  for (const diatonic of DP.ALL) {
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
