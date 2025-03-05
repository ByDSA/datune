import type { Pitch } from "pitches/alt";
import type { Scale } from "scales/alt";
import type { Key } from "../Key";
import { cache } from "./caching/cache";

export function from(root: Pitch, scale: Scale): Key {
  return cache.getOrCreate( {
    root,
    scale,
  } );
}
