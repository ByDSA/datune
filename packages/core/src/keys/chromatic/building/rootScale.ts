import type { Key as K } from "../caching/cache";
import type { Pitch } from "pitches/chromatic";
import type { Scale } from "scales/chromatic";
import type { Key } from "../Key";
import { getKey as pitchGetKey } from "pitches/chromatic/caching/id";
import { getKey as scaleGetKey } from "scales/symbolic/chromatic/caching/cache";
import { cache } from "../caching/cache";

export function from(root: Pitch, scale: Scale): Key {
  if (!root || !scale)
    throw new Error(`Root or scale are invalid. Root: ${root}, scale: ${scale}`);

  const key: K = [pitchGetKey(root), scaleGetKey(scale)];

  return cache.getOrCreate(key);
}
