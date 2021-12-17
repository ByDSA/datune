import { lock } from "immutables";

export type ObjectConstructor<C> = {
    from: C;
    fromInclusive: boolean;
    to: C;
    toInclusive: boolean;
};

export default class Interval<C extends Object> {
  from: C;

  fromInclusive: boolean;

  to: C;

  toInclusive: boolean;

  private _str?: string;

  constructor(obj: ObjectConstructor<C>) {
    this.from = obj.from;
    this.fromInclusive = obj.fromInclusive;
    this.to = obj.to;
    this.toInclusive = obj.toInclusive;

    this.makeImmutable();
  }

  static of<C>(from: C, to: C) {
    return new Interval( {
      from,
      fromInclusive: true,
      to,
      toInclusive: false,
    } );
  }

  private makeImmutable(): void {
    lock(this.from);
    lock(this.fromInclusive);
    lock(this.to);
    lock(this.toInclusive);
  }

  contains(element: C): boolean {
    return (element > this.from && element < this.to)
            || (this.fromInclusive && element.valueOf() === this.from.valueOf())
            || (this.toInclusive && element.valueOf() === this.to.valueOf());
  }

  intersects(interval: Interval<C>): boolean {
    return this.to > interval.from && this.from < interval.to;
  }

  toString(): string {
    if (!this._str)
      this._str = calculateString(this);

    return this._str;
  }
}

function calculateString<C>(interval: Interval<C>): string {
  return `${(interval.fromInclusive ? "[" : "(")
            + interval.from}, ${interval.to
  }${interval.toInclusive ? "]" : ")"}`;
}
