import { TemporalNode } from "./TemporalNode";
import { Interval } from "math/interval";
import { Time } from "time";

export type NodeCopyType<E> = {
  node: TemporalNode<E>;
};

export type EventFromToType<E> = Readonly<{
  event: Readonly<E>;
  from: Time;
  to: Time;
}>;

export type EventFromDurationType<E> = Readonly<{
  event: Readonly<E>;
  from: Time;
  duration: Time;
}>;

export type EventIntervalType<E> = Readonly<{
  event: Readonly<E>;
  interval: Interval<Time>;
}>;

export type Constructor<E> =
EventFromDurationType<E> | EventFromToType<E> | EventIntervalType<E> | NodeCopyType<E>;
