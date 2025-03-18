import { Spn } from "@datune/core/spns/chromatic";
import { ParallelSequence } from "@datune/utils";
import { getDefaultConstructorObj, SequenceConstructor } from "../ConstructorObjType";

export class NotesSequence extends ParallelSequence<Spn> {
  constructor(obj?: SequenceConstructor) {
    super( {
      ...getDefaultConstructorObj(),
      ...obj,
    } );
  }
}
