import { MusicalDuration } from "@datune/core";
import { MusicalDurations as MD } from "@datune/core";
import { deepMerge } from "datils/datatypes/objects";
import { intervalBetween } from "datils/math";
import { MainFuncTimeline } from "timelines/MainFuncTimeline";
import { FuncTimeline } from "timelines/FuncTimeline";
import { ChordTimeline, KeyTimeline, NotesTimeline, TimeSignatureTimeline } from "../../timelines";
import { ChordTimelineCalculator } from "./ChordTimelineCalculator";
import { ConstructorObjType, DEFAULT_CONSTRUCTOR_OBJ } from "./Constructor";

export type TonalApproach = {
  keyTimeline: KeyTimeline;

  keyChordTimeline: KeyTimeline;

  mainFuncTimeline: MainFuncTimeline;

  funcTimeline: FuncTimeline;

  timeSignatureTimeline: TimeSignatureTimeline;

  notesTimeline: NotesTimeline;

  chordTimeline: ChordTimeline;

  maxDuration: MusicalDuration;
};

export function newTonalApproach(obj?: Partial<ConstructorObjType>): TonalApproach {
  const input: ConstructorObjType = deepMerge(DEFAULT_CONSTRUCTOR_OBJ, obj) as ConstructorObjType;
  const ret: TonalApproach = {
    maxDuration: MD.ZERO,
    mainFuncTimeline: new MainFuncTimeline(),
    funcTimeline: new FuncTimeline(),
    keyChordTimeline: new KeyTimeline(),
    keyTimeline: new KeyTimeline(),
    notesTimeline: new NotesTimeline(),
    chordTimeline: new ChordTimeline(),
    timeSignatureTimeline: new TimeSignatureTimeline(),
  };

  ret.maxDuration = MD.ZERO;
  ret.mainFuncTimeline = new MainFuncTimeline();
  ret.funcTimeline = new FuncTimeline();
  ret.keyChordTimeline = new KeyTimeline();
  ret.keyTimeline = new KeyTimeline();
  ret.notesTimeline = new NotesTimeline();
  ret.chordTimeline = new ChordTimeline();
  ret.timeSignatureTimeline = new TimeSignatureTimeline();
  ret.timeSignatureTimeline.add( {
    event: input.initial.timeSignature,
    interval: intervalBetween(
      MD.ZERO,
      MD.WHOLE,
    ),
  } );

  return ret;
}

export function calculateChords(tonalApproach: TonalApproach) {
  const chordTimelineCalculator = new ChordTimelineCalculator(
    tonalApproach.notesTimeline,
    tonalApproach.timeSignatureTimeline,
  );

  tonalApproach.chordTimeline = chordTimelineCalculator.calculate();
}
