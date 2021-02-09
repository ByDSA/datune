import { Interval } from "../../math/interval/Interval";
import { ImmutableTime } from "../../time/ImmutableTime";
import { TemporalNode } from "./temporalnode/TemporalNode";

export type SequenceChangeListener<E, T extends ImmutableTime> = (oldNode: TemporalNode<E, T>, newNode: TemporalNode<E, T>) => void;
export type SequenceAddListener<E, T extends ImmutableTime> = (node: TemporalNode<E, T>) => void;
export type SequenceRemoveListener<E, T extends ImmutableTime> = (node: TemporalNode<E, T>) => void;

export interface TimeLayer<E, T extends ImmutableTime> {
    addNode(node: TemporalNode<E, T>): void;
    addTimeLayer(timeSequence: TimeLayer<E, T>, time?: T): void;
    addEvent(event: E, time?: T): TemporalNode<E, T>;
    removeNodesAt(time: T): TemporalNode<E, T>[];
    removeNodesAtInterval(intervalTime: Interval<T>): TemporalNode<E, T>[];
    getNodesAtInterval(interval: Interval<T>): TemporalNode<E, T>[];
    getNodesAt(time: T): TemporalNode<E, T>[];
    clear(): void;
    removeNode(node: TemporalNode<E, T>): TemporalNode<E, T> | null;
    moveNodeBeginTo(node: TemporalNode<E, T>, time: T): TemporalNode<E, T>;
    moveNodeEndTo(node: TemporalNode<E, T>, time: T): TemporalNode<E, T>;

    nodes: readonly TemporalNode<E, T>[];
    duration: T;

    onChange(listener: SequenceChangeListener<E, T>): void;
    onAdd(listener: SequenceAddListener<E, T>): void;
    onRemove(listener: SequenceRemoveListener<E, T>): void;
}
