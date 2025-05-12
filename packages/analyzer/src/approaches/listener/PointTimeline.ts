import type { Time } from "@datune/utils";
import type { Interval } from "datils/math";

export type PointTimelineNode<E> = {
  event: E;
  time: Time;
};

export interface PointTimeline<E> {
  add(...nodes: PointTimelineNode<E>[]): PointTimelineNode<E>[];
  addTimeline(timeline: PointTimeline<E>, at?: Time): PointTimelineNode<E>[];

  remove(...nodes: PointTimelineNode<E>[]): PointTimelineNode<E>[];
  removeAtInterval(interval: Interval<Time>): PointTimelineNode<E>[];
  clear(): void;

  getAtInterval(interval: Interval<Time>): PointTimelineNode<E>[];

  moveNode(node: PointTimelineNode<E>, time: Time): PointTimelineNode<E> | null;

  nodes: readonly PointTimelineNode<E>[];
  duration: Time;
  startTime: Time;
}
