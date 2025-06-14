import { ImmutableSet } from "sets/ImmutableSet";

export type IIntervalSet<INTERVAL> = Iterable<INTERVAL>
& Omit<ImmutableSet<INTERVAL>, "withAdded" | "withRemoved">
& {
    rootIntervals: Readonly<INTERVAL[]>;
    deltaIntervals: Readonly<INTERVAL[]>;

    withShifted(rootInterval: INTERVAL): IIntervalSet<INTERVAL>;
    withShiftedDown(rootInterval: INTERVAL): IIntervalSet<INTERVAL>;
    withInv(n: number): IIntervalSet<INTERVAL>;

    // Overload:
    withAdded(...rootInterval: INTERVAL[]): IIntervalSet<INTERVAL>;
    withRemoved(...rootInterval: INTERVAL[]): IIntervalSet<INTERVAL>;
};
