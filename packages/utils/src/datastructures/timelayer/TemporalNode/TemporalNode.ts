import Interval from "../../../math/interval/Interval";
import { ImmutableTime } from "../../../time/ImmutableTime";
import { EventFromDurationType, EventFromToType, EventIntervalType, isEventFromDurationType, isEventFromToType, isEventIntervalType, isNodeCopyType, NodeCopyType, TemporalNodeConstructorType } from "./types";

export default class TemporalNode<E, T extends ImmutableTime> {
  interval: Interval<T>;

  private _event: E;

  constructor(obj: TemporalNodeConstructorType<E, T>) {
    if (isEventFromToType(obj)) {
      const { event, from, to } = obj as EventFromToType<E, T>;

      this._event = event;
      this.interval = Interval.of(from, to);

      return;
    }

    if (isEventIntervalType(obj)) {
      const { interval, event } = obj as EventIntervalType<E, T>;

      this._event = event;
      this.interval = interval;

      return;
    }

    if (isNodeCopyType(obj)) {
      const { interval, event } = (obj as NodeCopyType<E, T>).node;

      this.interval = interval;
      this._event = event;

      return;
    }

    if (isEventFromDurationType(obj)) {
      const { event, from, duration } = obj as EventFromDurationType<E, T>;

      this._event = event;
      const to = from.withAdd(duration) as T;

      this.interval = Interval.of(from, to);
    }

    throw new Error(JSON.stringify(obj));
  }

  get from(): T {
    return this.interval.from;
  }

  set from(time: T) {
    if (this.interval.to < time)
      this.interval = Interval.of(this.interval.to, time);

    this.interval = Interval.of(time, this.interval.to);
  }

  set to(time: T) {
    if (this.interval.from > time)
      this.interval = Interval.of(time, this.interval.from);

    this.interval = Interval.of(this.interval.from, time);
  }

  get to(): T {
    return this.interval.to;
  }

  get event(): E {
    return this._event;
  }

  set event(note: E) {
    this._event = note;
  }

  duplicate(): TemporalNode<E, T> {
    return new TemporalNode( {
      interval: this.interval,
      event: this.event,
    } );
  }

  toString(): string {
    return `${this.from}: ${this.event}`;
  }
}
