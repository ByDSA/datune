import { Time } from '../tempo/Time';
import { Interval } from '../utils/Interval';
import { TemporalEvent } from './TemporalEvent';

export class TemporalNode<E extends TemporalEvent<T>, T extends Time> {
    private constructor(private _ini: T, private _event: E) {
    }

    static createFrom<E extends TemporalEvent<T>, T extends Time>(ini: T, event: E): TemporalNode<E, T> {
        return new TemporalNode(ini, event);
    }

    get from(): T {
        return this._ini;
    }

    get to(): T {
        return <T>this._ini.withAdd(this._event.duration);
    }

    get event(): E {
        return this._event;
    }

    get interval(): Interval<T> {
        return Interval.fromInclusiveToExclusive(this.from, this.to);
    }

    set event(note: E) {
        this._event = note;
    }

    toString(): string {
        return this._ini + ": " + this.event;
    }
}