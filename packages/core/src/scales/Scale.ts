import { NonEmptyArray } from "datils";

export interface Scale<INTERVAL, DEGREE> extends Iterable<DEGREE> {
  intraIntervals: Readonly<NonEmptyArray<DEGREE>>;

  degrees: Readonly<NonEmptyArray<DEGREE>>;

  length: number;

  hasDegrees(...degrees: NonEmptyArray<DEGREE>): boolean;
  withMode(n?: number): Scale<INTERVAL, DEGREE>;
}
