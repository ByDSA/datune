import { SpnArray } from "spns/chromatic";
import { Chord } from "../Chord";
import { cache } from "./cache";

export function fromSpns(...spns: SpnArray): Chord {
  return cache.getOrCreate( {
    pitches: spns,
    rootIndex: 0,
  } );
}
