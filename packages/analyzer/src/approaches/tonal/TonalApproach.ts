import { MusicalDuration } from "@datune/core";
import { MusicalDurations as MD } from "@datune/core";
import { deepMerge } from "datils/datatypes/objects";
import { ChordSequence, FuncSequence, KeySequence, MainFuncSequence, NotesSequence, RhythmSequence } from "../../sequences";
import { ChordSequenceCalculator } from "./ChordSequenceCalculator";
import { ConstructorObjType, DEFAULT_CONSTRUCTOR_OBJ } from "./Constructor";

export type TonalApproach = {
  keySequence: KeySequence;

  keyChordSequence: KeySequence;

  mainFuncSequence: MainFuncSequence;

  funcSequence: FuncSequence;

  rhythmSequence: RhythmSequence;

  notesSequence: NotesSequence;

  chordSequence: ChordSequence;

  maxDuration: MusicalDuration;
};

export function newTonalApproach(obj?: Partial<ConstructorObjType>): TonalApproach {
  const input: ConstructorObjType = deepMerge(DEFAULT_CONSTRUCTOR_OBJ, obj) as ConstructorObjType;
  const ret: TonalApproach = {
    maxDuration: MD.ZERO,
    mainFuncSequence: new MainFuncSequence(),
    funcSequence: new FuncSequence(),
    keyChordSequence: new KeySequence(),
    keySequence: new KeySequence(),
    notesSequence: new NotesSequence(),
    chordSequence: new ChordSequence(),
    rhythmSequence: new RhythmSequence(),
  };

  ret.rhythmSequence.add( {
    event: input.initial.timeSignature,
    from: MD.ZERO,
    to: MD.WHOLE,
  } );

  return ret;
}

export function calculateChords(tonalApproach: TonalApproach) {
  const chordSequenceCalculator = new ChordSequenceCalculator(
    tonalApproach.notesSequence,
    tonalApproach.rhythmSequence,
  );

  tonalApproach.chordSequence = chordSequenceCalculator.calculate();
}
