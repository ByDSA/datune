import { MusicalDurations as MD } from "@datune/core";
import { ParallelTimeline } from "@datune/utils/datastructures/timeline/structures/parallel/Parallel";
import { MidiNote } from "./note/MidiNote";

export class MidiTimeline extends ParallelTimeline<MidiNote> {
  constructor(obj?: Partial<ConstructorParameters<typeof ParallelTimeline>[0]>) {
    const DEFAULT = {
      startTime: MD.ZERO,
      cellSize: MD.QUARTER,
    };

    super( {
      ...DEFAULT,
      ...obj,
    } );
  }
}
