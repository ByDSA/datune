import { SequentialTimeline } from "@datune/utils/datastructures/timeline";
import { DEFAULT_TIMELINE_PARAMS } from "../ConstructorObjType";

export class MusicalTimeline<E> extends SequentialTimeline<E> {
  constructor(obj?: ConstructorParameters<typeof SequentialTimeline>[0]) {
    super( {
      ...DEFAULT_TIMELINE_PARAMS,
      ...obj,
    } );
  }
}
