import { LinearSequence } from "@datune/utils";
import { getDefaultConstructorObj, SequenceConstructor } from "../ConstructorObjType";

export class MusicalSequence<E> extends LinearSequence<E> {
  constructor(obj?: SequenceConstructor) {
    super( {
      ...getDefaultConstructorObj(),
      ...obj,
    } );
  }
}
