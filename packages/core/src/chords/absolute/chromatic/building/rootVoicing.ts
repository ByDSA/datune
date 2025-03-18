import { type SpnArray, type Spn } from "spns/chromatic";
import { add as spnAdd } from "spns/symbolic/chromatic/modifiers";
import { type Voicing } from "voicings/chromatic";
import { type Chord } from "../Chord";
import { fromSpns } from "./spns";

export function fromRootVoicing(base: Spn, voicing: Voicing): Chord | null {
  const notes: Spn[] = [];

  for (const rootInterval of voicing) {
    const shiftedSpn = spnAdd(base, rootInterval);

    if (!shiftedSpn)
      return null;

    notes.push(shiftedSpn);
  }

  if (notes.length === 0)
    return null;

  return fromSpns(...notes as SpnArray);
};
