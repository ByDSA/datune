import { Interval } from '../../../math/interval/Interval';
import { ImmutableTime } from '../../../time/ImmutableTime';
import { TimeLayer } from '../TimeLayer';
import { TemporalNodeBuilder } from './building/TemporalNodeBuilder';

export class TemporalNode<E, T extends ImmutableTime> {
    private _interval: Interval<T> | undefined;
    private _currentTimeLayer: TimeLayer<E, T> | null;

    protected constructor(private _from: T, private _to: T, private _event: E) {
        this._currentTimeLayer = null;
    }

    private static _create<E, T extends ImmutableTime>(e: E, f: T, t: T): TemporalNode<E, T> {
        return new TemporalNode(f, t, e);
    }

    get from(): T {
        return this._from;
    }

    set from(time: T) {
        this._from = time;

        if (this._to < this._from)
            this.to = time;

        if (this._currentTimeLayer)
            this._currentTimeLayer.moveNodeBeginTo(this, this._from);
    }

    set to(time: T) {
        this._to = time;

        if (this._to < this._from)
            this.from = time;

        if (this._currentTimeLayer)
            this._currentTimeLayer.moveNodeEndTo(this, this._to);
    }

    get to(): T {
        return this._to;
    }

    get event(): E {
        return this._event;
    }

    get interval(): Interval<T> {
        if (!this._interval)
            this._interval = Interval.fromInclusiveToExclusive(this.from, this.to);
        return this._interval;
    }

    set event(note: E) {
        this._event = note;
    }

    get timeLayer(): TimeLayer<E, T> | null {
        return this._currentTimeLayer;
    }

    duplicate(): TemporalNode<E, T> {
        return new TemporalNodeBuilder<E, T>()
            .from(this.from)
            .to(this.to)
            .event(this.event)
            .create();
    }

    remove() {
        if (!this._currentTimeLayer)
            throw new Error("Node doesn't belong to a timelayer");

        this._currentTimeLayer.removeNode(this);
    }

    toString(): string {
        return this._from + ": " + this.event;
    }
}

export class AlreadyAddedError extends Error {
    constructor() {
        super("Node already added in another time layer.");
    }
}