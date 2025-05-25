import type { PitchSet } from "../PitchSet";
import * as P from "pitches/chromatic/constants";
import { fromPitches } from "../building";
import { shift } from "../modifiers";

export function initialize() {
  if (C5)
    throw new Error("Already initialized");

  EMPTY = fromPitches();

  C5 = fromPitches(P.C, P.G);

  CC5 = shift(C5, 1);

  D5 = shift(C5, 2);

  DD5 = shift(C5, 3);

  E5 = shift(C5, 4);

  F5 = shift(C5, 5);

  FF5 = shift(C5, 6);

  G5 = shift(C5, 7);

  GG5 = shift(C5, 8);

  A5 = shift(C5, 9);

  AA5 = shift(C5, 10);

  B5 = shift(C5, 11);
}

export let EMPTY: PitchSet;

export let C5: PitchSet;

export let CC5: PitchSet;

export let D5: PitchSet;

export let DD5: PitchSet;

export let E5: PitchSet;

export let F5: PitchSet;

export let FF5: PitchSet;

export let G5: PitchSet;

export let GG5: PitchSet;

export let A5: PitchSet;

export let AA5: PitchSet;

export let B5: PitchSet;
