import type { PitchArray } from "../Array";
import type { Pitch } from "../Pitch";
import { lockr } from "@datune/utils/immutables";
import * as DP from "pitches/diatonic/constants";
import { fromDPitchAlts } from "../building/diatonicAlts";

export function initialize() {
  if (C)
    throw new Error("Already initialized");

  C = fromDPitchAlts(DP.C, 0);
  CC = fromDPitchAlts(DP.C, 1);
  CCC = fromDPitchAlts(DP.C, 2);
  CCCC = fromDPitchAlts(DP.C, 3);
  Cb = fromDPitchAlts(DP.C, -1);
  Cbb = fromDPitchAlts(DP.C, -2);
  Cbbb = fromDPitchAlts(DP.C, -3);
  D = fromDPitchAlts(DP.D, 0);
  DD = fromDPitchAlts(DP.D, 1);
  DDD = fromDPitchAlts(DP.D, 2);
  DDDD = fromDPitchAlts(DP.D, 3);
  Db = fromDPitchAlts(DP.D, -1);
  Dbb = fromDPitchAlts(DP.D, -2);
  Dbbb = fromDPitchAlts(DP.D, -3);
  E = fromDPitchAlts(DP.E, 0);
  EE = fromDPitchAlts(DP.E, 1);
  EEE = fromDPitchAlts(DP.E, 2);
  EEEE = fromDPitchAlts(DP.E, 3);
  Eb = fromDPitchAlts(DP.E, -1);
  Ebb = fromDPitchAlts(DP.E, -2);
  Ebbb = fromDPitchAlts(DP.E, -3);
  F = fromDPitchAlts(DP.F, 0);
  FF = fromDPitchAlts(DP.F, 1);
  FFF = fromDPitchAlts(DP.F, 2);
  FFFF = fromDPitchAlts(DP.F, 3);
  Fb = fromDPitchAlts(DP.F, -1);
  Fbb = fromDPitchAlts(DP.F, -2);
  Fbbb = fromDPitchAlts(DP.F, -3);
  G = fromDPitchAlts(DP.G, 0);
  GG = fromDPitchAlts(DP.G, 1);
  GGG = fromDPitchAlts(DP.G, 2);
  GGGG = fromDPitchAlts(DP.G, 3);
  Gb = fromDPitchAlts(DP.G, -1);
  Gbb = fromDPitchAlts(DP.G, -2);
  Gbbb = fromDPitchAlts(DP.G, -3);
  A = fromDPitchAlts(DP.A, 0);
  AA = fromDPitchAlts(DP.A, 1);
  AAA = fromDPitchAlts(DP.A, 2);
  AAAA = fromDPitchAlts(DP.A, 3);
  Ab = fromDPitchAlts(DP.A, -1);
  Abb = fromDPitchAlts(DP.A, -2);
  Abbb = fromDPitchAlts(DP.A, -3);
  B = fromDPitchAlts(DP.B, 0);
  BB = fromDPitchAlts(DP.B, 1);
  BBB = fromDPitchAlts(DP.B, 2);
  BBBB = fromDPitchAlts(DP.B, 3);
  Bb = fromDPitchAlts(DP.B, -1);
  Bbb = fromDPitchAlts(DP.B, -2);
  Bbbb = fromDPitchAlts(DP.B, -3);

  ALL = [] as any;

  for (const diatonic of DP.ALL) {
    for (let i = -3; i <= 3; i++)
      ALL.push(fromDPitchAlts(diatonic, i));
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
