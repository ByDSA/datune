import { Interval } from "datils/math/intervals";
import { Time } from "time";

export type TimelineNode<E> = {
  event: E;
  interval: Interval<Time>;
};
