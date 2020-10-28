import { Time } from '@datune/core/tempo/Time';
import { Interval } from '@datune/utils/Interval';
import { TemporalEvent } from '../events/TemporalEvent';

export class Node<E extends TemporalEvent<T>, T extends Time> {
    private _to: T;
    private _interval: Interval<T>;

    private constructor(private _from: T, private _event: E) {
    }

    static createFrom<E extends TemporalEvent<T>, T extends Time>(from: T, event: E): Node<E, T> {
        return new Node(from, event);
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