import { MusicalDurations as MD } from "@datune/core";
import { TimeLayerConstructorObject } from "@datune/utils/datastructures/timelayer/types";

export const SEQUENCE_DEFAULT_PARAMS: TimeLayerConstructorObject = {
  startTime: MD.ZERO,
  cellSize: MD.WHOLE,
};

export type SequenceConstructor = Partial<TimeLayerConstructorObject>;
