import { SequentialTimeline } from "@datune/utils/datastructures/timeline";
import { MidiTimeline } from "@datune/midi";
import { ChordTimeline } from "timelines/ChordTimeline";
import { NotesTimeline, KeyTimeline } from "timelines";
import { GravitationTimeline } from "timelines/GravitationTimeline";
import { classifyPerception } from "./listener/perception/perception";

export type Results = {
  beatTimeline: NotesTimeline;

  readNotesTimeline: MidiTimeline;
  chordTimeline: ChordTimeline;
  keyTimeline: KeyTimeline;

  gravitationTimeline: GravitationTimeline;

  perceptualMidiTimeline: SequentialTimeline<ReturnType<typeof classifyPerception>>;
};
