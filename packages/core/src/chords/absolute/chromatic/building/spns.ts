import { SPNChord } from "../Chord";
import { cache } from "./cache";
import { SPNArray } from "spns/chromatic";

export function fromSPNs(...spns: SPNArray): SPNChord {
  return cache.getOrCreate(spns);
}
