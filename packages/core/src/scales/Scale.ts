import { NonEmptyArray } from "datils";

export interface Scale<INTERVAL, DEGREE> {
  rootIntervals: NonEmptyArray<INTERVAL>;

  degrees: NonEmptyArray<DEGREE>;

  length: number;
}
