import { NonEmptyArray } from "datils";

export interface Voicing<INTERVAL> extends Iterable<INTERVAL> {
    rootIntervals: NonEmptyArray<INTERVAL>;
    length: number;

    withAdded(...intervals: INTERVAL[]): Voicing<INTERVAL>;
    withRemoved(...intervals: INTERVAL[]): Voicing<INTERVAL> | null;
    withShifted(interval: INTERVAL): Voicing<INTERVAL>;
    withShiftedDown(interval: INTERVAL): Voicing<INTERVAL>;
}
