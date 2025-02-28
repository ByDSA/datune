import { ProcessCache } from "@datune/utils/caching";
import { Scales, Scale } from "@datune/core/scales/alt";
import { SourceScaleNode } from "./SourceScaleNode";

export const cache = new ProcessCache<Scale, SourceScaleNode>((scale) => ( {
  sourceScale: scale,
  mode: 1,
} ), (_scale: Scale, ret: SourceScaleNode) => addModesOf(ret.sourceScale));

function addModesOf(sourceScale: Scale): void {
  const sourceScaleModes = Scales.modes(sourceScale);

  sourceScaleModes.forEach((value, index) => {
    const sourceScaleNode = {
      sourceScale,
      mode: index + 1,
    };

    cache.put(value, sourceScaleNode);
  } );
}
