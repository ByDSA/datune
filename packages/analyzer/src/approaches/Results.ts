import { ChordTimeline } from "timelines/ChordTimeline";
import { KeyTimeline } from "timelines";
import { GravitationTimeline } from "timelines/GravitationTimeline";
import { SequentialPointTimeline } from "./listener/SequentialPointTimeline";

export type Results = {
  barTimeline: SequentialPointTimeline<null>;
  beatTimeline: SequentialPointTimeline<null>;
  chordTimeline: ChordTimeline;
  keyTimeline: KeyTimeline;

  gravitationTimeline: GravitationTimeline;
};
