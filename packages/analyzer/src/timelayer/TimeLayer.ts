import { Time } from '@datune/core/tempo/Time';
import { Interval } from '@datune/utils/Interval';
import { TemporalEvent } from './TemporalEvent';
import { TemporalNode } from './TemporalNode';
import { TimeSequence } from './TimeSequence';

export interface TimeLayer<E extends TemporalEvent<T>, T extends Time> extends TemporalEvent<T> {
    addNode(node: TemporalNode<E, T>): void;
    addSequenceAt(time: T, timeSequence: TimeSequence<E, T>): void;
    addSequenceAtEnd(timeSequence: TimeSequence<E, T>): void;
    addEventAt(time: T, event: E): TemporalNode<E, T>;
    addEventAtEnd(event: E): TemporalNode<E, T>;
    moveNodeTo(node: TemporalNode<E, T>, time: T): TemporalNode<E, T>;
    removeNode(node: TemporalNode<E, T>): boolean;
    removeNodesAt(time: T): void;
    removeNodesAtInterval(intervalTime: Interval<T>): void;
    getNodesAtInterval(interval: Interval<T>): TemporalNode<E, T>[];
    getNodesAt(time: T): TemporalNode<E, T>[];
    clear(): void;

    nodes: TemporalNode<E, T>[];
}
