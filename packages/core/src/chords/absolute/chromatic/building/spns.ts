import { Array as SPNArray } from "spns/chromatic";
import Chord from "../Chord";
import cache from "./cache";

export default function fromSPNs(...spns: SPNArray): Chord {
  return cache.getOrCreate(spns);
}
