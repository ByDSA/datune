import { Time } from '@datune/core/tempo/Time';
import { Interval } from '@datune/utils/Interval';
import TreeMap from 'ts-treemap';
import { TemporalEvent } from '../events/TemporalEvent';
import { Node } from './Node';
import { TimeLayer } from './TimeLayer';

export type SequenceChangeListener<E extends TemporalEvent<T>, T extends Time> = (oldNode: Node<E, T>, newNode: Node<E, T>) => void;
export type SequenceAddListener<E extends TemporalEvent<T>, T extends Time> = (node: Node<E, T>) => void;
export type SequenceRemoveListener<E extends TemporalEvent<T>, T extends Time> = (node: Node<E, T>) => void;

export abstract class Sequence<E extends TemporalEvent<T>, T extends Time>
    implements TimeLayer<E, T>, TemporalEvent<T> {

    private cells: TreeMap<number, Node<E, T>[]>;
    private _nodes: Node<E, T>[];

    private _onChangeListeners: SequenceChangeListener<E, T>[];
    private _onAddListeners: SequenceAddListener<E, T>[];
    private _onRemoveListeners: SequenceRemoveListener<E, T>[];

    protected constructor(private _cellSize: T) {
        this.clear();

        this._onChangeListeners = [];
        this._onAddListeners = [];
        this._onRemoveListeners = [];
    }

    private _getCellIndexFromTime(time: T): number {
        return time.withDivCell(this._cellSize);
    }

    private _getCellFromTime(time: T): Node<E, T>[] {
        let index: number = this._getCellIndexFromTime(time);
        return this._getCellFromIndex(index);
    }

    private _getCellFromIndex(index: number): Node<E, T>[] {
        let cell = this.cells.get(index);
        if (!cell) {
            cell = [];
            this.cells.set(index, cell);
        }

        return cell;
    }

    addOnChangeListener(listener: SequenceChangeListener<E, T>) {
        this._onChangeListeners.push(listener);
    }

    private _callOnChangeListeners(oldNode: Node<E, T>, newNode: Node<E, T>) {
        for (const f of this._onChangeListeners)
            f(oldNode, newNode);
    }

    private _callOnAddListeners(node: Node<E, T>) {
        for (const f of this._onAddListeners)
            f(node);
    }

    private _callOnRemoveListeners(node: Node<E, T>) {
        for (const f of this._onRemoveListeners)
            f(node);
    }

    addOnAddListener(listener: SequenceAddListener<E, T>) {
        this._onAddListeners.push(listener);
    }

    addOnRemoveListener(listener: SequenceRemoveListener<E, T>) {
        this._onRemoveListeners.push(listener);
    }

    addNode(node: Node<E, T>): void {
        this._forEachCellsAtInterval(node.interval, cell => cell.push(node));

        this._nodes.push(node);

        this._callOnAddListeners(node);
    }

    addSequenceAt(time: T, timeSequence: Sequence<E, T>): void {
        for (let eventSource of timeSequence.nodes) {
            let event: Node<E, T> = <Node<E, T>>Node.createFrom(time.withAdd(eventSource.from), eventSource.event);
            this.addNode(event);
        }
    }

    addSequenceAtEnd(midiSequence: Sequence<E, T>): void {
        this.addSequenceAt(this.duration, midiSequence)
    }

    addEventAt(time: T, event: E): Node<E, T> {
        let node = Node.createFrom(time, event);
        this.addNode(node);

        return node;
    }

    addEventAtEnd(event: E): Node<E, T> {
        const time = this.duration;
        let node = Node.createFrom(time, event);
        this.addNode(node);

        return node;
    }

    moveNodeTo(node: Node<E, T>, time: T): Node<E, T> {
        this.removeNode(node);
        const ret = this.addEventAt(time, node.event);

        this._callOnChangeListeners(node, ret);
        return ret;
    }

    private _forEachCellsAtInterval(interval: Interval<T>, f: (cell: Node<E, T>[]) => void) {
        let iniCell: number = this._getCellIndexFromTime(interval.from);
        let endCell: number = this._getCellIndexFromTime(interval.to);

        // Fix open Interval
        if (interval.to == this.cellSize.withMult(endCell))
            endCell--;

        for (let i: number = iniCell; i <= endCell; i++) {
            let cell: Node<E, T>[] = this._getCellFromIndex(i);

            f(cell);
        }
    }

    private _forEachCellNodesAtInterval(interval: Interval<T>, f: (node: Node<E, T>, cell: Node<E, T>[]) => void): void {
        let iniCell: number = this._getCellIndexFromTime(interval.from);
        let endCell: number = this._getCellIndexFromTime(interval.to);

        let ret: Node<E, T>[] = [];
        for (let i: number = iniCell; i <= endCell; i++) {
            let cell: Node<E, T>[] = this._getCellFromIndex(i);

            for (let node of cell) {
                if (interval.intersects(node.interval))
                    f(node, cell);
            }
        }
    }

    getNodesAtInterval(interval: Interval<T>): Node<E, T>[] {
        let ret: Node<E, T>[] = [];
        this._forEachCellNodesAtInterval(interval, (node) => ret.push(node));

        return ret;
    }

    getNodesAt(time: T): Node<E, T>[] {
        let ret: Node<E, T>[] = [];

        let cell: Node<E, T>[] = this._getCellFromTime(time);
        for (let musicalEvent of cell) {
            if (time >= musicalEvent.from && time <= musicalEvent.to)
                ret.push(musicalEvent);
        }

        return ret;
    }

    get duration(): T {
        const lastEntry = this.cells.lastEntry();
        if (!lastEntry)
            return this.startTime;

        const lastCell: Node<E, T>[] = lastEntry[1];
        let max: T = lastCell[0].to;
        for (let i: number = 1; i < lastCell.length; i++) {
            let c: Node<E, T> = lastCell[i];
            if (c.to > max)
                max = c.to;
        }
        return max;
    }

    abstract get startTime(): T;

    get nodes(): Node<E, T>[] {
        return this._nodes;
    }

    removeNodesAt(time: T): Node<E, T>[] {
        let cell: Node<E, T>[] = this._getCellFromTime(time);
        const removedNodes = this._cellRemoveNodesIf(cell, (node) => !node.interval.contains(time));

        return removedNodes;
    }

    removeNodesAtInterval(intervalTime: Interval<T>): Node<E, T>[] {
        const removedNodes: Node<E, T>[] = [];
        this._forEachCellNodesAtInterval(intervalTime, (node, cell) => {
            this._removeNodeFromCell(node, cell);
            removedNodes.push(node);
        });

        return removedNodes;
    }

    private _cellRemoveNodesIf(cell: Node<E, T>[], f: (node, cell) => boolean): Node<E, T>[] {
        let removedNodes: Node<E, T>[] = [];
        for (let i = 0; i < cell.length; i++) {
            let node: Node<E, T> = cell[i];
            if (!f(node, cell)) {
                this.removeNode(node);
                i--;
                removedNodes.push(node);
            }
        }

        return removedNodes;
    }

    removeNode(node: Node<E, T>): Node<E, T> | undefined {
        const index = this._nodes.indexOf(node);
        if (index == -1)
            return undefined;

        this._forEachCellsAtInterval(node.interval, cell => this._removeNodeFromCell(node, cell));
        this._nodes.splice(index, 1);

        this._callOnRemoveListeners(node);

        return node;
    }

    clear() {
        this.cells = new TreeMap();
        this._nodes = [];
    }

    private _removeNodeFromCell(node: Node<E, T>, cell: Node<E, T>[]) {
        const index = cell.indexOf(node);
        if (index != -1)
            cell.splice(index, 1);
    }

    protected get cellSize(): T {
        return this._cellSize;
    }
}