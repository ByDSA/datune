import type { Pitch } from "pitches/alt";
import { Scale } from "scales/alt";
import { Key } from "../Key";
import { cache } from "./caching/cache";

export function from(root: Pitch, scale: Scale): Key {
  return cache.getOrCreate( {
    root,
    scale,
  } );
}
