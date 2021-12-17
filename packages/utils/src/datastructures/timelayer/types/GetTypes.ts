import Interval from "../../../math/interval/Interval";
import { ImmutableTime } from "../../../time/ImmutableTime";

export type GetNodesAtIntervalType<T extends ImmutableTime> = {
  interval: Interval<T>;
};

export type GetNodesFromToType<T extends ImmutableTime> = {
  from: T;
  to: T;
};

export type GetNodesAtType<T extends ImmutableTime> = {
  at: T;
};

export type GetType<T extends ImmutableTime> =
GetNodesAtIntervalType<T> | GetNodesAtType<T> | GetNodesFromToType<T>;

export function isGetNodesAtIntervalType<T extends ImmutableTime>(obj: GetType<T>): boolean {
  return "interval" in obj;
}

export function isGetNodesFromToType<T extends ImmutableTime>(obj: GetType<T>): boolean {
  return "from" in obj && "to" in obj;
}

export function isGetNodesAtType<T extends ImmutableTime>(obj: GetType<T>): boolean {
  return "at" in obj;
}
