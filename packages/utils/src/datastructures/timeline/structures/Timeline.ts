import type { TimelineNode } from "../node/TimelineNode";
import type { Time } from "../../../time";
import { Interval } from "datils/math/intervals";

export interface Timeline<E> {
    add(...nodes: TimelineNode<E>[]): TimelineNode<E>[];
    addTimeline(timeline: Timeline<E>, at?: Time): TimelineNode<E>[];

    remove(...nodes: TimelineNode<E>[]): TimelineNode<E>[];
    removeAtInterval(interval: Interval<Time>): TimelineNode<E>[];
    clear(): void;

    getAtInterval(interval: Interval<Time>): TimelineNode<E>[];

    moveNode(node: TimelineNode<E>, time: Time): TimelineNode<E> | null;
    moveNodeEndTo(node: TimelineNode<E>, time: Time): TimelineNode<E> | null;

    nodes: readonly TimelineNode<E>[];
    duration: Time;
    startTime: Time;
    cellSize: Time;

    extendNode(node: TimelineNode<E>, interval: Partial<Interval<Time>>): TimelineNode<E>;
}
