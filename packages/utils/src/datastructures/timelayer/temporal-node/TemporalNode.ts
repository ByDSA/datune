import { Interval } from "datils/math/interval";
import { Time } from "time";

type Dto<E> = {
  interval: Interval<Time>;
  event: Readonly<E>;
};
export type TemporalNode<E> = Readonly<Dto<E>>;
