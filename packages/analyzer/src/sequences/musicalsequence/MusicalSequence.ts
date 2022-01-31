import { LinearSequence } from "@datune/utils";
import { getDefaultConstructorObj, SequenceConstructor } from "../ConstructorObjType";

export default class MusicalSequence<E> extends LinearSequence<E> {
  constructor(obj?: SequenceConstructor) {
    super( {
      ...getDefaultConstructorObj(),
      ...obj,
    } );
  }
}
