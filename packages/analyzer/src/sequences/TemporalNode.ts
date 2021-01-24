import { Time } from '@datune/core';
import { Interval } from '@datune/utils';
import { TemporalEvent } from '../events/TemporalEvent';

export class TemporalNode<E extends TemporalEvent<T>, T extends Time> {
    private _to: T | undefined;
    private _interval: Interval<T> | undefined;

    private constructor(private _from: T, private _event: E) {
    }

    static createFrom<E extends TemporalEvent<T>, T extends Time>(from: T, event: E): TemporalNode<E, T> {
        return new TemporalNode(from, event);
    }

    get from(): T {
        return this._from;
    }

    get to(): T {
        if (!this._to)
            this._to = <T>this.from.withAdd(this.event.duration);
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

    toString(): string {
        return this._from + ": " + this.event;
    }
}