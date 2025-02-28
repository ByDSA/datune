import { from } from "../building";
import { add } from "../modifiers";
import type { NoteSet } from "../NoteSet";
import { Pitches as P } from "pitches/chromatic";

export function initialize() {
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

export let C5: NoteSet;

export let CC5: NoteSet;

export let D5: NoteSet;

export let DD5: NoteSet;

export let E5: NoteSet;

export let F5: NoteSet;

export let FF5: NoteSet;

export let G5: NoteSet;

export let GG5: NoteSet;

export let A5: NoteSet;

export let AA5: NoteSet;

export let B5: NoteSet;
