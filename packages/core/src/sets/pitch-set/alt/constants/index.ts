import type { PitchSet } from "../PitchSet";
import { Pitches as P } from "pitches/alt";
import { Intervals as I } from "intervals/symbolic/alt";
import { fromPitches } from "../building";
import { shift } from "../modifiers";

export function initialize() {
  if (C5)
    throw new Error("Already initialized");

  EMPTY = fromPitches();

  C5 = fromPitches(P.C, P.G);

  CC5 = shift(C5, I.a1);

  D5 = shift(C5, I.M2);

  Eb5 = shift(C5, I.m3);

  E5 = shift(C5, I.M3);

  F5 = shift(C5, I.P4);

  Gb5 = shift(C5, I.d5);

  G5 = shift(C5, I.P5);

  GG5 = shift(C5, I.a5);

  A5 = shift(C5, I.M6);

  Bb5 = shift(C5, I.m7);

  B5 = shift(C5, I.M7);
}

export let EMPTY: PitchSet;

export let C5: PitchSet;

export let CC5: PitchSet;

export let D5: PitchSet;

export let Eb5: PitchSet;

export let E5: PitchSet;

export let F5: PitchSet;

export let Gb5: PitchSet;

export let G5: PitchSet;

export let GG5: PitchSet;

export let A5: PitchSet;

export let Bb5: PitchSet;

export let B5: PitchSet;
