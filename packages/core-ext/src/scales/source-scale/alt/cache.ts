import { ProcessCache } from "@datune/utils/caching";
import { modes, Scale } from "scales/alt";
import SourceScaleNode from "./SourceScaleNode";

const cache = new ProcessCache<Scale, SourceScaleNode>((scale) => ( {
  sourceScale: scale,
  mode: 1,
} ), (scale: Scale, ret: SourceScaleNode) => addModesOf(ret.sourceScale));

export default cache;

function addModesOf(sourceScale: Scale): void {
  const sourceScaleModes = modes(sourceScale);

  sourceScaleModes.forEach((value, index) => {
    const sourceScaleNode = {
      sourceScale,
      mode: index + 1,
    };

    cache.put(value, sourceScaleNode);
  } );
}
