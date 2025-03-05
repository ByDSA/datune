import type { Dto } from "../caching/Dto";
import type { Pitch } from "pitches/chromatic";
import type { Scale } from "scales/chromatic";
import type { Key } from "../Key";
import { toDto as pitchToDto } from "pitches/chromatic/caching/toDto";
import { toDto as scaleToDto } from "scales/symbolic/chromatic/caching/toDto";
import { cache } from "../caching/cache";

export function from(root: Pitch, scale: Scale): Key {
  if (!root || !scale)
    throw new Error(`Root or scale are invalid. Root: ${root}, scale: ${scale}`);

  const dto: Dto = [pitchToDto(root), scaleToDto(scale)];

  return cache.getOrCreate(dto);
}
