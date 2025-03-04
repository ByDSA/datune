import { QUARTER, ZERO } from "@datune/core/rhythm/tempo/musical-duration/constants";
import { ParallelSequence } from "@datune/utils";
import { TimeLayerConstructorObject } from "@datune/utils/datastructures/timelayer/types";
import { MidiNote } from "./note/MidiNote";

export class MidiSequence extends ParallelSequence<MidiNote> {
  constructor(obj?: Partial<TimeLayerConstructorObject>) {
    const DEFAULT: TimeLayerConstructorObject = {
      startTime: ZERO,
      cellSize: QUARTER,
    };

    super( {
      ...DEFAULT,
      ...obj,
    } );
  }
}
