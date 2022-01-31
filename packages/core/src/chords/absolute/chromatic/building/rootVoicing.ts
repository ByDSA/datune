import { add as shift, Array as SPNArray, SPN } from "spns/chromatic";
import { Voicing } from "voicings/chromatic";
import SPNChord from "../Chord";
import fromSPNs from "./spns";

export default (base: SPN, voicing: Voicing): SPNChord | null => {
  const notes: SPN[] = [];

  for (const rootInterval of voicing) {
    const shiftedSPN = shift(base, rootInterval);

    if (!shiftedSPN)
      return null;

    notes.push(shiftedSPN);
  }

  if (notes.length === 0)
    return null;

  return fromSPNs(...notes as SPNArray);
};
