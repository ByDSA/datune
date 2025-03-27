import type { Time } from "../../../../time";
import type { TimelineNode } from "../..";
import type { Timeline } from "../Timeline";

export interface IParallelTimeline<E> extends Timeline<E> {
    removeAt(at: Time): TimelineNode<E>[];

    getAt(time: Time): TimelineNode<E>[];
}
