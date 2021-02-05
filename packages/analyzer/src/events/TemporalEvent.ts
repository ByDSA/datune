import { ImmutableTime } from "@datune/utils";

export interface TemporalEvent<T extends ImmutableTime> {
    duration: T;
}