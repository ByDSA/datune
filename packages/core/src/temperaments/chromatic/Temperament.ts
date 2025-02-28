import type { Interval } from "intervals/chromatic";
import type { Interval as RealInterval } from "intervals/real";

export type Temperament = (interval: Interval)=> RealInterval;
