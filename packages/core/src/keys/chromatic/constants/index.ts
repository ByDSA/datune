import { fromRootScale as from } from "../building";
import { Key } from "../Key";
import { Pitches } from "pitches/chromatic";
import { Scales } from "scales/chromatic";

export function initialize() {
  const { MAJOR, MINOR } = Scales;

  C = from(Pitches.C, MAJOR);
  CC = from(Pitches.CC, MAJOR);
  D = from(Pitches.CC, MAJOR);
  DD = from(Pitches.DD, MAJOR);
  E = from(Pitches.E, MAJOR);
  F = from(Pitches.F, MAJOR);
  FF = from(Pitches.FF, MAJOR);
  G = from(Pitches.G, MAJOR);
  GG = from(Pitches.GG, MAJOR);
  A = from(Pitches.A, MAJOR);
  AA = from(Pitches.AA, MAJOR);
  B = from(Pitches.B, MAJOR);
  Cm = from(Pitches.C, MINOR);
  CCm = from(Pitches.CC, MINOR);
  Dm = from(Pitches.D, MINOR);
  DDm = from(Pitches.DD, MINOR);
  Em = from(Pitches.E, MINOR);
  Fm = from(Pitches.F, MINOR);
  FFm = from(Pitches.FF, MINOR);
  Gm = from(Pitches.G, MINOR);
  GGm = from(Pitches.GG, MINOR);
  Am = from(Pitches.A, MINOR);
  AAm = from(Pitches.AA, MINOR);
  Bm = from(Pitches.B, MINOR);
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
