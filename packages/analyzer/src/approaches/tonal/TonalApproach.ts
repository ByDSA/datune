import { MusicalDuration } from "@datune/core";
import { MusicalDurations as MD } from "@datune/core";
import { deepMerge } from "datils/datatypes/objects";
import { intervalBetween } from "datils/math";
import { MainFuncTimeline } from "timelines/MainFuncTimeline";
import { FuncTimeline } from "timelines/FuncTimeline";
import { ChordTimeline, KeyTimeline, NotesTimeline, TimeSignatureTimeline } from "../../timelines";
import { ChordTimelineCalculator } from "./ChordTimelineCalculator";
import { ConstructorObjType, DEFAULT_CONSTRUCTOR_OBJ } from "./Constructor";

export class TonalApproach {
  keyTimeline: KeyTimeline;

  keyChordTimeline: KeyTimeline;

  mainFuncTimeline: MainFuncTimeline;

  funcTimeline: FuncTimeline;

  timeSignatureTimeline: TimeSignatureTimeline;

  notesTimeline: NotesTimeline;

  chordTimeline: ChordTimeline;

  maxDuration: MusicalDuration;

  constructor(obj?: Partial<ConstructorObjType>) {
    const input: ConstructorObjType = deepMerge(DEFAULT_CONSTRUCTOR_OBJ, obj) as ConstructorObjType;

    this.maxDuration = MD.ZERO;
    this.mainFuncTimeline = new MainFuncTimeline();
    this.funcTimeline = new FuncTimeline();
    this.keyChordTimeline = new KeyTimeline();
    this.keyTimeline = new KeyTimeline();
    this.notesTimeline = new NotesTimeline();
    this.chordTimeline = new ChordTimeline();
    this.timeSignatureTimeline = new TimeSignatureTimeline();
    this.timeSignatureTimeline.add( {
      event: input.initial.timeSignature,
      interval: intervalBetween(
        MD.ZERO,
        MD.WHOLE,
      ),
    } );
  }

  calculateChords() {
    const chordTimelineCalculator = new ChordTimelineCalculator(
      this.notesTimeline,
      this.timeSignatureTimeline,
    );

    this.chordTimeline = chordTimelineCalculator.calculate();
  }
}
