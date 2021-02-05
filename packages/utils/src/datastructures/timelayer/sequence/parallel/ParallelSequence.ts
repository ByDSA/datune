import TreeMap from 'ts-treemap';
import { Interval } from '../../../../math/interval/Interval';
import { ImmutableTime } from '../../../../time/ImmutableTime';
import { AlreadyAddedError, TemporalNode } from '../../temporalnode/TemporalNode';
import { SequenceAddListener, SequenceChangeListener, SequenceRemoveListener, TimeLayer } from '../../TimeLayer';

export abstract class ParallelSequence<E, T extends ImmutableTime> implements TimeLayer<E, T> {
    private _cells: TreeMap<number, TemporalNode<E, T>[]>;
    private _nodes: TemporalNode<E, T>[];

    private _onChangeListeners: SequenceChangeListener<E, T>[];
    private _onAddListeners: SequenceAddListener<E, T>[];
    private _onRemoveListeners: SequenceRemoveListener<E, T>[];

    protected constructor(private _startTime: T, private _cellSize: T) {
        this._cells = new TreeMap();
        this._nodes = [];

        this._onChangeListeners = [];
        this._onAddListeners = [];
        this._onRemoveListeners = [];
    }

    private _getCellIndexFromTime(time: T): number {
        return time.withDivCell(this._cellSize);
    }

    private _getCellFromTime(time: T): TemporalNode<E, T>[] {
        let index: number = this._getCellIndexFromTime(time);
        return this._getCellFromIndex(index);
    }

    private _getCellFromIndex(index: number): TemporalNode<E, T>[] {
        let cell = this._cells.get(index);
        if (!cell) {
            cell = [];
            this._cells.set(index, cell);
        }

        return cell;
    }

    onChange(listener: SequenceChangeListener<E, T>) {
        this._onChangeListeners.push(listener);
    }

    private _callOnChangeListeners(oldNode: TemporalNode<E, T>, newNode: TemporalNode<E, T>) {
        for (const f of this._onChangeListeners)
            f(oldNode, newNode);
    }

    private _callOnAddListeners(node: TemporalNode<E, T>) {
        for (const f of this._onAddListeners)
            f(node);
    }

    private _callOnRemoveListeners(node: TemporalNode<E, T>) {
        for (const f of this._onRemoveListeners)
            f(node);
    }

    onAdd(listener: SequenceAddListener<E, T>) {
        this._onAddListeners.push(listener);
    }

    onRemove(listener: SequenceRemoveListener<E, T>) {
        this._onRemoveListeners.push(listener);
    }

    addNode(node: TemporalNode<E, T>): void {
        this._forEachCellsAtInterval(node.interval, cell => cell.push(node));

        this._nodes.push(node);
        this._assignTimeLayerToNode(node);

        this._callOnAddListeners(node);
    }

    private _assignTimeLayerToNode(node: TemporalNode<E, T>) {
        if ((<any>node)._currentTimeLayer)
            throw new AlreadyAddedError;
        (<any>node)._currentTimeLayer = this;
    }

    private _unassignTimeLayerToNode(node: TemporalNode<E, T>) {
        (<any>node)._currentTimeLayer = null;
    }

    addTimeLayer(timeSequence: ParallelSequence<E, T>, time: T = this.duration): void {
        for (let nodeSource of timeSequence.nodes) {
            let node: TemporalNode<E, T> = TemporalNode.builder<E, T>()
                .from(<T>time.withAdd(nodeSource.from))
                .to(<T>time.withAdd(nodeSource.to))
                .event(nodeSource.event)
                .create();

            this.addNode(node);
        }
    }

    addEvent(event: E, from: T = this.duration, to: T = this.duration): TemporalNode<E, T> {
        let node = TemporalNode.builder<E, T>()
            .from(from)
            .to(to)
            .event(event)
            .create();

        this.addNode(node);

        return node;
    }

    moveNodeBeginTo(node: TemporalNode<E, T>, time: T): TemporalNode<E, T> {
        this.removeNode(node);
        const to = node.to;
        const ret = this.addEvent(node.event, time, to);

        this._callOnChangeListeners(node, ret);
        return ret;
    }

    moveNodeEndTo(node: TemporalNode<E, T>, time: T): TemporalNode<E, T> {
        this.removeNode(node);
        const ret = this.addEvent(node.event, node.from, time);

        this._callOnChangeListeners(node, ret);
        return ret;
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
            if (time >= musicalEvent.from && time < musicalEvent.to)
                ret.push(musicalEvent);
        }

        return ret;
    }

    get duration(): T {
        const lastEntry = this._lastEntryWithNodes();
        if (!lastEntry)
            return this._startTime;

        const lastCell: TemporalNode<E, T>[] = lastEntry[1];
        let max: T = lastCell[0].to;
        for (let i: number = 1; i < lastCell.length; i++) {
            let c: TemporalNode<E, T> = lastCell[i];
            if (c.to > max)
                max = c.to;
        }
        return max;
    }

    private _lastEntryWithNodes(): [number, TemporalNode<E, T>[]] | undefined {
        do {
            let lastEntry = this._cells.lastEntry();
            if (!lastEntry)
                return undefined;
            if (lastEntry[1].length == 0)
                this._cells.popEntry();
            else
                return lastEntry;
        } while (true);
    }

    get nodes(): TemporalNode<E, T>[] {
        return this._nodes;
    }

    removeNodesAt(time: T): TemporalNode<E, T>[] {
        let cell: TemporalNode<E, T>[] = this._getCellFromTime(time);
        const removedNodes = this._cellRemoveNodesIf(cell, (node) => !node.interval.contains(time));

        return removedNodes;
    }

    removeNodesAtInterval(intervalTime: Interval<T>): TemporalNode<E, T>[] {
        const removedNodes: TemporalNode<E, T>[] = [];
        this._forEachCellNodesAtInterval(intervalTime, (node, cell) => {
            this._removeNodeFromCell(node, cell);
            removedNodes.push(node);
        });

        return removedNodes;
    }

    private _cellRemoveNodesIf(cell: TemporalNode<E, T>[], f: (node: TemporalNode<E, T>, cell: TemporalNode<E, T>[]) => boolean): TemporalNode<E, T>[] {
        let removedNodes: TemporalNode<E, T>[] = [];
        for (let i = 0; i < cell.length; i++) {
            let node: TemporalNode<E, T> = cell[i];
            if (!f(node, cell)) {
                this.removeNode(node);
                i--;
                removedNodes.push(node);
            }
        }

        return removedNodes;
    }

    removeNode(node: TemporalNode<E, T>): TemporalNode<E, T> | null {
        const index = this._nodes.indexOf(node);
        if (index == -1)
            return null;

        this._forEachCellsAtInterval(node.interval, cell => this._removeNodeFromCell(node, cell));
        this._nodes.splice(index, 1);

        this._unassignTimeLayerToNode(node);

        this._callOnRemoveListeners(node);

        return node;
    }

    clear() {
        const oldNodes = this._nodes;
        this._nodes = [];
        this._cells = new TreeMap();
        for (const oldNode of oldNodes)
            this._callOnRemoveListeners(oldNode);
    }

    private _removeNodeFromCell(node: TemporalNode<E, T>, cell: TemporalNode<E, T>[]) {
        const index = cell.indexOf(node);
        if (index != -1)
            cell.splice(index, 1);
    }

    protected get cellSize(): T {
        return this._cellSize;
    }
}