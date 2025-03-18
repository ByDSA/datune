import { NonEmptyArray } from "datils";

export interface Voicing<INTERVAL> extends Iterable<INTERVAL> {
    rootIntervals: NonEmptyArray<INTERVAL>;
    length: number;
}
