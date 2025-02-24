/* eslint-disable import/no-mutable-exports */
import { lockr } from "@datune/utils/immutables";
import { A as D_A, ALL as D_ALL, B as D_B, C as D_C, D as D_D, E as D_E, F as D_F, G as D_G } from "pitches/diatonic";
import Array from "../Array";
import { fromDiatonicAlts } from "../building";
import Pitch from "../Pitch";

export function initialize() {
  if (C)
    throw new TypeError("C is already initialized");

  C = fromDiatonicAlts(D_C, 0);
  CC = fromDiatonicAlts(D_C, 1);
  CCC = fromDiatonicAlts(D_C, 2);
  CCCC = fromDiatonicAlts(D_C, 3);
  Cb = fromDiatonicAlts(D_C, -1);
  Cbb = fromDiatonicAlts(D_C, -2);
  Cbbb = fromDiatonicAlts(D_C, -3);
  D = fromDiatonicAlts(D_D, 0);
  DD = fromDiatonicAlts(D_D, 1);
  DDD = fromDiatonicAlts(D_D, 2);
  DDDD = fromDiatonicAlts(D_D, 3);
  Db = fromDiatonicAlts(D_D, -1);
  Dbb = fromDiatonicAlts(D_D, -2);
  Dbbb = fromDiatonicAlts(D_D, -3);
  E = fromDiatonicAlts(D_E, 0);
  EE = fromDiatonicAlts(D_E, 1);
  EEE = fromDiatonicAlts(D_E, 2);
  EEEE = fromDiatonicAlts(D_E, 3);
  Eb = fromDiatonicAlts(D_E, -1);
  Ebb = fromDiatonicAlts(D_E, -2);
  Ebbb = fromDiatonicAlts(D_E, -3);
  F = fromDiatonicAlts(D_F, 0);
  FF = fromDiatonicAlts(D_F, 1);
  FFF = fromDiatonicAlts(D_F, 2);
  FFFF = fromDiatonicAlts(D_F, 3);
  Fb = fromDiatonicAlts(D_F, -1);
  Fbb = fromDiatonicAlts(D_F, -2);
  Fbbb = fromDiatonicAlts(D_F, -3);
  G = fromDiatonicAlts(D_G, 0);
  GG = fromDiatonicAlts(D_G, 1);
  GGG = fromDiatonicAlts(D_G, 2);
  GGGG = fromDiatonicAlts(D_G, 3);
  Gb = fromDiatonicAlts(D_G, -1);
  Gbb = fromDiatonicAlts(D_G, -2);
  Gbbb = fromDiatonicAlts(D_G, -3);
  A = fromDiatonicAlts(D_A, 0);
  AA = fromDiatonicAlts(D_A, 1);
  AAA = fromDiatonicAlts(D_A, 2);
  AAAA = fromDiatonicAlts(D_A, 3);
  Ab = fromDiatonicAlts(D_A, -1);
  Abb = fromDiatonicAlts(D_A, -2);
  Abbb = fromDiatonicAlts(D_A, -3);
  B = fromDiatonicAlts(D_B, 0);
  BB = fromDiatonicAlts(D_B, 1);
  BBB = fromDiatonicAlts(D_B, 2);
  BBBB = fromDiatonicAlts(D_B, 3);
  Bb = fromDiatonicAlts(D_B, -1);
  Bbb = fromDiatonicAlts(D_B, -2);
  Bbbb = fromDiatonicAlts(D_B, -3);

  ALL = [] as any;

  for (const diatonic of D_ALL) {
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

export let ALL: Array;
