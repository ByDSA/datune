import { MusicalDuration } from "@datune/core";
import { WHOLE, ZERO } from "@datune/core/time/symbolic/musical-duration/constants";
import { ChordSequence, FuncSequence, KeySequence, MainFuncSequence, NotesSequence, RhythmSequence } from "../../sequences";
import { ChordSequenceCalculator } from "../../sequences/ChordSequenceCalculator";
import { ConstructorObjType, DEFAULT_CONSTRUCTOR_OBJ } from "./Constructor";
import { mergeDeep } from "mergeDeep";

export class TonalApproach {
  keySequence: KeySequence;

  keyChordSequence: KeySequence;

  mainFuncSequence: MainFuncSequence;

  funcSequence: FuncSequence;

  rhythmSequence: RhythmSequence;

  notesSequence: NotesSequence;

  chordSequence: ChordSequence;

  maxDuration: MusicalDuration;

  constructor(obj?: Partial<ConstructorObjType>) {
    const input: ConstructorObjType = {} as any;

    mergeDeep(input, DEFAULT_CONSTRUCTOR_OBJ, obj);

    this.maxDuration = ZERO;
    this.mainFuncSequence = new MainFuncSequence();
    this.funcSequence = new FuncSequence();
    this.keyChordSequence = new KeySequence();
    this.keySequence = new KeySequence();
    this.notesSequence = new NotesSequence();
    this.chordSequence = new ChordSequence();
    this.rhythmSequence = new RhythmSequence();
    this.rhythmSequence.add( {
      event: input.initial.timeSignature,
      from: ZERO,
      to: WHOLE,
    } );
  }

  calculateChords() {
    const chordSequenceCalculator = new ChordSequenceCalculator(
      this.notesSequence,
      this.rhythmSequence,
    );

    this.chordSequence = chordSequenceCalculator.calculate();
  }
}
