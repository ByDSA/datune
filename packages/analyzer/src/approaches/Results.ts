import { ChordTimeline } from "timelines/ChordTimeline";
import { KeyTimeline } from "timelines";
import { GravitationTimeline } from "timelines/GravitationTimeline";
import { SequentialPointTimeline } from "./listener/SequentialPointTimeline";

export type Results = {
  barTimeline: SequentialPointTimeline<null>;
  beatTimeline: SequentialPointTimeline<null>;
  chordTimeline: ChordTimeline;
  firstChordTimeline: ChordTimeline; // Conforme se va oyendo, sin corregir por bar
  keyTimeline: KeyTimeline;

  gravitationTimeline: GravitationTimeline;
};
