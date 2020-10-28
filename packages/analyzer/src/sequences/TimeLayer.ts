import { Time } from '@datune/core/tempo/Time';
import { Interval } from '@datune/utils/Interval';
import { TemporalEvent } from '../events/TemporalEvent';
import { Node } from './Node';
import { Sequence } from './Sequence';

export interface TimeLayer<E extends TemporalEvent<T>, T extends Time> extends TemporalEvent<T> {
    addNode(node: Node<E, T>): void;
    addSequenceAt(time: T, timeSequence: Sequence<E, T>): void;
    addSequenceAtEnd(timeSequence: Sequence<E, T>): void;
    addEventAt(time: T, event: E): Node<E, T>;
    addEventAtEnd(event: E): Node<E, T>;
    moveNodeTo(node: Node<E, T>, time: T): Node<E, T>;
    removeNode(node: Node<E, T>): Node<E, T> | undefined;
    removeNodesAt(time: T): Node<E, T>[];
    removeNodesAtInterval(intervalTime: Interval<T>): Node<E, T>[];
    getNodesAtInterval(interval: Interval<T>): Node<E, T>[];
    getNodesAt(time: T): Node<E, T>[];
    clear(): void;

    nodes: Node<E, T>[];
}
