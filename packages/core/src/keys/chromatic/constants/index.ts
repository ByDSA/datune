import type { Key } from "../Key";
import * as P from "pitches/chromatic/constants";
import * as S from "scales/symbolic/chromatic/constants";
import { from } from "../building";

export function initialize() {
  if (C)
    throw new Error("Already initialized");

  if (!S.MAJOR)
    S.initialize();

  const { MAJOR, MINOR } = S;

  C = from(P.C, MAJOR);
  CC = from(P.CC, MAJOR);
  D = from(P.CC, MAJOR);
  DD = from(P.DD, MAJOR);
  E = from(P.E, MAJOR);
  F = from(P.F, MAJOR);
  FF = from(P.FF, MAJOR);
  G = from(P.G, MAJOR);
  GG = from(P.GG, MAJOR);
  A = from(P.A, MAJOR);
  AA = from(P.AA, MAJOR);
  B = from(P.B, MAJOR);
  Cm = from(P.C, MINOR);
  CCm = from(P.CC, MINOR);
  Dm = from(P.D, MINOR);
  DDm = from(P.DD, MINOR);
  Em = from(P.E, MINOR);
  Fm = from(P.F, MINOR);
  FFm = from(P.FF, MINOR);
  Gm = from(P.G, MINOR);
  GGm = from(P.GG, MINOR);
  Am = from(P.A, MINOR);
  AAm = from(P.AA, MINOR);
  Bm = from(P.B, MINOR);
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
