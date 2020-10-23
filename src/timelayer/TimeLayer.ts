import { Interval } from '../utils/Interval';
import { Time } from '../tempo/Time';

export interface TimeLayer<T extends Time> {
    duration: T;

    removeNodesAtTime(time: T): void;
    removeNodesAtInterval(intervalTime: Interval<T>): void;
}
