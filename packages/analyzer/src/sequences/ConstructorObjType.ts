import { WHOLE, ZERO } from "@datune/core/rhythm/tempo/musical-duration/constants";
import { TimeLayerConstructorObject } from "@datune/utils/datastructures/timelayer/types";

export function getDefaultConstructorObj(): TimeLayerConstructorObject {
  return {
    startTime: ZERO,
    cellSize: WHOLE,
  };
}

export type SequenceConstructor = Partial<TimeLayerConstructorObject>;
