import { SPNArray } from "spns/chromatic";
import { SPNChord } from "../Chord";
import cache from "./cache";

export default function fromSPNs(...spns: SPNArray): SPNChord {
  return cache.getOrCreate(spns);
}
