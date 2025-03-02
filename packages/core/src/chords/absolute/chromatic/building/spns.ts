import { Chord } from "../Chord";
import { cache } from "./cache";
import { SPNArray } from "spns/chromatic";

export function fromSPNs(...spns: SPNArray): Chord {
  return cache.getOrCreate(spns);
}
