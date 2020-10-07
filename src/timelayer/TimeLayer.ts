import { Time } from '../tempo/Time';

export interface TimeLayer<T extends Time> {
    duration: T;

    removeAtTime(time: T): void;
    // TODO: removeAtInterval(intervalTime: Interval<T>): void;
}
