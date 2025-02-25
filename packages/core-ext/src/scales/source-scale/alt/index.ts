import { Scale } from "@datune/core/scales/alt";
import cache from "./cache";
import SourceScaleNode from "./SourceScaleNode";

export default function getFromScale(scale: Scale): SourceScaleNode {
  return cache.getOrProcess(scale);
}
