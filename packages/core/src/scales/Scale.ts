import { NonEmptyArray } from "datils";

export interface Scale<INTERVAL, DEGREE> extends Iterable<INTERVAL> {
  rootIntervals: NonEmptyArray<INTERVAL>;

  degrees: NonEmptyArray<DEGREE>;

  length: number;
}
