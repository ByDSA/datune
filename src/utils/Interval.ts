export class Interval<C> {
    private constructor(private _from: C, private _fromInclusive: boolean, private _to: C, private _toInclusive: boolean) {
    }

    static from<C>(from: C, fromInclusive: boolean, to: C, toInclusive: boolean): Interval<C> {
        return new Interval(from, fromInclusive, to, toInclusive);
    }

    static fromInclusiveToExclusive<C>(from: C, to: C) {
        return this.from(from, true, to, false);
    }

    get from(): C {
        return this._from;
    }

    get to(): C {
        return this._to;
    }

    contains(element: C): boolean {
        return element > this._from && element < this._to
            || this._fromInclusive && element.valueOf() == this._from.valueOf()
            || this._toInclusive && element.valueOf() == this._to.valueOf();
    }

    intersects(interval: Interval<C>): boolean {
        return this.to > interval.from && this.from < interval.to;
    }

    toString(): string {
        return (this._fromInclusive ? "[" : "(")
            + this.from + ", " + this.to
            + (this._toInclusive ? "]" : ")");
    }
}