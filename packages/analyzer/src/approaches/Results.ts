import { ChordTimeline } from "timelines/ChordTimeline";
import { NotesTimeline, KeyTimeline } from "timelines";

export type Results = {
  beatTimeline: NotesTimeline;

  chordTimeline: ChordTimeline;

  keyTimeline: KeyTimeline;
};
