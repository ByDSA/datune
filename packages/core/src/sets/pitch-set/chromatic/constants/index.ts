import type { PitchSet } from "../PitchSet";
import * as P from "pitches/chromatic/constants";
import { from } from "../building";
import { add } from "../modifiers";

export function initialize() {
  if (C5)
    throw new Error("Already initialized");

  C5 = from(P.C, P.G);

  CC5 = add(C5, 1);

  D5 = add(C5, 2);

  DD5 = add(C5, 3);

  E5 = add(C5, 4);

  F5 = add(C5, 5);

  FF5 = add(C5, 6);

  G5 = add(C5, 7);

  GG5 = add(C5, 8);

  A5 = add(C5, 9);

  AA5 = add(C5, 10);

  B5 = add(C5, 11);
}

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
