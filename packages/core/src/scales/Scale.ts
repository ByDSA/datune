import type { Arrays } from "@datune/utils";

export interface Scale<INTERVAL, DEGREE> {
  rootIntervals: Arrays.NonEmpty<INTERVAL>;

  degrees: Arrays.NonEmpty<DEGREE>;

  length: number;
}
