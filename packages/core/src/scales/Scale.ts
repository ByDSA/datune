import { Arrays } from "@datune/utils";

export default interface Scale<INTERVAL, DEGREE> {
  rootIntervals: Arrays.NonEmpty<INTERVAL>;

  degrees: Arrays.NonEmpty<DEGREE>;

  length: number;
}
