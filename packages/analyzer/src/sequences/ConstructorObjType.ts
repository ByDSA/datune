/* eslint-disable import/prefer-default-export */
import { WHOLE, ZERO } from "@datune/core/time";
import { TimeLayerConstructorObject } from "@datune/utils/datastructures/timelayer/types";

export function getDefaultConstructorObj(): TimeLayerConstructorObject {
  return {
    startTime: ZERO,
    cellSize: WHOLE,
  };
}

export type SequenceConstructor = Partial<TimeLayerConstructorObject>;
