import { ChordTimeline } from "timelines/ChordTimeline";
import { NotesTimeline, KeyTimeline } from "timelines";
import { GravitationTimeline } from "timelines/GravitationTimeline";

export type Results = {
  beatTimeline: NotesTimeline;

  chordTimeline: ChordTimeline;

  keyTimeline: KeyTimeline;

  gravitationTimeline: GravitationTimeline;
};
