/* eslint-disable import/no-mutable-exports */
import { A as P_A, AA as P_AA, B as P_B, C as P_C, CC as P_CC, D as P_D, DD as P_DD, E as P_E, F as P_F, FF as P_FF, G as P_G, GG as P_GG } from "pitches/alt";
import { MAJOR, MINOR } from "scales/alt";
import { from } from "../building";
import Key from "../Key";

export function initialize() {
  if (C)
    throw new Error("Cannot initialize twice");

  C = from(P_C, MAJOR);
  CC = from(P_CC, MAJOR);
  D = from(P_D, MAJOR);
  DD = from(P_DD, MAJOR);
  E = from(P_E, MAJOR);
  F = from(P_F, MAJOR);
  FF = from(P_FF, MAJOR);
  G = from(P_G, MAJOR);
  GG = from(P_GG, MAJOR);
  A = from(P_A, MAJOR);
  AA = from(P_AA, MAJOR);
  B = from(P_B, MAJOR);
  Cm = from(P_C, MINOR);
  CCm = from(P_CC, MINOR);
  Dm = from(P_D, MINOR);
  DDm = from(P_DD, MINOR);
  Em = from(P_E, MINOR);
  Fm = from(P_F, MINOR);
  FFm = from(P_FF, MINOR);
  Gm = from(P_G, MINOR);
  GGm = from(P_GG, MINOR);
  Am = from(P_A, MINOR);
  AAm = from(P_AA, MINOR);
  Bm = from(P_B, MINOR);
}

export let C: Key;

export let CC: Key;

export let D: Key;

export let DD: Key;

export let E: Key;

export let F: Key;

export let FF: Key;

export let G: Key;

export let GG: Key;

export let A: Key;

export let AA: Key;

export let B: Key;

export let Cm: Key;

export let CCm: Key;

export let Dm: Key;

export let DDm: Key;

export let Em: Key;

export let Fm: Key;

export let FFm: Key;

export let Gm: Key;

export let GGm: Key;

export let Am: Key;

export let AAm: Key;

export let Bm: Key;
