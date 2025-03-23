import { Spn } from "@datune/core/spns/chromatic";
import { ParallelSequence } from "@datune/utils";
import { SEQUENCE_DEFAULT_PARAMS, SequenceConstructor } from "./ConstructorObjType";

export class NotesSequence extends ParallelSequence<Spn> {
  constructor(obj?: SequenceConstructor) {
    super( {
      ...SEQUENCE_DEFAULT_PARAMS,
      ...obj,
    } );
  }
}
