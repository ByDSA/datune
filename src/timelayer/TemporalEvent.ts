import { Time } from '../tempo/Time';

export interface TemporalEvent<T extends Time> {
    duration: T;
}