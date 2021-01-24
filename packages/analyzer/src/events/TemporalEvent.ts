import { Time } from '@datune/core';

export interface TemporalEvent<T extends Time> {
    duration: T;
}