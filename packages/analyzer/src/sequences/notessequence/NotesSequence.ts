import { SPN } from "@datune/core/spns/chromatic";
import { ParallelSequence } from "@datune/utils";
import { getDefaultConstructorObj, SequenceConstructor } from "../ConstructorObjType";

export class NotesSequence extends ParallelSequence<SPN> {
  constructor(obj?: SequenceConstructor) {
    super( {
      ...getDefaultConstructorObj(),
      ...obj,
    } );
  }
}
