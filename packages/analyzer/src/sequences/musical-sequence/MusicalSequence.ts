import { LinearSequence } from "@datune/utils";
import { SEQUENCE_DEFAULT_PARAMS, SequenceConstructor } from "../ConstructorObjType";

export class MusicalSequence<E> extends LinearSequence<E> {
  constructor(obj?: SequenceConstructor) {
    super( {
      ...SEQUENCE_DEFAULT_PARAMS,
      ...obj,
    } );
  }
}
