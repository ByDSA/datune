/* eslint-disable import/no-mutable-exports */
import { A as C_A, AA as C_AA, B as C_B, C as C_C, CC as C_CC, D as C_D, DD as C_DD, E as C_E, F as C_F, FF as C_FF, G as C_G, GG as C_GG } from "pitches/chromatic";
import { MAJOR, MINOR } from "scales/chromatic";
import { from } from "../building";
import Key from "../Key";

export function initialize() {
  C = from(C_C, MAJOR);
  CC = from(C_CC, MAJOR);
  D = from(C_CC, MAJOR);
  DD = from(C_DD, MAJOR);
  E = from(C_E, MAJOR);
  F = from(C_F, MAJOR);
  FF = from(C_FF, MAJOR);
  G = from(C_G, MAJOR);
  GG = from(C_GG, MAJOR);
  A = from(C_A, MAJOR);
  AA = from(C_AA, MAJOR);
  B = from(C_B, MAJOR);
  Cm = from(C_C, MINOR);
  CCm = from(C_CC, MINOR);
  Dm = from(C_D, MINOR);
  DDm = from(C_DD, MINOR);
  Em = from(C_E, MINOR);
  Fm = from(C_F, MINOR);
  FFm = from(C_FF, MINOR);
  Gm = from(C_G, MINOR);
  GGm = from(C_GG, MINOR);
  Am = from(C_A, MINOR);
  AAm = from(C_AA, MINOR);
  Bm = from(C_B, MINOR);
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
