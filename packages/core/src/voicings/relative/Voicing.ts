import { Arrays } from "@datune/utils";

export default interface Voicing<INTERVAL> extends Iterable<INTERVAL> {
    rootIntervals: Arrays.NonEmpty<INTERVAL>;
    length: number;
}
