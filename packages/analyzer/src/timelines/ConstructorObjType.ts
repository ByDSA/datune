import { MusicalDurations as MD } from "@datune/core";
import { SequentialTimeline } from "@datune/utils/datastructures/timeline/structures/sequential/Sequential";

export const DEFAULT_TIMELINE_PARAMS: ConstructorParameters<typeof SequentialTimeline>[0] = {
  startTime: MD.ZERO,
  cellSize: MD.WHOLE,
};
