import { Interval } from "math/interval";
import { Time } from "time";

type Dto<E> = {
  interval: Interval<Time>;
  event: Readonly<E>;
};
type TemporalNode<E> = Readonly<Dto<E>>;

export default TemporalNode;
