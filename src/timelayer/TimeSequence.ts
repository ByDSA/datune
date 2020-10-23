import TreeMap from 'ts-treemap';
import { MusicalDuration } from '../tempo/MusicalDuration';
import { Time } from '../tempo/Time';
import { Interval } from '../utils/Interval';
import { TemporalEvent } from './TemporalEvent';
import { TemporalNode } from './TemporalNode';
import { TimeLayer } from './TimeLayer';

export function getDefaultCellSize() { return MusicalDuration.WHOLE }

export abstract class TimeSequence<E extends TemporalEvent<T>, T extends Time>
    implements TimeLayer<E, T>, TemporalEvent<T> {

    private cells: TreeMap<number, TemporalNode<E, T>[]>;
    private _nodes: TemporalNode<E, T>[];

    protected constructor(private _cellSize: T) {
        this.clear();
    }

    private _getCellIndexFromTime(time: T): number {
        return time.withDivCell(this._cellSize);
    }

    private _getCellFromTime(time: T): TemporalNode<E, T>[] {
        let index: number = this._getCellIndexFromTime(time);
        return this._getCellFromIndex(index);
    }

    private _getCellFromIndex(index: number): TemporalNode<E, T>[] {
        let cell = this.cells.get(index);
        if (!cell) {
            cell = [];
            this.cells.set(index, cell);
        }

        return cell;
    }

    addNode(node: TemporalNode<E, T>): void {
        this._forEachCellsAtInterval(node.interval, cell => cell.push(node));

        this._nodes.push(node);
    }

    addSequenceAt(time: T, timeSequence: TimeSequence<E, T>): void {
        for (let eventSource of timeSequence.nodes) {
            let event: TemporalNode<E, T> = <TemporalNode<E, T>>TemporalNode.createFrom(time.withAdd(eventSource.from), eventSource.event);
            this.addNode(event);
        }
    }

    addSequenceAtEnd(midiSequence: TimeSequence<E, T>): void {
        this.addSequenceAt(this.duration, midiSequence)
    }

    addEventAt(time: T, event: E): TemporalNode<E, T> {
        let node = TemporalNode.createFrom(time, event);
        this.addNode(node);

        return node;
    }

    addEventAtEnd(event: E): TemporalNode<E, T> {
        const time = this.duration;
        let node = TemporalNode.createFrom(time, event);
        this.addNode(node);

        return node;
    }

    moveNodeTo(node: TemporalNode<E, T>, time: T): TemporalNode<E, T> {
        this.removeNode(node);
        return this.addEventAt(time, node.event);
    }

    private _forEachCellsAtInterval(interval: Interval<T>, f: (cell: TemporalNode<E, T>[]) => void) {
        let iniCell: number = this._getCellIndexFromTime(interval.from);
        let endCell: number = this._getCellIndexFromTime(interval.to);

        // Fix open Interval
        if (interval.to == this.cellSize.withMult(endCell))
            endCell--;

        for (let i: number = iniCell; i <= endCell; i++) {
            let cell: TemporalNode<E, T>[] = this._getCellFromIndex(i);

            f(cell);
        }
    }

    private _forEachCellNodesAtInterval(interval: Interval<T>, f: (node: TemporalNode<E, T>, cell: TemporalNode<E, T>[]) => void): void {
        let iniCell: number = this._getCellIndexFromTime(interval.from);
        let endCell: number = this._getCellIndexFromTime(interval.to);

        let ret: TemporalNode<E, T>[] = [];
        for (let i: number = iniCell; i <= endCell; i++) {
            let cell: TemporalNode<E, T>[] = this._getCellFromIndex(i);

            for (let node of cell) {
                if (interval.intersects(node.interval))
                    f(node, cell);
            }
        }
    }

    getNodesAtInterval(interval: Interval<T>): TemporalNode<E, T>[] {
        let ret: TemporalNode<E, T>[] = [];
        this._forEachCellNodesAtInterval(interval, (node) => ret.push(node));

        return ret;
    }

    getNodesAt(time: T): TemporalNode<E, T>[] {
        let ret: TemporalNode<E, T>[] = [];

        let cell: TemporalNode<E, T>[] = this._getCellFromTime(time);
        for (let musicalEvent of cell) {
            if (time >= musicalEvent.from && time <= musicalEvent.to)
                ret.push(musicalEvent);
        }

        return ret;
    }

    get duration(): T {
        if (!this.cells || this.cells.size == 0)
            return this.startTime;

        let lastCell: TemporalNode<E, T>[] = this.cells.lastEntry()[1];
        let max: T = lastCell[0].to;
        for (let i: number = 1; i < lastCell.length; i++) {
            let c: TemporalNode<E, T> = lastCell[i];
            if (c.to > max)
                max = c.to;
        }
        return max;
    }

    abstract get startTime(): T;

    get nodes(): TemporalNode<E, T>[] {
        return this._nodes;
    }

    removeNodesAt(time: T): void {
        let cell: TemporalNode<E, T>[] = this._getCellFromTime(time);
        this._cellFilterMutable(cell, (node) => !node.interval.contains(time))
    }

    removeNodesAtInterval(intervalTime: Interval<T>): void {
        this._forEachCellNodesAtInterval(intervalTime, (node, cell) => {
            this._removeNodeFromCell(node, cell);
        });
    }

    private _cellFilterMutable(cell: TemporalNode<E, T>[], f: (node, cell) => boolean): void {
        for (let i = 0; i < cell.length; i++) {
            let node: TemporalNode<E, T> = cell[i];
            if (!f(node, cell)) {
                cell.splice(i, 1);

                this._removeNodeFromCellWithoutChecking(node, cell);
                i--;
            }
        }
    }

    removeNode(node: TemporalNode<E, T>): boolean {
        const index = this._nodes.indexOf(node);
        if (index == -1)
            return false;

        this._forEachCellsAtInterval(node.interval, cell => this._removeNodeFromCell(node, cell));
        this._nodes.splice(index, 1);

        return true;
    }

    clear() {
        this.cells = new TreeMap();
        this._nodes = [];
    }

    private _removeNodeFromCell(node: TemporalNode<E, T>, cell: TemporalNode<E, T>[]) {
        const index = cell.indexOf(node);
        if (index != -1)
            cell.splice(index, 1);
    }

    private _removeNodeFromCellWithoutChecking(node: TemporalNode<E, T>, cell: TemporalNode<E, T>[]) {
        const index = cell.indexOf(node);
        cell.splice(index, 1);
    }

    protected get cellSize(): T {
        return this._cellSize;
    }
}