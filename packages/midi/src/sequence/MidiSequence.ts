import { MusicalDurations as MD } from "@datune/core";
import { ParallelSequence } from "@datune/utils";
import { TimeLayerConstructorObject } from "@datune/utils/datastructures/timelayer/types";
import { MidiNote } from "./note/MidiNote";

export class MidiSequence extends ParallelSequence<MidiNote> {
  constructor(obj?: Partial<TimeLayerConstructorObject>) {
    const DEFAULT: TimeLayerConstructorObject = {
      startTime: MD.ZERO,
      cellSize: MD.QUARTER,
    };

    super( {
      ...DEFAULT,
      ...obj,
    } );
  }
}
