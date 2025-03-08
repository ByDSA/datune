import type { SourceScaleNode } from "./SourceScaleNode";
import type { Scale } from "@datune/core/scales/alt";
import { cache } from "./cache";

export function findSourceScale(scale: Scale): SourceScaleNode {
  return cache.getOrProcess(scale);
}
