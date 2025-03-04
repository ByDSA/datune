import { SPNs, type SPNArray, type SPN } from "spns/chromatic";
import { type Voicing } from "voicings/chromatic";
import { type Chord } from "../Chord";
import { fromSPNs } from "./spns";

export function fromRootVoicing(base: SPN, voicing: Voicing): Chord | null {
  const notes: SPN[] = [];

  for (const rootInterval of voicing) {
    const shiftedSpn = SPNs.add(base, rootInterval);

    if (!shiftedSpn)
      return null;

    notes.push(shiftedSpn);
  }

  if (notes.length === 0)
    return null;

  return fromSPNs(...notes as SPNArray);
};
