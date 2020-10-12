import TreeMap from 'ts-treemap';
import { MusicalDuration } from '../tempo/MusicalDuration';
import { Time } from '../tempo/Time';
import { Interval } from '../utils/Interval';
import { TemporalEvent } from './TemporalEvent';
import { TemporalNode } from './TemporalNode';
import { TimeLayer } from './TimeLayer';

export function getDefaultCellSize() { return MusicalDuration.WHOLE }

export abstract class TimeSequence<E extends TemporalEvent<T>, T extends Time>
    implements TimeLayer<T>, TemporalEvent<T> {

    private cells: TreeMap<number, TemporalNode<E, T>[]>;
    private _nodes: TemporalNode<E, T>[];

    protected constructor(private _cellSize: T) {
        this.cells = new TreeMap();
        this._nodes = [];
    }

    private getCellIndex(time: T): number {
        return time.withDivCell(this._cellSize);
    }

    private getCellFromTime(time: T): TemporalNode<E, T>[] {
        let index: number = this.getCellIndex(time);
        return this.getCellFromIndex(index);
    }

    private getCellFromIndex(index: number): TemporalNode<E, T>[] {
        let cell = this.cells.get(index);
        if (!cell) {
            cell = [];
            this.cells.set(index, cell);
        }

        return cell;
    }

    add(durableEvent: TemporalNode<E, T>): void {
        let iniCell: number = this.getCellIndex(durableEvent.from);
        let endCell: number = this.getCellIndex(durableEvent.to);

        // Fix open Interval
        if (durableEvent.to == this.cellSize.withMult(endCell))
            endCell--;

        for (let i: number = iniCell; i <= endCell; i++) {
            let cell: TemporalNode<E, T>[] = this.getCellFromIndex(i);

            cell.push(durableEvent);
        }

        this._nodes.push(durableEvent);
    }

    addSequenceAt(time: T, timeSequence: TimeSequence<E, T>): void {
        for (let eventSource of timeSequence.nodes) {
            let event: TemporalNode<E, T> = <TemporalNode<E, T>>TemporalNode.createFrom(time.withAdd(eventSource.from), eventSource.event);
            this.add(event);
        }
    }

    addAt(time: T, temporalEvent: E): void {
        let event = TemporalNode.createFrom(time, temporalEvent);
        this.add(event);
    }

    addAtEnd(temporalEvent: E): void {
        const time = this.duration;
        let event = TemporalNode.createFrom(time, temporalEvent);
        this.add(event);
    }

    moveTo(temporalEvent: E, time: T): void {
        sdfsdf
    }

    addSequence(midiSequence: TimeSequence<E, T>): void {
        this.addSequenceAt(this.duration, midiSequence)
    }

    getAtInterval(interval: Interval<T>): TemporalNode<E, T>[] {
        let iniCell: number = this.getCellIndex(interval.from);
        let endCell: number = this.getCellIndex(interval.to);

        let ret: TemporalNode<E, T>[] = [];
        for (let i: number = iniCell; i <= endCell; i++) {
            let cell: TemporalNode<E, T>[] = this.getCellFromIndex(i);

            for (let node of cell) {
                if (interval.intersects(node.interval))
                    ret.push(node);
            }
        }

        return ret;
    }

    getAtTime(time: T): TemporalNode<E, T>[] {
        let ret: TemporalNode<E, T>[] = [];

        let cell: TemporalNode<E, T>[] = this.getCellFromTime(time);
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

    removeAtTime(time: T): void {
        let cell: TemporalNode<E, T>[] = this.getCellFromTime(time);
        for (let i = 0; i < cell.length; i++) {
            let c: TemporalNode<E, T> = cell[i];
            if (c.interval.contains(time)) {
                cell.splice(i, 1);

                let indexEvents = this._nodes.indexOf(c);
                this._nodes.splice(indexEvents, 1);
                i--;
            }
        }
    }

    remove(durableEvent: TemporalNode<E, T>): boolean {
        const index = this._nodes.indexOf(durableEvent);
        if (index == -1)
            return false;

        this._nodes.splice(index, 1);

        let iniCell: number = this.getCellIndex(durableEvent.from);
        let endCell: number = this.getCellIndex(durableEvent.to);

        // Fix open Interval
        if (durableEvent.to == this.cellSize.withMult(endCell))
            endCell--;

        for (let i: number = iniCell; i <= endCell; i++) {
            let cell: TemporalNode<E, T>[] = this.getCellFromIndex(i);

            const index = cell.indexOf(durableEvent);
            if (index != -1)
                cell.splice(index, 1);
        }

        return true;
    }

    get cellSize(): T {
        return this._cellSize;
    }
}