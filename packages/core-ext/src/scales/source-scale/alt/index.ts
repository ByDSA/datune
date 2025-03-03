import { Scale } from "@datune/core/scales/alt";
import { cache } from "./cache";
import type { SourceScaleNode } from "./SourceScaleNode";

export function getFromScale(scale: Scale): SourceScaleNode {
  return cache.getOrProcess(scale);
}
