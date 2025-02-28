import { Arrays } from "@datune/utils";

export interface Voicing<INTERVAL> extends Iterable<INTERVAL> {
    rootIntervals: Arrays.NonEmpty<INTERVAL>;
    length: number;
}
