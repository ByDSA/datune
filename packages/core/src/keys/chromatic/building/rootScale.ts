import { Dto } from "../caching/Dto";
import { cache } from "../caching/cache";
import { Key } from "../Key";
import { Pitch } from "pitches/chromatic";
import pitchToDto from "pitches/chromatic/caching/toDto";
import { Scale } from "scales/chromatic";
import scaleToDto from "scales/symbolic/chromatic/caching/toDto";

export function fromRootScale(root: Pitch, scale: Scale): Key {
  if (!root || !scale)
    throw new Error(`Root or scale are invalid. Root: ${root}, scale: ${scale}`);

  const dto: Dto = [pitchToDto(root), scaleToDto(scale)];

  return cache.getOrCreate(dto);
}
