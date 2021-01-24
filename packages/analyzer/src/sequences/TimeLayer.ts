import { Time } from '@datune/core';
import { Interval } from '@datune/utils';
import { TemporalEvent } from '../events/TemporalEvent';
import { TemporalNode } from './TemporalNode';
import { Sequence } from './sequence/Sequence';

export interface TimeLayer<E extends TemporalEvent<T>, T extends Time> extends TemporalEvent<T> {
    addNode(node: TemporalNode<E, T>): void;
    addSequenceAt(time: T, timeSequence: Sequence<E, T>): void;
    addSequenceAtEnd(timeSequence: Sequence<E, T>): void;
    addEventAt(time: T, event: E): TemporalNode<E, T>;
    addEventAtEnd(event: E): TemporalNode<E, T>;
    moveNodeTo(node: TemporalNode<E, T>, time: T): TemporalNode<E, T>;
    removeNode(node: TemporalNode<E, T>): TemporalNode<E, T> | undefined;
    removeNodesAt(time: T): TemporalNode<E, T>[];
    removeNodesAtInterval(intervalTime: Interval<T>): TemporalNode<E, T>[];
    getNodesAtInterval(interval: Interval<T>): TemporalNode<E, T>[];
    getNodesAt(time: T): TemporalNode<E, T>[];
    clear(): void;

    nodes: TemporalNode<E, T>[];
}
