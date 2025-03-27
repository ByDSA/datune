import type { TimelineNode } from "../node/TimelineNode";
import type { Time } from "../../../time";
import { Interval } from "datils/math/intervals";

export type ChangeListener<E> = (
    oldNode: TimelineNode<E>,
    newNode: TimelineNode<E>
    )=> void;

export type AddListener<E> = (node: TimelineNode<E>)=> void;

export type RemoveListener<E> = (node: TimelineNode<E>)=> void;

export interface Timeline<E> {
    add(...nodes: TimelineNode<E>[]): TimelineNode<E>[];
    addTimeline(timeline: Timeline<E>, at?: Time): TimelineNode<E>[];

    remove(...nodes: TimelineNode<E>[]): TimelineNode<E>[];
    removeAtInterval(interval: Interval<Time>): TimelineNode<E>[];
    clear(): void;

    getAtInterval(interval: Interval<Time>): TimelineNode<E>[];

    moveNode(node: TimelineNode<E>, time: Time): TimelineNode<E>;
    moveNodeEndTo(node: TimelineNode<E>, time: Time): TimelineNode<E>;

    nodes: readonly TimelineNode<E>[];
    duration: Time;
    startTime: Time;

    onChange(listener: ChangeListener<E>): void;
    onAdd(listener: AddListener<E>): void;
    onRemove(listener: RemoveListener<E>): void;
}
