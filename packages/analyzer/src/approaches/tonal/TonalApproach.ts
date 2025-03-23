import { MusicalDuration } from "@datune/core";
import { WHOLE, ZERO } from "@datune/core/rhythm/tempo/musical-duration/constants";
import { deepMerge } from "datils/datatypes/objects";
import { ChordSequence, FuncSequence, KeySequence, MainFuncSequence, NotesSequence, RhythmSequence } from "../../sequences";
import { ChordSequenceCalculator } from "./ChordSequenceCalculator";
import { ConstructorObjType, DEFAULT_CONSTRUCTOR_OBJ } from "./Constructor";

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
    const input: ConstructorObjType = deepMerge(DEFAULT_CONSTRUCTOR_OBJ, obj) as ConstructorObjType;

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
