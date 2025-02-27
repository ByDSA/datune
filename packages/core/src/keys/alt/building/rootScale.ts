import { Key } from "../Key";
import { cache } from "./cache";
import { Pitch } from "pitches/alt";
import { Scale } from "scales/alt";

export function from(root: Pitch, scale: Scale): Key {
  return cache.getOrCreate( {
    root,
    scale,
  } );
}
