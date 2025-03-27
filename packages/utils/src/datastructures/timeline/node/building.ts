import { Interval, intervalBetween } from "datils/math/intervals";
import { Time } from "../../../time";
import { TimelineNode } from "./TimelineNode";

export function from<E>(event: E, interval: Interval<Time>): TimelineNode<E> {
  return {
    event,
    interval,
  };
}
// eslint-disable-next-line no-underscore-dangle
const _from = from;

// eslint-disable-next-line @typescript-eslint/no-shadow
export function fromBetween<E>(event: E, from: Interval<Time>["from"], to: Interval<Time>["to"]): TimelineNode<E> {
  return _from(
    event,
    intervalBetween<Time>(from, to),
  );
}

export function fromAtDuration<E>(event: E, at: Interval<Time>["from"], duration: Time): TimelineNode<E> {
  return _from(
    event,
    intervalBetween<Time>(at, at + duration),
  );
}
