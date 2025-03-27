import { Spn } from "@datune/core/spns/chromatic";
import { ParallelTimeline } from "@datune/utils";
import { DEFAULT_TIMELINE_PARAMS } from "./ConstructorObjType";

export class NotesTimeline extends ParallelTimeline<Spn> {
  constructor(obj?: ConstructorParameters<typeof ParallelTimeline>[0]) {
    super( {
      ...DEFAULT_TIMELINE_PARAMS,
      ...obj,
    } );
  }
}
