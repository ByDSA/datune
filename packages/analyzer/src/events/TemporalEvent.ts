import { Time } from '@datune/core/tempo/Time';

export interface TemporalEvent<T extends Time> {
    duration: T;
}